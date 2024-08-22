import { deleteDevice } from "@db/data";

export const POST = async (request: Request) => {
    const data = await request.json();
    console.log(data.id)
    await deleteDevice(data.id);
    return new Response('Success!', {
        status: 200,
    });
}