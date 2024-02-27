-- -- CreateTable
-- CREATE TABLE `User` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR(191) NOT NULL,
--     `username` VARCHAR(191) NULL,
--     `password` VARCHAR(191) NULL,
--     `lastLogin` DATETIME(3) NULL,

--     UNIQUE INDEX `User_name_key`(`name`),
--     UNIQUE INDEX `User_username_key`(`username`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Role` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR(191) NOT NULL,

--     UNIQUE INDEX `Role_name_key`(`name`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `UserRole` (
--     `userName` VARCHAR(191) NOT NULL,
--     `roleName` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`userName`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Access` (
--     `path` VARCHAR(191) NOT NULL,
--     `roleId` INTEGER NOT NULL,

--     UNIQUE INDEX `Access_path_key`(`path`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Tag` (
--     `name` VARCHAR(191) NOT NULL,

--     UNIQUE INDEX `Tag_name_key`(`name`),
--     PRIMARY KEY (`name`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `ToDo` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `updatedAt` DATETIME(3) NOT NULL,
--     `title` VARCHAR(191) NOT NULL,
--     `description` TEXT NULL,
--     `completed` BOOLEAN NOT NULL DEFAULT false,
--     `username` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `_TagToToDo` (
--     `A` VARCHAR(191) NOT NULL,
--     `B` INTEGER NOT NULL,

--     UNIQUE INDEX `_TagToToDo_AB_unique`(`A`, `B`),
--     INDEX `_TagToToDo_B_index`(`B`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- AddForeignKey
-- ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleName_fkey` FOREIGN KEY (`roleName`) REFERENCES `Role`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Access` ADD CONSTRAINT `Access_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `ToDo` ADD CONSTRAINT `ToDo_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `_TagToToDo` ADD CONSTRAINT `_TagToToDo_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `_TagToToDo` ADD CONSTRAINT `_TagToToDo_B_fkey` FOREIGN KEY (`B`) REFERENCES `ToDo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255),
    `password` VARCHAR(255),
    `lastLogin` DATETIME,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `User_name_unique` (`name`),
    UNIQUE INDEX `User_username_unique` (`username`)
);

CREATE TABLE `ToDo` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `userId` INT,
    PRIMARY KEY (`id`),
    INDEX `index_userId` (`userId`),
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tag` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Tag_name_unique` (`name`)
);

CREATE TABLE `Role` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Role_name_unique` (`name`)
);

CREATE TABLE `UserRole` (
    `userId` INT NOT NULL,
    `roleId` INT NOT NULL,
    PRIMARY KEY (`userId`, `roleId`),
    INDEX `index_roleId` (`roleId`),
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Access` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(255) NOT NULL,
    `roleId` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Access_path_unique` (`path`),
    INDEX `index_roleId` (`roleId`),
    FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
