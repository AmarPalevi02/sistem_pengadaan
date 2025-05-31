-- DropForeignKey
ALTER TABLE `receivingdocument` DROP FOREIGN KEY `ReceivingDocument_procurementId_fkey`;

-- DropIndex
DROP INDEX `ReceivingDocument_procurementId_fkey` ON `receivingdocument`;

-- AddForeignKey
ALTER TABLE `ReceivingDocument` ADD CONSTRAINT `ReceivingDocument_procurementId_fkey` FOREIGN KEY (`procurementId`) REFERENCES `Procurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
