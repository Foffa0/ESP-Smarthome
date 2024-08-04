import Link from "next/link";
import Card from "./card";
import { getDevices, checkDevices, IStatus } from "@db/data"; 

const Devices = async() => { 
    await checkDevices();
    const devices = await getDevices();

    return (
        <div className="text-slate-100">
            <h2 className="font-semibold text-3xl">Devices</h2>
            <p className="text-slate-500">Below are all smarthome devices found in your local network</p>
            <div className="w-50 py-10 flex flex-row flex-wrap justify-center gap-4">
                { devices.map((device) => (
                    <Link href={"/devices/" + device.id}>
                        <Card name={device.name} type={device.type} brightness={100} online={device.status}/> 
                    </Link>
                ))
                }
            </div>
        </div>
    )
}

export default Devices;