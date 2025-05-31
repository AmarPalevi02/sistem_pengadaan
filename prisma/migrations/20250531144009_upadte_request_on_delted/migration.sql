-- DropForeignKey
ALTER TABLE `approval` DROP FOREIGN KEY `Approval_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `procurement` DROP FOREIGN KEY `Procurement_requestId_fkey`;

-- AddForeignKey
ALTER TABLE `Approval` ADD CONSTRAINT `Approval_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procurement` ADD CONSTRAINT `Procurement_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
