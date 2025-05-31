-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_employeeId_fkey`;

-- DropIndex
DROP INDEX `Request_employeeId_fkey` ON `request`;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
