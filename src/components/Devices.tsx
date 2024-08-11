import Link from "next/link";
import Card from "./card";
import { getDevices, checkDevices } from "@db/data"; 

function mapNumRange(props: {num: number, inMin: number, inMax: number, outMin: number, outMax: number}) {
    return (Math.round(((props.num - props.inMin) * (props.outMax - props.outMin)) / (props.inMax - props.inMin) + props.outMin));
}

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
                        <Card name={device.name} type={device.type} brightness={mapNumRange({num: Number(device.brightness), inMin: 0, inMax: 255, outMin: 0, outMax: 100})} online={device.status}/> 
                    </Link>
                ))
                }
            </div>
        </div>
    )
}

export default Devices;