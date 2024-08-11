import { IDevice, setDevice } from "@db/data";

export const POST = async (request: Request)=> {
    const data: IDevice = await request.json()
    
    try {
        await fetch(`${data.ip}/data`, {method: 'POST', body: JSON.stringify(data)})
    } catch {
        data.status = 0;
        setDevice(data);
        return new Response('Error', {status: 408});
    }

    setDevice(data);
    //return Response.json({ data })
    
    return new Response('Success!', {
        status: 200,
    });
}
