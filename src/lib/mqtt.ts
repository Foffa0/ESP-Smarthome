import mqtt from "mqtt"; // import namespace "mqtt"
import prisma from "./db";


const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const mqttClientSingleton = () => {
    let client = mqtt.connect("mqtt://mqtt-smarthome:1883", {clientId: clientId, connectTimeout: 4000, username: "user1", password: "esp-smarthome"}); // create a client
    client.on('connect', () => {
      console.log('Connected');
      client.subscribe(["/device/#"], () => {
        console.log("Subscribed to topic");
      });
    });
    client.on('error', (error) => {
      console.log(error);
      console.log(error.name);
      console.log(error.message);
    })

    client.on('message', async(topic, payload) => {
      console.log('Received Message:', topic, payload.toString());
      if (topic.match(/\/device\/[0-9]+\/register/i)) {
        const data : {id: number, name: string, type: number, brightness: number, mode: number, parameter: string, effects: string[]} = JSON.parse(payload.toString());

        const device = await prisma.device.findUnique({
            where: {
                id: data.id,
            }
        });
        console.log("device: ", device);
        if (device == null) {
            const dev = await prisma.device.create({
                data: {
                    id: data.id,
                    type: data.type,
                    name: data.name,
                    brightness: data.brightness,
                    mode: data.mode,
                    parameter: data.parameter,
                    status: 1,
                    effects: {
                        createMany: {
                            data: data.effects.map((effect) => ({
                                name: effect,
                            })),
                        }
                    }
                }
            });
            console.log("created device:", dev);
        } else {
            const dev = await prisma.device.update({
                where: { id: device.id },
                data: {
                  name: data.name,
                  status: 1,
                }
            });
        }
      } else if (topic.match(/\/device\/[0-9]+\/status/i)) {
        var arr = topic.match(/[0-9]+/i);
        if (arr != null){
          const dev = await prisma.device.update({
            where: { id: Number(arr[0][0]) },
            data: {
              status: Number(payload.toString()),
            }
          });
        }
      }
    });
    return client;
}

declare const globalThis: {
  mqttGlobal: ReturnType<typeof mqttClientSingleton>;
} & typeof global;

const mqttClient = globalThis.mqttGlobal ?? mqttClientSingleton()

export default mqttClient
 

if (process.env.NODE_ENV !== 'production') globalThis.mqttGlobal = mqttClient