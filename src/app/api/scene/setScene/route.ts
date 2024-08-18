import { setScene } from "@db/data";

export const POST = async (request: Request)=> {
    const data = await request.json();
    console.log(data);
    await setScene(data);

    return new Response('Success!', {
        status: 200,
    });
}