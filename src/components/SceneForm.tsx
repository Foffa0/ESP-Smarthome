"use client"
import { IScene } from '@db/data';
import Image from 'next/image';
import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { Range, getTrackBackground } from 'react-range';

const SceneForm = (props:{swrMutate: KeyedMutator<any>}) => {
    const [showDialog, setDialog] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        colFade: 1,
        dimFade: 1
    });

    const [sceneName, setSceneName] = useState<string>("");
    const [colFadeTime, setColFadeTime] = useState<number>(1);
    const [dimFadeTime, setDimFadeTime] = useState<number>(1);

    /*const handleInput = (e: any) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        
        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }*/

    const submitForm = (e: any) => {
        // We don't want the page to refresh
        e.preventDefault()
    
        const formURL = e.target.action
        /*const data = new FormData()
    
        // Turn our formData state into data we can use with a form submission
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, String(value));
        })*/

        const body: IScene = {
            id: Date.now(),
            name: sceneName,
            fadeTime: colFadeTime,
            dimmerFadeTime: dimFadeTime,
            devices: []
        }
    
        // POST the data to the URL of the form
        fetch(formURL, {
            method: "POST",
            body: JSON.stringify(body),
        }).then(() => {
            setColFadeTime(0);
            setSceneName("");
            setDialog(false);
            props.swrMutate();
        })
    }
    return(
        <div>
        { showDialog ?
            (
            <div className="flex flex-col p-3 lg:p-5 rounded-xl bg-slate-300/10 w-full h-60 lg:w-64 lg:h-80 drop-shadow-sm backdrop-blur-md md:w-60">
                <form method="POST" action="/api/scene/setScene" onSubmit={submitForm}>
                    <div className="">
                        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Name</label>
                        <input className="text-sm rounded-lg block w-full p-1.5 bg-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:bg-zinc-600" type="text" name='name' value={sceneName} onChange={(e) => setSceneName(e.target.value)} required/>
                    </div>
                    <div className="">
                        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Color fade time</label>
                        <Range 
                            step={1} 
                            min={1} 
                            max={100} 
                            values={[colFadeTime]} 
                            onChange={(values) => setColFadeTime(values[0])} 
                            /*onFinalChange={(values) => handleInput(values[0])}*/
                            renderTrack={({ props, children }) => ( 
                            <div 
                                {...props} 
                                style={{ 
                                ...props.style, 
                                height: '10px', 
                                width: '100%', 
                                background: getTrackBackground({min: 1, max: 100, values: [colFadeTime], colors: ["#548BF4", "#ccc"]}),
                                borderRadius: "5px",
                                margin: "1rem 0",
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
                        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Dimmer fade time</label>
                        <Range 
                            step={1} 
                            min={1} 
                            max={50} 
                            values={[dimFadeTime]} 
                            onChange={(values) => setDimFadeTime(values[0])} 
                            /*onFinalChange={(values) => handleInput(values[0])}*/
                            renderTrack={({ props, children }) => ( 
                            <div 
                                {...props} 
                                style={{ 
                                ...props.style, 
                                height: '10px', 
                                width: '100%', 
                                background: getTrackBackground({min: 1, max: 50, values: [dimFadeTime], colors: ["#548BF4", "#ccc"]}),
                                borderRadius: "5px",
                                margin: "1rem 0",
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
                    <button type="submit" className='w-full mt-5 self-end text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Save</button>
                </form>
                <button type='button' className='w-full mt-4 self-end text-white bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-5 py-1 text-center' onClick={() => setDialog(false)}>Cancel</button>
            </div>
            ):(
            <div className="flex flex-col justify-between p-3 lg:p-5 rounded-xl bg-slate-300/10 w-32 h-32 lg:w-40 lg:h-40 drop-shadow-sm backdrop-blur-md" onClick={() => setDialog(true)}>
                <Image 
                src="/assets/icons/plus.svg"
                width={40}
                height={40}
                alt="LED Strip"
                className="my-1"
                style={{ width: "auto", height: "100%", padding: "1rem"}}
                />
            </div>
            )}
        </div>
    )
}

export default SceneForm;