import { getDevices } from "@db/data";

// Listening for new Devices
export const GET = async (request: Request)=> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const devices = await getDevices();
    console.log(id);
    const device = devices.find(device => device.id == Number(id));
    console.log(device);
    return Response.json({ device })
    
    /*return new Response('Success!', {
        status: 200,
    })*/
}
