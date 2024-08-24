import prisma from "@lib/db";

export const POST = async (request: Request) => {
    const data = await request.json();

    const deleteEffects = prisma.effect.deleteMany({
        where: {
            deviceId: data.id,
        },
    });

    const deleteDeviceData = prisma.deviceData.deleteMany({
        where: {
            deviceId: data.id,
        },
    });

    const deleteDevice = prisma.device.delete({
        where: {
            id: data.id,
        },
    });

    const transaction = await prisma.$transaction([deleteEffects, deleteDeviceData, deleteDevice]);

    return new Response('Success!', {
        status: 200,
    });
}