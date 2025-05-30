-- DropForeignKey
ALTER TABLE `approval` DROP FOREIGN KEY `Approval_managerId_fkey`;

-- DropIndex
DROP INDEX `Approval_managerId_fkey` ON `approval`;

-- AddForeignKey
ALTER TABLE `Approval` ADD CONSTRAINT `Approval_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
