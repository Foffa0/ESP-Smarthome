import Link from "next/link";
import Card from "./card";

const Devices = () => {
    return (
        <div>
            <h2 className=" font-semibold text-3xl">Devices</h2>
            <p className="text-slate-500">Below are all smarthome devices found in your local network</p>
            <div className="w-50 py-10 flex flex-row flex-wrap gap-4">
            <Link href="/devices/1">
                <Card name="Led Strip Bett" type={0} />
            </Link>
            <Card name="Led Strip Monitor" type={0} />
            <Card name="Led Matrix" type={2} />
            <Card name="Led Bar" type={1} />
            <Card name="Led Strip Bett" type={1}/>
            <Card name="Led Strip Bett" type={1}/>
            <Card name="Led Strip Bett" type={1}/>
            <Card name="Led Strip Bett" type={1}/>
            <Card name="Led Strip Bett" type={1}/>
            </div>
        </div>
    )
}

export default Devices;