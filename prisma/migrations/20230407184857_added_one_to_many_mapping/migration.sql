-- AlterTable
ALTER TABLE "TaskQueueLog" ADD COLUMN     "emailId" UUID;

-- AddForeignKey
ALTER TABLE "TaskQueueLog" ADD CONSTRAINT "TaskQueueLog_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE SET NULL ON UPDATE CASCADE;
