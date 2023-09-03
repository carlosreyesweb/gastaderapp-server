/*
  Warnings:

  - Added the required column `user_id` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `categories_name_key` ON `categories`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
