import { IDevice } from "@db/data";
import prisma from "@lib/db";

export const POST = async (request: Request)=> {
    const data: IDevice = await request.json();
    data.effects = [];

    try {
        await fetch(`${data.ip}/data`, {method: 'POST', body: JSON.stringify(data)})
    } catch {
        await prisma.device.update({
            where: { id: data.id },
            data: {
                status: 0,
            }
        });
        return new Response('Error', {status: 408});
    }

    await prisma.device.update({
        where: { id: data.id },
        data: {
            status: 1,
            parameter: data.parameter,
            mode: data.mode,
            brightness: data.brightness
        }
    });
    
    return new Response('Success!', {
        status: 200,
    });
}
