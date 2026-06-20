import { prisma } from "../lib/db";
import { articleSeeds } from "../lib/news-data";
import { buildContent } from "../lib/news-utils";
import { getSeededComments } from "../lib/comments";

async function main() {
  for (const article of articleSeeds) {
    const existingComments = await prisma.comment.count({
      where: { articleId: article.id },
    });

    await prisma.article.upsert({
      where: { id: article.id },
      update: {
        category: article.category,
        title: article.title,
        description: article.description ?? article.subtitle,
        subtitle: article.subtitle,
        author: article.author,
        image: article.image,
        publishedAt: article.publishedAt,
        publishHour: article.publishHour,
        publishMinute: article.publishMinute,
        readingMinutes: article.readingMinutes,
        baseCommentsCount: Math.max(article.commentsCount - 3, 0),
        dayOffset: article.dayOffset ?? 0,
        content: buildContent(article),
      },
      create: {
        id: article.id,
        category: article.category,
        title: article.title,
        description: article.description ?? article.subtitle,
        subtitle: article.subtitle,
        author: article.author,
        image: article.image,
        publishedAt: article.publishedAt,
        publishHour: article.publishHour,
        publishMinute: article.publishMinute,
        readingMinutes: article.readingMinutes,
        baseCommentsCount: Math.max(article.commentsCount - 3, 0),
        dayOffset: article.dayOffset ?? 0,
        content: buildContent(article),
      },
    });

    if (existingComments === 0) {
      await prisma.comment.createMany({
        data: getSeededComments(article.id).map((comment) => ({
          articleId: article.id,
          authorId: comment.user.id,
          authorName: comment.user.name,
          body: comment.body,
          createdAt: new Date(Date.now() - (comment.id % 100 + 1) * 45 * 60000),
        })),
      });
    }
  }

  await prisma.$executeRaw`
    SELECT setval(
      pg_get_serial_sequence('"Article"', 'id'),
      (SELECT COALESCE(MAX("id"), 1) FROM "Article")
    )
  `;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
