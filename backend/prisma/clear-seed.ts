// Removes every demo user created by prisma/seed.ts.
// Their posts, comments, likes, follows, sessions and accounts are removed by
// the onDelete: Cascade relations in schema.prisma.

import { prisma } from "../src/lib/prisma.ts";
import { DEMO_EMAIL_DOMAIN } from "./seed-data.ts";

try {
  const { count } = await prisma.user.deleteMany({
    where: { email: { endsWith: `@${DEMO_EMAIL_DOMAIN}` } },
  });
  console.log(`Removed ${count} demo users and everything they posted.`);
} finally {
  await prisma.$disconnect();
}
