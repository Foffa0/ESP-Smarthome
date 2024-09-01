import { IDevice } from "@db/data";
import prisma from "@lib/db";

// Listening for new Devices
export const POST = async (request: Request) => {
    const data : IDevice = await request.json();

    const device = await prisma.device.findUnique({
        where: {
            id: data.id,
        }
    });
    if (device == null) {
        const dev = await prisma.device.create({
            data: {
                id: data.id,
                type: data.type,
                name: data.name,
                brightness: data.brightness,
                mode: data.mode,
                parameter: data.parameter,
                ip: data.ip,
                status: data.status,
                effects: {
                    createMany: {
                        data: data.effects.map((effect) => ({
                            name: effect,
                        })),
                    }
                }
            }
        });
    } else {
        const dev = await prisma.device.update({
            where: { id: device.id },
            data: {
                ip: data.ip,
                name: data.name,
                status: 1,
                parameter: data.parameter,
                mode: data.mode,
                brightness: data.brightness
            }
        });
    }
    
    return new Response('Success!', {
        status: 200,
    })
}