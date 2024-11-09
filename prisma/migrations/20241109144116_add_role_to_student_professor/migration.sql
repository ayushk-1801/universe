-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'professor';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'student';
