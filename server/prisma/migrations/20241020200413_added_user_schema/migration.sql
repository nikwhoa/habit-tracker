/*
  Warnings:

  - You are about to drop the column `habitId` on the `Spheres` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Spheres" DROP CONSTRAINT "Spheres_habitId_fkey";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Spheres" DROP COLUMN "habitId",
ADD COLUMN     "habitIds" INTEGER[];

-- CreateTable
CREATE TABLE "_HabitSpheres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HabitSpheres_AB_unique" ON "_HabitSpheres"("A", "B");

-- CreateIndex
CREATE INDEX "_HabitSpheres_B_index" ON "_HabitSpheres"("B");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HabitSpheres" ADD CONSTRAINT "_HabitSpheres_A_fkey" FOREIGN KEY ("A") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HabitSpheres" ADD CONSTRAINT "_HabitSpheres_B_fkey" FOREIGN KEY ("B") REFERENCES "Spheres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
