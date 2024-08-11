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

//#endregion

/**
 * Replaces all devices.
 * @param d Array of devices.
 */
export const setDevices = async(d: IDevice[]) => {
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);

    content.devices = d;

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
        devices[index] = d;
    }
    content.devices = devices;

    await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));
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
    // check if device in cached array
    /*if (devices.some(el => el.id === device.id)) 
    {
        setDevice(device);
        return;
    }*/
    device.status = 1;

    // check in database
    const file = await fs.readFile(process.cwd() + '/src/db/db.json', 'utf8');
    const content = JSON.parse(file);

    var list = (content.devices.length) ? content.devices : [];
    
    if (list instanceof Array) {
        // check if device is already in database and add if not
        if (!list.some(el => el.id === device.id)) {
            list.push(<IDevice>device);
        } else {
            const index = list.findIndex(device => device.id == device.id);
            list[index] = device;
            console.log("added")
        }
    }    
    else list = [<IDevice>device]  

    content.devices = list;

    await fs.writeFile(process.cwd() + '/src/db/db.json', JSON.stringify(content, null, 2));
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