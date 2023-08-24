/*
  Warnings:

  - You are about to drop the column `session_id` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[secret]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secret` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `sessions_session_id_key` ON `sessions`;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `session_id`,
    ADD COLUMN `secret` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `sessions_secret_key` ON `sessions`(`secret`);
