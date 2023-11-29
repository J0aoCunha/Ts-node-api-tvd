/*
  Warnings:

  - The primary key for the `Seasons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `season` on the `Seasons` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seasons" (
    "season" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charactersId" TEXT NOT NULL,
    CONSTRAINT "Seasons_charactersId_fkey" FOREIGN KEY ("charactersId") REFERENCES "Characters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seasons" ("charactersId", "season") SELECT "charactersId", "season" FROM "Seasons";
DROP TABLE "Seasons";
ALTER TABLE "new_Seasons" RENAME TO "Seasons";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
