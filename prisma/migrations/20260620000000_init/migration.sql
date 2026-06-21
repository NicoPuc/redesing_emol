CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "publishHour" INTEGER NOT NULL,
    "publishMinute" INTEGER NOT NULL,
    "readingMinutes" INTEGER NOT NULL,
    "baseCommentsCount" INTEGER NOT NULL DEFAULT 0,
    "dayOffset" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT[] NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "articleId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "authorName" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AiSummary" (
    "id" SERIAL NOT NULL,
    "articleId" INTEGER NOT NULL,
    "bullets" TEXT[] NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiSummary_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AiSummary_articleId_key" ON "AiSummary"("articleId");
CREATE INDEX "Article_dayOffset_publishHour_publishMinute_idx" ON "Article"("dayOffset", "publishHour", "publishMinute");
CREATE INDEX "Article_category_idx" ON "Article"("category");
CREATE INDEX "Comment_articleId_createdAt_idx" ON "Comment"("articleId", "createdAt");

ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiSummary" ADD CONSTRAINT "AiSummary_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
