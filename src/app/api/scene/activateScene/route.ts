import { getDevices, getScenes, IDevice, setDevices } from "@db/data";

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
  const scene = (await getScenes()).filter((s) => s.id == Number(data.id))[0];

  const devices = await getDevices();

  const urls : ISceneData[] = [];

  scene.devices.forEach(device => {
    // To avoid sending old device settings such as the ip stored in a scene, 
    // we get the up to date device from db and just change the relevant data
    const dev = devices.filter((d) => d.id == Number(device.id))[0] as IDeviceFadeRate;
    dev.brightness = device.brightness;
    dev.mode = device.mode;
    dev.parameter = device.parameter;
    dev.fadeRate = scene.fadeTime;
    dev.dimmerFadeRate = scene.dimmerFadeTime;

    urls.push({ip: dev.ip + "/data", data: dev});
  });

  const fetchPromises = urls.map(url => fetch(url.ip, {method: 'POST', body: JSON.stringify(url.data)}));

  Promise.all(fetchPromises)
  .then(responses => {
    // Process the responses
    responses.forEach(r => {
      console.log(r.status);
    });
  })
  .catch(error => {
    // Handle any errors
    console.log(error)
  });

  await setDevices(scene.devices);

  return new Response('Success!', {
    status: 200,
  });
}