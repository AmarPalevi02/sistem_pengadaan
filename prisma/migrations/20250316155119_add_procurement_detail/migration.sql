-- AlterTable
ALTER TABLE `procurement` ADD COLUMN `vendorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `request` ADD COLUMN `approvedAt` DATETIME(3) NULL,
    ADD COLUMN `approvedBy` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ProcurementItem` (
    `id` VARCHAR(191) NOT NULL,
    `procurementId` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `pricePerUnit` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrackingHistory` (
    `id` VARCHAR(191) NOT NULL,
    `procurementId` VARCHAR(191) NOT NULL,
    `status` ENUM('ORDERED', 'SHIPPED', 'DELIVERED') NOT NULL,
    `updatedById` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReceivingDocument` (
    `id` VARCHAR(191) NOT NULL,
    `procurementId` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Procurement` ADD CONSTRAINT `Procurement_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProcurementItem` ADD CONSTRAINT `ProcurementItem_procurementId_fkey` FOREIGN KEY (`procurementId`) REFERENCES `Procurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrackingHistory` ADD CONSTRAINT `TrackingHistory_procurementId_fkey` FOREIGN KEY (`procurementId`) REFERENCES `Procurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrackingHistory` ADD CONSTRAINT `TrackingHistory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceivingDocument` ADD CONSTRAINT `ReceivingDocument_procurementId_fkey` FOREIGN KEY (`procurementId`) REFERENCES `Procurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
