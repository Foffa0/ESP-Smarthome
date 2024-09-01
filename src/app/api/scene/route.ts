import prisma from "@lib/db";

export const POST = async (request: Request)=> {
    const scenes = await prisma.scene.findMany();
    return Response.json({ scenes: scenes });
}