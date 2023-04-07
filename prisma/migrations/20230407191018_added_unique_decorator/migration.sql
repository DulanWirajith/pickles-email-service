/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobId]` on the table `TaskQueueLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Email_externalId_key" ON "Email"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskQueueLog_jobId_key" ON "TaskQueueLog"("jobId");
