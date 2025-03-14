/*
  Warnings:

  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `approval` DROP FOREIGN KEY `Approval_managerId_fkey`;

-- DropForeignKey
ALTER TABLE `procurement` DROP FOREIGN KEY `Procurement_procurementOfficerId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_employeeId_fkey`;

-- DropIndex
DROP INDEX `Approval_managerId_fkey` ON `approval`;

-- DropIndex
DROP INDEX `Procurement_procurementOfficerId_fkey` ON `procurement`;

-- DropIndex
DROP INDEX `Request_employeeId_fkey` ON `request`;

-- DropTable
DROP TABLE `employee`;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Approval` ADD CONSTRAINT `Approval_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procurement` ADD CONSTRAINT `Procurement_procurementOfficerId_fkey` FOREIGN KEY (`procurementOfficerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
