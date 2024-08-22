"use client"
import Link from "next/link";
import Card from "./card";
import useSWR from "swr";
import { useState } from "react";
import Image from "next/image";
import { IDevice } from "@db/data";
import SkeletonCard from "./SkeletonCard";

function mapNumRange(props: {num: number, inMin: number, inMax: number, outMin: number, outMax: number}) {
    return (Math.round(((props.num - props.inMin) * (props.outMax - props.outMin)) / (props.inMax - props.inMin) + props.outMin));
}

const fetcher = (url:string) => fetch(url, { cache: 'no-store' }).then(r => r.json())

const Devices = () => { 
    const [editMode, setEditMode] = useState(false);
    const { data, error, isLoading, mutate } = useSWR("http://localhost:3000/api/device/getDevices", fetcher);

    if (error) return <div className="text-white">failed to load</div>
    if (isLoading) return (
        <div className="text-slate-100">
            <h2 className="font-semibold text-3xl">Devices</h2>
            <div className='flex justify-between'>
                <p className="text-slate-500">Below are all smarthome devices found in your local network</p>
                <button className='bg-zinc-800/50 p-1 px-4 rounded-md hover:bg-violet-600 z-10 ml-3' onClick={() => setEditMode(!editMode)}>
                    <Image
                        src="/assets/icons/edit.svg"
                        width={20}
                        height={20}
                        alt="LED Strip"
                        className="my-1"
                    />
                
                </button>
            </div>
            <div className="w-50 py-10 flex flex-row flex-wrap justify-center gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    )

    return (
        <div className="text-slate-100">
            <h2 className="font-semibold text-3xl">Devices</h2>
            <div className='flex justify-between'>
                <p className="text-slate-500">Below are all smarthome devices found in your local network</p>
                <button className='bg-zinc-800/50 p-1 px-5 rounded-md hover:bg-violet-600 z-10 ml-3 w-16' onClick={() => setEditMode(!editMode)}>
                    <Image
                        src="/assets/icons/edit.svg"
                        width={20}
                        height={20}
                        alt="LED Strip"
                        className="my-1"
                    />
                
                </button>
            </div>
            <div className="w-50 py-10 flex flex-row flex-wrap gap-4">
                { data.devices.map((device : IDevice) => (
                    <div>
                    { editMode ? (
                        <Card name={device.name} id={device.id} mutate={mutate} type={device.type} editMode={editMode} brightness={mapNumRange({num: Number(device.brightness), inMin: 0, inMax: 255, outMin: 0, outMax: 100})} online={device.status}/> 

                    ) : (
                        <Link href={"/devices/" + device.id}>
                            <Card name={device.name} id={device.id} mutate={mutate} type={device.type} editMode={editMode} brightness={mapNumRange({num: Number(device.brightness), inMin: 0, inMax: 255, outMin: 0, outMax: 100})} online={device.status}/> 
                        </Link>
                    )}
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Devices;