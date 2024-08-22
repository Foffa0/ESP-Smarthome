import { getDevices } from "@db/data";

export const GET = async (request: Request)=> {
    const devices = await getDevices();
    return Response.json({ devices: devices })
    
    /*return new Response('Success!', {
        status: 200,
    })*/
}