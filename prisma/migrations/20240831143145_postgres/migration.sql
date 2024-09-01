-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "brightness" INTEGER NOT NULL DEFAULT 255,
    "mode" INTEGER NOT NULL DEFAULT 0,
    "parameter" TEXT NOT NULL DEFAULT '255,255,255',
    "ip" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Effect" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fadeTime" INTEGER NOT NULL DEFAULT 0,
    "dimmerFadeTime" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceData" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "sceneId" INTEGER NOT NULL,
    "brightness" INTEGER NOT NULL DEFAULT 255,
    "mode" INTEGER NOT NULL DEFAULT 0,
    "parameter" TEXT NOT NULL DEFAULT '255,255,255',

    CONSTRAINT "DeviceData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Effect" ADD CONSTRAINT "Effect_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceData" ADD CONSTRAINT "DeviceData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceData" ADD CONSTRAINT "DeviceData_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
