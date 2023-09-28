/*
  Warnings:

  - You are about to drop the column `icon` on the `currencies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `currencies_icon_key` ON `currencies`;

-- AlterTable
ALTER TABLE `currencies` DROP COLUMN `icon`;
