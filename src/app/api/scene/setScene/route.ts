import { IScene } from "@db/data";
import prisma from "@lib/db";

export const POST = async (request: Request)=> {
    const data : IScene = await request.json();

    const devices = await prisma.device.findMany();
    await prisma.scene.create({
        data: {
            name: data.name,
            fadeTime: data.fadeTime,
            dimmerFadeTime: data.dimmerFadeTime,
            devices: {
                createMany: {
                    data: devices.map((dev) => ({
                        brightness: dev.brightness,
                        mode: dev.mode,
                        parameter: dev.parameter,
                        deviceId: dev.id
                    })),
                }
            }
        }
    })

    return new Response('Success!', {
        status: 200,
    });
}