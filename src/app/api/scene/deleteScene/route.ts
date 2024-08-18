import { deleteScene, getScenes } from "@db/data";

export const POST = async (request: Request) => {
    const data = await request.json();
    const scene = (await getScenes()).filter((s) => s.id == Number(data.id))[0];
  
    await deleteScene(scene);
    return new Response('Success!', {
        status: 200,
    });
}