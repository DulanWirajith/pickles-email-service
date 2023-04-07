-- CreateTable
CREATE TABLE "TaskQueueLog" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "queueName" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobData" JSONB,
    "job" JSONB,
    "status" "EmailStatusEnum" NOT NULL,

    CONSTRAINT "TaskQueueLog_pkey" PRIMARY KEY ("id")
);
