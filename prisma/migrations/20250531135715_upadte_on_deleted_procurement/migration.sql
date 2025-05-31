-- DropForeignKey
ALTER TABLE `procurementitem` DROP FOREIGN KEY `ProcurementItem_procurementId_fkey`;

-- DropForeignKey
ALTER TABLE `trackinghistory` DROP FOREIGN KEY `TrackingHistory_procurementId_fkey`;

-- DropIndex
DROP INDEX `ProcurementItem_procurementId_fkey` ON `procurementitem`;

-- DropIndex
DROP INDEX `TrackingHistory_procurementId_fkey` ON `trackinghistory`;

-- AddForeignKey
ALTER TABLE `ProcurementItem` ADD CONSTRAINT `ProcurementItem_procurementId_fkey` FOREIGN KEY (`procurementId`) REFERENCES `Procurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrackingHistory` ADD CONSTRAINT `TrackingHistory_procurementId_fkey` FOREIGN KEY (`procurementId`) REFERENCES `Procurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
