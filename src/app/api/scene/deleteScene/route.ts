import { IScene } from "@db/data";
import prisma from "@lib/db";

export const POST = async (request: Request) => {
    const data : IScene = await request.json();

    const deleteDeviceData = prisma.deviceData.deleteMany({
        where: {
            sceneId: data.id,
        },
    });

    const deleteScene = prisma.scene.delete({
        where: {
            id: data.id,
        },
    });

    const transaction = await prisma.$transaction([deleteDeviceData, deleteScene]);

    return new Response('Success!', {
        status: 200,
    });
}