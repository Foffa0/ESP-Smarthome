"use client"
import "@styles/globals.css";
import Image from "next/image";
import { Range, getTrackBackground } from 'react-range';
import { useState } from "react";
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex, getContrastingColor } from '@uiw/color-convert';
import Swatch from '@uiw/react-color-swatch';
import ReactGPicker from 'react-gcolor-picker';
import clsx from 'clsx';

function Point(props: { color?: string; checked?: boolean }) {
    if (!props.checked) return null;
    return (
      <div
        style={{
          height: 5,
          width: 5,
          borderRadius: '50%',
          backgroundColor: getContrastingColor(props.color!),
        }}
      />
    );
}

function mapNumRange(props: {num: number, inMin: number, inMax: number, outMin: number, outMax: number}) {
  return (Math.round(((props.num - props.inMin) * (props.outMax - props.outMin)) / (props.inMax - props.inMin) + props.outMin));
}
  

export default function DeviceControl({ 
    params
}: {
    params: {id: string}
}) {
    const [value, setValue] = useState([60]);
    const [mode, setMode] = useState<number>(0);
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

    return (
        <div className="device-bg lg:py-24 px-10 lg:px-80 md:px-40 sm:px-12 min-h-dvh">
        <div className="bg-gray-800/50 rounded-xl py-20 px-10 min-w-96 text-slate-50">
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
                        <p className="font-semibold text-xl text-slate-200 inline-block">Brightness</p>
                        <p className="inline-block float-right">{mapNumRange({num: value[0], inMin: 0, inMax: 255, outMin: 0, outMax: 100})}%</p>
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
                    <p className="font-semibold text-xl text-slate-200">Mode</p>
                    <div className="mt-4">
                        <ul className="list-none h-16">
                            <li className={clsx("rounded-full float-left px-5 py-2 mx-1 cursor-pointer", { "bg-slate-500": mode === 0, "bg-slate-900": mode != 0 })} onClick={() => {setMode(0)}}>Color</li>
                            <li className={clsx("rounded-full float-left px-5 py-2 mx-1 cursor-pointer", { "bg-slate-500": mode === 1, "bg-slate-900": mode != 1})} onClick={() => {setMode(1)}}>Gradient</li>
                            <li className={clsx("rounded-full float-left px-5 py-2 mx-1 cursor-pointer", { "bg-slate-500": mode === 2, "bg-slate-900": mode != 3 })} onClick={() => {setMode(2)}}>Effect</li>
                        </ul>
                        {mode === 0 ? (
                            <div className="flex flex-col items-center">
                                <Wheel width={200} height={200} color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} />
                                <Swatch
                                    colors={[ '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00' ]}
                                    color={hsvaToHex(hsva)}
                                    rectProps={{
                                        children: <Point />,
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: "20px 5px 20px 5px"
                                        },
                                    }}
                                    onChange={(hsvColor) => {
                                        setHsva(hsvColor)
                                    }}
                                    />

                                <div style={{ width: '100%', height: 34, marginTop: 20, background: hsvaToHex(hsva) }}></div>
                            </div>
                        ) : mode === 1 ? (
                            <div className="flex justify-center">
                                <ReactGPicker value='linear-gradient(90deg, rgb(255, 0, 0) 0.00%, rgb(0, 255, 0) 100.00%)' gradient showGradientAngle={false} showGradientPosition={false} showGradientMode={false} solid={false} showAlpha={false} defaultColors={['linear-gradient(270deg, rgb(251, 171, 126) 8.00%, rgb(247, 206, 104) 92.00%)',]} onChange={() => {}} />
                            </div>
                        ) : (
                            <div>
                                test3
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}