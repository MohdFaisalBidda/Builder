/*
  Warnings:

  - The `publishedAt` column on the `Form` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "publishedAt",
ADD COLUMN     "publishedAt" BOOLEAN NOT NULL DEFAULT false;
