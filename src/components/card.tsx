import React from "react";
import Image from 'next/image';
import { KeyedMutator } from "swr";

const Card = (props: {name: string, type: number, editMode: boolean, brightness: number, online: number, id: number, mutate: KeyedMutator<any>}) => {
    return (
        <div className="flex flex-col justify-between p-3 lg:p-5 rounded-xl bg-slate-300/10 w-32 h-32 lg:w-40 lg:h-40 drop-shadow-sm backdrop-blur-md">
            
            <div className="w-8 lg:w-10">
            {props.type === 0 ? (
                <Image 
                    src="/assets/icons/led-strip.svg"
                    width={40}
                    height={40}
                    alt="LED Strip"
                    className="my-1"
                    style={{ width: "100%", height: "auto"}}
                />
            ) : props.type === 1 ? (
                <Image 
                    src="/assets/icons/bulb.svg"
                    width={40}
                    height={40}
                    alt="LED Strip"
                    className="my-1"
                    style={{ width: "100%", height: "auto"}}
                />
            ) : (
                <Image 
                    src="/assets/icons/matrix.svg"
                    width={40}
                    height={40}
                    alt="LED Strip"
                    className="my-1"
                    style={{ width: "100%", height: "auto"}}
                />
            )}
            </div>
            <div>
            {props.editMode ? (
                <div>
                    <Image width={15} height={15} src="/assets/icons/wifi.svg" className="absolute top-5 right-5" alt="wifi"/>
                    <h5 className="text-md font-medium">{props.name}</h5>
                    <button className='w-full mt-4 self-end text-red-600 bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-5 py-1 text-center' onClick={() => fetch('/api/device/deleteDevice', {method: 'POST', body: JSON.stringify({id: props.id})}).then(() => props.mutate())}>
                        Delete
                    </button>
                </div>
            ):(
                <div>
                {props.online === 1 ? (
                    <div>
                        <Image width={15} height={15} src="/assets/icons/wifi.svg" className="absolute top-5 right-5" alt="wifi"/>
                        <h5 className="text-md font-medium">{props.name}</h5>
                        <p className="text-slate-600">{props.brightness}%</p>
                    </div>
                ) : (
                    <div>
                        <Image width={15} height={15} src="/assets/icons/disconnected.svg" className="absolute top-5 right-5" alt="no wifi"/>
                        <h5 className="text-md font-medium text-slate-500">{props.name}</h5>
                        <p className="text-slate-600">---%</p>
                    </div>
                )
                }
                </div>
            )}
            </div>
        </div>
    )
}

export default Card;