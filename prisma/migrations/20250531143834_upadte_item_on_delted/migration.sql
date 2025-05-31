-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_requestId_fkey`;

-- DropIndex
DROP INDEX `Item_requestId_fkey` ON `item`;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
