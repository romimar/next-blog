/*
  Warnings:

  - You are about to drop the column `userId` on the `Blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_userId_fkey`;

-- DropIndex
DROP INDEX `Blog_userId_fkey` ON `Blog`;

-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `userId`,
    ADD COLUMN `user_name` VARCHAR(255) NULL;
