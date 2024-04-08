import React from "react";
import Image from 'next/image';

const Card = (props: {name: string, type: number}) => {
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
                <h5 className="text-md font-medium">{props.name}</h5>
                <p className="text-slate-600">100%</p>
            </div>
        </div>
    )
}

export default Card;