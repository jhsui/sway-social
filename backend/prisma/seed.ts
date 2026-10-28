// Seeds demo users, posts, comments, likes and follows.
//
// Usage (from backend/):
//   npm run seed          # add demo data
//   npm run seed:clear    # remove all demo data
//
// It uses whatever DATABASE_URL is set (from .env or the shell), so point it
// at your Railway database's public URL to seed production.
//
// Users are created through Better Auth itself (auth.api.signUpEmail), so
// passwords are hashed exactly like a real sign-up and every demo account can
// log in with DEMO_PASSWORD.

import { auth } from "../src/lib/auth.ts";
import { prisma } from "../src/lib/prisma.ts";
import { DEMO_EMAIL_DOMAIN, seedPosts, seedUsers } from "./seed-data.ts";

const DEMO_PASSWORD = "sway-demo-2026";

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;

// Small deterministic random generator, so every run produces the same
// likes and follows.
let state = 42;
function random() {
  state = (state * 1664525 + 1013904223) % 2 ** 32;
  return state / 2 ** 32;
}

function pickSome<T>(items: T[], count: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, count);
}

function emailFor(handle: string) {
  return `${handle}@${DEMO_EMAIL_DOMAIN}`;
}

function avatarFor(handle: string) {
  // Full URLs are passed through as-is by getImageUrl / batchGetImageUrls.
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${handle}&backgroundColor=e8e4d8`;
  // return `https://api.dicebear.com/9.x/adventurer/svg?seed=${handle}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,d4f0c4`;
}

async function main() {
  const existing = await prisma.user.count({
    where: { email: { endsWith: `@${DEMO_EMAIL_DOMAIN}` } },
  });
  if (existing > 0) {
    console.log(
      `Found ${existing} demo users already. Run "npm run seed:clear" first to re-seed.`,
    );
    return;
  }

  const now = Date.now();

  // 1. Users. Accounts are "created" 45–60 days ago, before their first post.
  const userIds = new Map<string, string>();
  for (const u of seedUsers) {
    const { user } = await auth.api.signUpEmail({
      body: {
        name: u.name,
        email: emailFor(u.handle),
        password: DEMO_PASSWORD,
      },
    });

    const createdAt = new Date(now - (45 + random() * 15) * DAY);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        intro: u.intro,
        image: avatarFor(u.handle),
        emailVerified: true,
        createdAt,
      },
    });
    userIds.set(u.handle, user.id);
  }

  const ids = [...userIds.values()];
  const idOf = (handle: string) => {
    const id = userIds.get(handle);
    if (!id) throw new Error(`Unknown seed user "${handle}"`);
    return id;
  };

  // signUpEmail signs the new user in; those sessions aren't needed.
  await prisma.session.deleteMany({ where: { userId: { in: ids } } });

  // 2. Posts and their comments, with comments a few hours after each post.
  let commentCount = 0;
  const postIds: string[] = [];
  for (const p of seedPosts) {
    const postedAt = new Date(
      now - p.daysAgo * DAY - Math.floor(random() * 10) * HOUR,
    );
    const post = await prisma.post.create({
      data: {
        title: p.title,
        content: p.content,
        authorId: idOf(p.author),
        createdAt: postedAt,
        updatedAt: postedAt,
        // Full image URLs are passed through as-is by getImageUrl /
        // batchGetImageUrls, so these load straight from Unsplash.
        images: {
          create: (p.images ?? []).map((path, position) => ({
            path,
            position,
          })),
        },
      },
    });
    postIds.push(post.id);

    let commentAt = postedAt.getTime();
    for (const [author, text] of p.comments) {
      commentAt += (0.5 + random() * 5) * HOUR;
      const at = new Date(Math.min(commentAt, now));
      await prisma.comment.create({
        data: {
          content: text,
          authorId: idOf(author),
          postId: post.id,
          createdAt: at,
          updatedAt: at,
        },
      });
      commentCount++;
    }
  }

  // 3. Likes: each user likes 6–12 posts that aren't their own.
  const likes: { userId: string; postId: string }[] = [];
  for (const userId of ids) {
    const count = 6 + Math.floor(random() * 7);
    for (const postId of pickSome(postIds, count)) {
      likes.push({ userId, postId });
    }
  }
  const ownPosts = new Set(
    (
      await prisma.post.findMany({
        where: { id: { in: postIds } },
        select: { id: true, authorId: true },
      })
    ).map((p) => `${p.authorId}:${p.id}`),
  );
  const { count: likeCount } = await prisma.postLike.createMany({
    data: likes.filter((l) => !ownPosts.has(`${l.userId}:${l.postId}`)),
    skipDuplicates: true,
  });

  // 4. Follows: each user follows 3–7 others.
  const follows: { followerId: string; followingId: string }[] = [];
  for (const followerId of ids) {
    const others = ids.filter((id) => id !== followerId);
    const count = 3 + Math.floor(random() * 5);
    for (const followingId of pickSome(others, count)) {
      follows.push({ followerId, followingId });
    }
  }
  const { count: followCount } = await prisma.userFollow.createMany({
    data: follows,
    skipDuplicates: true,
  });

  console.log(
    `Seeded ${ids.length} users, ${postIds.length} posts, ${commentCount} comments, ` +
      `${likeCount} likes and ${followCount} follows.`,
  );
  console.log(
    `Log in as any demo user, e.g. ${emailFor(seedUsers[0]!.handle)} / ${DEMO_PASSWORD}`,
  );
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
