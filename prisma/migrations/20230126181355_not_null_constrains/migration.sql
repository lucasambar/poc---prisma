/*
  Warnings:

  - Made the column `position_id` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department_id` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `started_at` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "position_id" SET NOT NULL,
ALTER COLUMN "department_id" SET NOT NULL,
ALTER COLUMN "started_at" SET NOT NULL;
