import { promises as fs } from 'fs';
//#region TS
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
    effects: string[],
    status: number,
    mode: Mode,
    parameter: string,
    brightness: number,
}

export interface IScene {
    id: number,
    name: string,
    fadeTime: number,
    dimmerFadeTime: number,
    devices: IDevice[],
}

//#endregion

/**
 * Replaces all devices.
 * @param d Array of devices.
 */
export const setDevices = async(d: IDevice[]) => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);
    let devices : IDevice[] = content.devices;
    d.forEach((device) => {
        const index = devices.findIndex(device => device.id == device.id);
        if (index != -1)
        {
            devices[index] = device;
        }
    })
    
    content.devices = devices;

    await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));
}

/**
 * Replaces a single device.
 * @param d The new device.
 */
export const setDevice = async(d: IDevice) => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);
    let devices : IDevice[] = content.devices;
    const index = devices.findIndex(device => device.id == d.id);
    if (index != -1)
    {
        devices[index].brightness = d.brightness;
        devices[index].effects = d.effects;
        devices[index].ip = d.ip;
        devices[index].mode = d.mode;
        devices[index].parameter = d.parameter;
        devices[index].status = d.status;
        content.devices = devices;

        await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));
    }
}

export const deleteDevice = async(id: number) => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);
    let devices : IDevice[] = content.devices;
    const index = devices.findIndex(device => device.id == id);
    if (index != -1)
    {
        devices.splice(index, 1);
        console.log(devices);
        content.devices = devices;

        await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));
    }
}

export const getDevices = async() : Promise<IDevice[]> => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const data = JSON.parse(file);
    var result : IDevice[] = [];

    var list = (data.devices.length) ? data.devices : [];
    if (list instanceof Array) {
        for(var i in data.devices)
            result.push(data.devices[i]);
    }

    //devices = result;
    return result;
}

/**
 * Adds a device to the database if not already existing.
 * @param device The new device.
 */
export const addDevice = async (device: IDevice) => {

    device.status = 1;

    // check in database
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);

    var list = (content.devices.length) ? content.devices : [];
    
    if (list instanceof Array) {
        // check if device is already in database and add if not
        console.log("device: ");
        console.log(device)
        if (!list.some(el => el.id === device.id)) {
            console.log("new device");
            console.log(list);
            
            list.push(<IDevice>device);
        } else {
            setDevice(device);
            console.log("added");
            console.log("existing device");
            console.log(list);
            return;
        }
    }    
    else list = [<IDevice>device]  

    content.devices = list;

    await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));
}

export const getScenes = async() : Promise<IScene[]> => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const data = JSON.parse(file);
    var result : IScene[] = [];

    var list = (data.scenes.length) ? data.scenes : [];
    if (list instanceof Array) {
        for(var i in data.scenes)
            result.push(data.scenes[i]);
    }

    //devices = result;
    return result;
}

export const setScene = async(s: IScene) => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);
    s.devices = await getDevices();
    content.scenes.push(s);

    await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));
}

export const deleteScene = async(s: IScene) => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const data = JSON.parse(file);
    var result : IScene[] = [];

    var list = (data.scenes.length) ? data.scenes : [];
    if (list instanceof Array) {
        for(var i in data.scenes)
            if (data.scenes[i].id != s.id) result.push(data.scenes[i]);
    }

    data.scenes = result;
    await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(data, null, 2));
}

export const checkDevices = async() => {
    const devices = await getDevices();
    devices.forEach(async device => {
        if(device.status === 1) {
            try {
                await fetch(device.ip, { cache: 'no-store' })
            }
            catch {
                device.status = 0;
                setDevice(device);
                console.log("offline");
            }
        }
    });
}