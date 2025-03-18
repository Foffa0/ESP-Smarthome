import prisma from "@lib/db";
import mqttClient from "@lib/mqtt";

//console.log(mqttClient.connected);

export const GET = async (request: Request)=> {
    const devices = await prisma.device.findMany({
        include: {
            effects: {
                select: {
                    name: true,
                },
            },
        },
    });
    return Response.json({ devices: devices })
}

export const POST = async (request: Request)=> {
    const devices = await prisma.device.findMany({
        include: {
            effects: {
                select: {
                    name: true,
                },
            },
        },
    });
    
    return Response.json({ devices: devices })
}