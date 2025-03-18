import { IDevice } from "@db/data";
import prisma from "@lib/db";
import mqttClient from "@lib/mqtt";

export const POST = async (request: Request)=> {
    const data: IDevice = await request.json();
    data.effects = [];

    mqttClient.publish(`/device/${data.id}/set`, JSON.stringify(data), { qos: 1, retain: false }, (error, packet) => {
        if (error) {
          console.error(error)
        }
    });

    await prisma.device.update({
        where: { id: data.id },
        data: {
            parameter: data.parameter,
            mode: data.mode,
            brightness: data.brightness
        }
    });
    
    return new Response('Success!', {
        status: 200,
    });
}
