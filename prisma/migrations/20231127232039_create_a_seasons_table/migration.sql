-- CreateTable
CREATE TABLE "Seasons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "season" TEXT NOT NULL,
    "charactersId" TEXT NOT NULL,
    CONSTRAINT "Seasons_charactersId_fkey" FOREIGN KEY ("charactersId") REFERENCES "Characters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
