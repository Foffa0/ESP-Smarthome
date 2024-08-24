/*
  Warnings:

  - Made the column `deviceId` on table `DeviceData` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeviceData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "sceneId" INTEGER NOT NULL,
    "brightness" INTEGER NOT NULL DEFAULT 255,
    "mode" INTEGER NOT NULL DEFAULT 0,
    "parameter" TEXT NOT NULL DEFAULT '255,255,255',
    CONSTRAINT "DeviceData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeviceData_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeviceData" ("brightness", "deviceId", "id", "mode", "parameter", "sceneId") SELECT "brightness", "deviceId", "id", "mode", "parameter", "sceneId" FROM "DeviceData";
DROP TABLE "DeviceData";
ALTER TABLE "new_DeviceData" RENAME TO "DeviceData";
CREATE UNIQUE INDEX "DeviceData_deviceId_key" ON "DeviceData"("deviceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
