"use client"
import "@styles/globals.css";
import Image from "next/image";
import { Range, getTrackBackground } from 'react-range';
import { useEffect, useState } from "react";
import Wheel from '@uiw/react-color-wheel';
import { rgbaToHsva, rgbaToHex, rgbaToRgb, getContrastingColor } from '@uiw/color-convert';
import Swatch from '@uiw/react-color-swatch';
import ReactGPicker from 'react-gcolor-picker';
import clsx from 'clsx';
import EffectCard from "@components/EffectCard";
import Link from "next/link";
import { IDevice } from "@db/data";
import useSWR from 'swr'

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

const fetcher = (url:string) => fetch(url, { cache: 'no-store' }).then(r => r.json())

export default function DeviceControl({ 
    params
}: {
    params: {id: string}
}) {
    const { data, error, isLoading } = useSWR(`http://localhost:3000/api/device?id=${params.id}`, fetcher)
    
    const [brightness, setBrightness] = useState([60]);
    const [mode, setMode] = useState<number>(0);
    const [rgba, setRgba] = useState({ r: 200, g: 0, b: 0, a: 255});
    const [gradient, setGradient] = useState("linear-gradient(90deg, rgb(255, 0, 0) 0.00%, rgb(0, 255, 0) 100.00%)");
    const [effect, setEffect] = useState(0);
    const [effectSpeed, setEffectSpeed] = useState([1]);
    // Prevent sending too many post requests by capturing mouse events
    const [valueChanged, setValueChanged] = useState(false);
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        if (!data) return;
        if (data.device.mode != mode) {
            setMode(data.device.mode);
        }
        if (data.device.mode == 0 ) {
            let col = {r: 0, g: 0, b: 0};
            data.device.parameter != rgbaToRgb(rgba);
            let regex = new RegExp(/\,+/, 'g');
            let matches : any[] = Array.from(data.device.parameter.matchAll(regex));
            col.r = data.device.parameter.substring(0, matches[0].index);
            col.g = data.device.parameter.substring(matches[0].index + 1, matches[1].index);
            col.b = data.device.parameter.substring(matches[1].index + 1, data.device.parameter.length);
            if (col != rgbaToRgb(rgba)) {
                setRgba({r: col.r, g: col.g, b: col.b, a: 255});
                setValueChanged(true);
            }
        }
        if (data.device.brightness != brightness) {
            setBrightness([data.device.brightness]);
        }
        if (data.device.mode == 1) {
            let gradientString = "linear-gradient(90deg";
            let regex = new RegExp(/\|+/, 'g');
            let matches : any[] = Array.from(data.device.parameter.matchAll(regex));

            // Build valid css gradient string needed for the gradient picker (e.x "linear-gradient(90deg, rgb(255, 0, 0) 0.00%, rgb(0, 255, 0) 100.00%)")
            // input from db in the following format: 255,0,0,0|100,52,2,100 ...
            let lastMatch = 0;
            matches.forEach(match => {
                let temp = data.device.parameter.substring(lastMatch, match.index);
                gradientString += ", rgb(" + temp.substring(0, temp.lastIndexOf(',')) + ") " + temp.substring(temp.lastIndexOf(',') + 1, temp.length) + ".00%";
                lastMatch = match.index + 1;
            });
            let temp = data.device.parameter.substring(lastMatch, data.device.parameter.length);
            gradientString += ", rgb(" + temp.substring(0, temp.lastIndexOf(',')) + ") " + temp.substring(temp.lastIndexOf(',') + 1, temp.length) + ".00%)";
            setGradient(gradientString);
        }
    }, [data]);

    useEffect(() => {
        if (valueChanged == false) return;
        setValueChanged(false);
        if (!data) return;
        
        let parameter = "";
        switch (mode) {
            case 0:
                let color = rgbaToRgb(rgba);
                parameter = color.r + "," + color.g + "," + color.b;
                break;
            
            case 1:
                let c = gradient.replace(/\s/g, "").split("rgb");
                console.log(gradient)
                c.forEach((element, index) => {
                    if (index != 0) {
                        parameter += element.substring(1, element.indexOf(')'));
                        parameter += "," + element.substring(element.indexOf(')') + 1, element.lastIndexOf('.'));
                        index != c.length-1 ? parameter += "|" : "";
                    }
                });
                break;
            case 2:
                parameter = effect.toString() + "?" + effectSpeed;
                break;
        }
        const body: IDevice = {
            status: data.device.status,
            mode: mode,
            parameter: parameter,
            brightness: brightness[0],
            id: Number(params.id),
            type: data.device.type,
            name: data.device.name,
            ip: data.device.ip,
            effects: data.device.effects
        }
        fetch('http://localhost:3000/api/device/setData', {method: "POST", body: JSON.stringify(body)})
        .then((response) => {
            if (response.status == 408) {
                data.device.status = 0;
            }
        })
    }, [valueChanged]);

    if (error) return <div className="text-white">failed to load</div>
    if (isLoading) return <div className="text-white">loading...</div>
    

    return (
        <div className="device-bg flex justify-center lg:py-24 px-5 lg:px-80 md:px-40 sm:px-12 min-h-dvh" onPointerUp={() => {mouseDown ? setValueChanged(true) : setMouseDown(false); setMouseDown(false)}}>
            <div className="bg-gray-800/50 rounded-xl pb-20 px-5 md:px-10 min-w-80 max-w-lg text-slate-50">
                <div className="pt-5 pb-10">
                    <Link href={"/"}><Image src={"/assets/icons/back.svg"} width={20} height={20} alt="back"/></Link>
                </div>
                <div className="flex flex-row gap-3">
                    { data.device.type == 0 ? (
                        <Image src="/assets/icons/led-strip.svg" width={50} height={50} alt="led strip" />
                    ) : data.device.type == 1 ? (
                        <Image src="/assets/icons/bulb.svg" width={50} height={50} alt="bulb" />
                    ) : (
                        <Image src="/assets/icons/matrix.svg" width={50} height={50} alt="led matrix" />
                    )
                    }
                    <div>
                        <h2 className="font-bold text-xl">{data.device.name}</h2>
                        
                            { data.device.status == 1 ? 
                            (
                                <div className="flex flex-row gap-1.5">
                                    <p className="text-slate-500">Online</p>
                                    <Image width={15} height={15} src="/assets/icons/wifi.svg" alt="wifi"/>
                                </div>
                            ):(
                                <div className="flex flex-row gap-1.5">
                                    <p className="text-slate-500">Offline</p>
                                    <Image width={15} height={15} src="/assets/icons/disconnected.svg" alt="wifi"/>
                                </div>
                            )
                            }
                    </div>
                </div>
                <div className="my-10">
                    <div>
                            <p className="font-medium text-md text-slate-200 inline-block">Brightness</p>
                            <p className="inline-block float-right">{mapNumRange({num: brightness[0], inMin: 0, inMax: 255, outMin: 0, outMax: 100})}%</p>
                        <div className="py-10 max-w-2xl flex items-center gap-5">
                            <Image width={20} height={20} src="/assets/icons/brightness.svg" alt="light dimm"/>
                            <Range 
                                step={1} 
                                min={0} 
                                max={255} 
                                values={brightness} 
                                onChange={(values) => setBrightness( values )} 
                                onFinalChange={(values) => setValueChanged( true )}
                                renderTrack={({ props, children }) => ( 
                                <div 
                                    {...props} 
                                    style={{ 
                                    ...props.style, 
                                    height: '10px', 
                                    width: '100%', 
                                    background: getTrackBackground({min: 0, max: 255, values: brightness, colors: ["#548BF4", "#ccc"]}),
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
                        <p className="font-medium text-md text-slate-200">Mode</p>
                        <div className="mt-4">
                            <ul className="list-none h-16">
                                <li className={clsx("rounded-full float-left px-5 py-2 mx-1 cursor-pointer", { "bg-slate-500": mode === 0, "bg-slate-900": mode != 0 })} onClick={() => {setMode(0); setValueChanged(true)}}>Color</li>
                                { data.device.type != 2 ? (
                                    <li className={clsx("rounded-full float-left px-5 py-2 mx-1 cursor-pointer", { "bg-slate-500": mode === 1, "bg-slate-900": mode != 1})} onClick={() => {setMode(1); setValueChanged(true)}}>Gradient</li>
                                ) : ""}
                                <li className={clsx("rounded-full float-left px-5 py-2 mx-1 cursor-pointer", { "bg-slate-500": mode === 2, "bg-slate-900": mode != 2 })} onClick={() => {setMode(2); setValueChanged(true)}}>Effect</li>
                            </ul>
                            {mode === 0 ? (
                                <div className="flex flex-col items-center">
                                    <Wheel width={200} height={200} color={rgbaToHsva(rgba)} onChange={(color) => setRgba(color.rgba)}  onPointerDown={() => setMouseDown(true)}/>
                                    <Swatch
                                        colors={[ '#FF0000', '#FF7F00', '#FFFF00', '#7fff00', '#00ff00', '#00ff7f', '#00ffff','#007fff', '#0000ff', '#7f00ff', '#ff00ff', '#ff007f' ]}
                                        color={rgbaToHex(rgba)}
                                        rectProps={{
                                            children: <Point />,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: "20px 5px 20px 5px"
                                            },
                                        }}
                                        onChange={(hsvColor, color) => {
                                            setRgba(color.rgba);
                                            setValueChanged(true);
                                        }}
                                        
                                        />

                                    {/*<div style={{ width: '100%', height: 34, marginTop: 20, background: hsvaToHex(rgb) }}></div> */}
                                </div>
                            ) : mode === 1 && data.device.type != 2 ? (
                                <div className="flex justify-center">
                                    <ReactGPicker value={gradient} gradient showGradientAngle={false} showGradientPosition={false} showGradientMode={false} solid={false} showAlpha={false} defaultColors={[]} onChange={(value) => {setGradient(value); setValueChanged(true)}}/>
                                </div>
                            ) : (
                                <div>
                                    <div className="px-10 pb-10 flex flex-nowrap items-center">
                                        <p className="pr-5">Speed</p>
                                        <Range 
                                            step={1} 
                                            min={1} 
                                            max={255} 
                                            values={effectSpeed} 
                                            onChange={(values) => setEffectSpeed( values )} 
                                            onFinalChange={(values) => setValueChanged( true )}
                                            renderTrack={({ props, children }) => ( 
                                            <div 
                                                {...props} 
                                                style={{ 
                                                ...props.style, 
                                                height: '10px', 
                                                width: '100%', 
                                                background: getTrackBackground({min: 0, max: 255, values: effectSpeed, colors: ["#548BF4", "#ccc"]}),
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
                                    </div>
                                    <div className="flex flex-row flex-wrap justify-center gap-3">
                                        {/* <EffectCard name="No Effect" active={effect === 0} imageUrl="/assets/icons/circleCrossed.svg" onClick={() => {setEffect(0)}}/> */}
                                        { data.device.effects.map((e: string, index: number) => (                                  
                                            <EffectCard name={e} active={effect === index} onClick={() => {setEffect(index); setValueChanged(true)}}/>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}