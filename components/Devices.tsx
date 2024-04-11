import Link from "next/link";
import Card from "./card";

const Devices = () => {
    const devices = [{name: "Led Strip", type: 0}, {name: "LED Strip Monitor", type: 0}, {name: "LED Bar", type: 1}, {name: "LED Matrix", type: 2}]
    return (
        <div className="text-slate-100">
            <h2 className="font-semibold text-3xl">Devices</h2>
            <p className="text-slate-500">Below are all smarthome devices found in your local network</p>
            <div className="w-50 py-10 flex flex-row flex-wrap justify-center gap-4">
                { devices.map((device, index) => (
                    <Link href={"/devices/" + index}>
                    <Card name={device.name} type={device.type}/>
                    </Link>
                ))
                }
            </div>
        </div>
    )
}

export default Devices;