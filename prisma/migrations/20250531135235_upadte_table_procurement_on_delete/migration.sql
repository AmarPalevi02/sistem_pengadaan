-- DropForeignKey
ALTER TABLE `procurement` DROP FOREIGN KEY `Procurement_procurementOfficerId_fkey`;

-- DropIndex
DROP INDEX `Procurement_procurementOfficerId_fkey` ON `procurement`;

-- AddForeignKey
ALTER TABLE `Procurement` ADD CONSTRAINT `Procurement_procurementOfficerId_fkey` FOREIGN KEY (`procurementOfficerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
