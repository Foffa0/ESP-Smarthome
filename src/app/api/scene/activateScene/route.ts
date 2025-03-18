import { IDevice } from "@db/data";
import prisma from "@lib/db";
import mqttClient from "@lib/mqtt";

interface ISceneData {
    ip: string,
    data: IDevice
}

interface IDeviceFadeRate extends IDevice {
  fadeRate: number,
  dimmerFadeRate: number
}

export const POST = async (request: Request) => {
  const data = await request.json();
  const scene = await prisma.scene.findUnique({
    where: {
      id: data.id,
    },
    include: {
      devices: true,
    }
  });

  if (scene == null) {
    return new Response('Success!', {
      status: 200,
    });
  };

  for (let i = 0; i < scene.devices.length; i++) {
    // To avoid sending old device settings such as the ip stored in a scene, 
    // we get the up to date device from db and just change the relevant data
    const dev = await prisma.device.findUnique({
      where: {
        id: scene.devices[i].deviceId,
      }
    }) as IDeviceFadeRate;
    
    if (dev == null) return;
    
    let devData : {brightness: number, mode: number, parameter: string, fadeRate: number, dimmerFadeRate: number} = {brightness: scene.devices[i].brightness, mode: scene.devices[i].mode, parameter: scene.devices[i].parameter, fadeRate: scene.fadeTime, dimmerFadeRate: scene.dimmerFadeTime};

    mqttClient.publish(`/device/${dev.id}/set`, JSON.stringify(devData), { qos: 1, retain: false }, (error, packet) => {
      if (error) {
        console.error(error);
      }
    });
  }



  // const urls : ISceneData[] = [];

  // for (let i = 0; i < scene.devices.length; i++) {
  //   // To avoid sending old device settings such as the ip stored in a scene, 
  //   // we get the up to date device from db and just change the relevant data
  //   const dev = await prisma.device.findUnique({
  //     where: {
  //       id: scene.devices[i].deviceId,
  //     }
  //   }) as IDeviceFadeRate;
    
  //   if (dev == null) return;
  //   dev.brightness = scene.devices[i].brightness;
  //   dev.mode = scene.devices[i].mode;
  //   dev.parameter = scene.devices[i].parameter;
  //   dev.fadeRate = scene.fadeTime;
  //   dev.dimmerFadeRate = scene.dimmerFadeTime;
  //   dev.effects = [];

  //   urls.push({ip: dev.ip + "/data", data: dev});
  // }

  // const fetchPromises = urls.map(url => fetch(url.ip, {method: 'POST', body: JSON.stringify(url.data)}));

  // Promise.all(fetchPromises)
  // .then(responses => {
  //   // Process the responses
  //   responses.forEach(r => {
  //     console.log(r.status);
  //   });
  // })
  // .catch(error => {
  //   // Handle any errors
  //   console.log(error)
  // });

  scene.devices.forEach(async d => {
    await prisma.device.update({
      where: {
        id: d.deviceId,
      },
      data: {
        brightness: d.brightness,
        mode: d.mode,
        parameter: d.parameter
      }
    });
  });

  return new Response('Success!', {
    status: 200,
  });
}