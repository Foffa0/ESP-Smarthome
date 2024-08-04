import { addDevice } from "@db/data";

// Listening for new Devices
export const POST = async (request: Request)=> {
    const data = await request.json()
    addDevice(data);

    return Response.json({ data })
    
    /*return new Response('Success!', {
        status: 200,
    })*/
}