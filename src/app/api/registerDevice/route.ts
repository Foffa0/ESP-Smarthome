import { addDevice, getDevices, IDevice } from "@db/data";
import prisma from "@lib/db";

// Listening for new Devices
export const POST = async (request: Request) => {
    const data : IDevice = await request.json()

    const device = await prisma.device.findUnique({
        where: {
            id: data.id,
        }
    });

    if (device == null) {
        await prisma.device.create({
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
        await prisma.device.update({
            where: { id: device.id },
            data: {
                ip: device.ip,
                name: device.name,
                status: 1,
                parameter: device.parameter,
                mode: device.mode,
                brightness: device.brightness
            }
        });
    }
    
    return new Response('Success!', {
        status: 200,
    })
}