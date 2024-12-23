-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "calories" INTEGER NOT NULL,
    "goalWeight" DOUBLE PRECISION NOT NULL,
    "bodyfat" DOUBLE PRECISION NOT NULL,
    "goalBodyFat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
