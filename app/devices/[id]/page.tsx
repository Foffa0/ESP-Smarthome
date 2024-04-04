"use client"
import "@styles/globals.css";
import Image from "next/image";
import { Range, getTrackBackground } from 'react-range';
import { useState } from "react";

export default function DeviceControl({ 
    params
}: {
    params: {id: string}
}) {
    const [value, setValue] = useState([60]);

    return (
        <div className="device-bg py-24 px-10 lg:px-80 md:px-40 sm:px-12 min-h-dvh">
        <div className="bg-gray-800/50 rounded-lg py-20 px-10 min-w-96 text-slate-50">
            <div className="flex flex-row gap-3">
                <Image src="/assets/icons/bulb.svg" width={50} height={50} alt="bulb" />
                <div>
                    <h2 className="font-bold text-xl">LED Strip Bett</h2>
                    <div className="flex flex-row gap-1.5">
                        <p className="text-slate-500">Online</p>
                        <Image width={15} height={15} src="/assets/icons/wifi.svg" alt="wifi"/>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <div>
                    <p className="font-semibold text-xl text-slate-200">Brightness</p>
                    <p>{value}</p>
                    <div className="py-10 max-w-2xl flex items-center gap-5">
                        <Image width={20} height={20} src="/assets/icons/brightness.svg" alt="light dimm"/>
                        <Range 
                            step={1} 
                            min={0} 
                            max={255} 
                            values={value} 
                            onChange={(values) => setValue( values )} 
                            renderTrack={({ props, children }) => ( 
                            <div 
                                {...props} 
                                style={{ 
                                ...props.style, 
                                height: '10px', 
                                width: '100%', 
                                background: getTrackBackground({min: 0, max: 255, values: value, colors: ["#548BF4", "#ccc"]}),
                                borderRadius: "5px"
                                }} 
                            > 
                                {children} 
                            </div> 
                            )} 
                            renderThumb={({ props }) => ( 
                            <div 
                                {...props} 
                                style={{ 
                                ...props.style, 
                                height: '15px', 
                                width: '15px', 
                                backgroundColor: '#999',
                                borderRadius: '100%'
                                }} 
                            /> 
                            )} 
                        /> 
                        <Image width={28} height={28} src="/assets/icons/brightness.svg" alt="light bright"/>
                    </div>
                </div>
                <div>
                    <p>Mode pills</p>
                </div>
            </div>
        </div>
        </div>
    )
}