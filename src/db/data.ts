import { promises as fs } from 'fs';

export enum Mode {
    Color,
    Gradient,
    Effect
}

export interface IDevice {
    id: number,
    type: number,
    name: string,
    ip: string,
}

export interface IStatus extends IDevice {
    status: number,
    mode: Mode,
    parameter: string,
    brightness: number,
}

let devices : IStatus[] = [{ id: 1, type: 2, name: 'LED', brightness: 255, mode: Mode.Color, parameter: "255,200,0", ip: 'http://192.168.1.12', status: 1 },
    { id: 333, type: 1, name: 'tff', ip: 'http://192.168.3.12', status: 1, brightness: 255, mode: Mode.Effect, parameter: "1", }];

/**
 * Gets all registered devices.
 * @returns List of devices IStatus[].
 */
export const getDevices = async() : Promise<IStatus[]> => {
    if (devices.length === 0) await getDevicesFromDb();
    console.log(devices);
    return devices;
}

export const setDevices = (d: IStatus[]) => {
    devices = d;
    console.log(devices);
}

export const getDevicesFromDb = async() => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const data = JSON.parse(file);
    var result : IStatus[] = [];

    var list = (data.devices.length) ? data.devices : [];
    if (list instanceof Array) {
        for(var i in data.devices)
            result.push(data.devices[i]);
    }

    devices = result;
    console.log(devices);
}

// Adds a device to the database if not already existing
export const addDevice = async (device: IStatus) => {
    // check if device in cached array
    if (devices.some(el => el.id === device.id)) 
    {
        device.status = 1;
        return;
    }

    // check in database
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);

    var list = (content.devices.length) ? content.devices : [];
    
    if (list instanceof Array) {
        // check if device is already in database and add if not
        if (!list.some(el => el.id === device.id)) list.push(<IDevice>device);
    }    
    else list = [<IDevice>device]  

    content.devices = list;

    await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));

    await getDevicesFromDb();
}

export const checkDevices = async() => {
    devices.forEach(async device => {
        if(device.status === 1) {
            try {
                await fetch(device.ip, { cache: 'no-store' })
            }
            catch {
                device.status = 0;
                console.log("offline");
            }
        }
    });
}