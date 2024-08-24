import prisma from "@lib/db";

// Listening for new Devices
export const GET = async (request: Request)=> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const device = await prisma.device.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            effects: {
                select: {
                    name: true,
                },
            },
        },
    });
    console.log(device);
    return Response.json({ device: device })
}
