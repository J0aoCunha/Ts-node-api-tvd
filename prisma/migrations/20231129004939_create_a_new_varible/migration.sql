/*
  Warnings:

  - The primary key for the `Seasons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `seasonId` was added to the `Seasons` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seasons" (
    "seasonId" TEXT NOT NULL PRIMARY KEY,
    "season" INTEGER NOT NULL,
    "charactersId" TEXT NOT NULL,
    CONSTRAINT "Seasons_charactersId_fkey" FOREIGN KEY ("charactersId") REFERENCES "Characters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seasons" ("charactersId", "season") SELECT "charactersId", "season" FROM "Seasons";
DROP TABLE "Seasons";
ALTER TABLE "new_Seasons" RENAME TO "Seasons";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
