/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "calories" INTEGER NOT NULL,
    "goalWeight" DOUBLE PRECISION NOT NULL,
    "bodyfat" DOUBLE PRECISION NOT NULL,
    "goalBodyFat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
