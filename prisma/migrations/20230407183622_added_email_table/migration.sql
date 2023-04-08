/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EmailTypesEnum" AS ENUM ('CONFIRM_EMAIL', 'PASSWORD_RESET_EMAIL');

-- CreateEnum
CREATE TYPE "EmailStatusEnum" AS ENUM ('PROCESS', 'SUCCESS', 'FAILED');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Email" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "externalId" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "type" "EmailTypesEnum" NOT NULL,
    "status" "EmailStatusEnum" NOT NULL DEFAULT 'PROCESS',

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);
