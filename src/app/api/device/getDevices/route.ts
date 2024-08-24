import prisma from "@lib/db";

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