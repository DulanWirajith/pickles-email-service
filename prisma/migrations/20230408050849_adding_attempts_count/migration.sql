-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "attemptsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "TaskQueueLog" ADD COLUMN     "isNewAttempt" BOOLEAN NOT NULL DEFAULT true;
