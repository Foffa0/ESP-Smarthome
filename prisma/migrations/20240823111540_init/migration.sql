-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "brightness" INTEGER NOT NULL DEFAULT 255,
    "mode" INTEGER NOT NULL DEFAULT 0,
    "parameter" TEXT NOT NULL DEFAULT '255,255,255',
    "ip" TEXT NOT NULL,
    "status" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Effect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,
    CONSTRAINT "Effect_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fadeTime" INTEGER NOT NULL DEFAULT 0,
    "dimmerFadeTime" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "DeviceData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "sceneId" INTEGER NOT NULL,
    "brightness" INTEGER NOT NULL DEFAULT 255,
    "mode" INTEGER NOT NULL DEFAULT 0,
    "parameter" TEXT NOT NULL DEFAULT '255,255,255',
    CONSTRAINT "DeviceData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeviceData_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceData_deviceId_key" ON "DeviceData"("deviceId");
