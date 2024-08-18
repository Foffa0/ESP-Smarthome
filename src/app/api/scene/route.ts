import { getScenes } from "@db/data"

export const GET = async (request: Request)=> {
    const scenes = await getScenes();
    return Response.json({ scenes: scenes });
}