import React from "react";
import Image from 'next/image';

const Card = (props: {name: string, type: number}) => {
    return (
        <div className="flex flex-col justify-between p-5 rounded-xl bg-white w-40 h-40 drop-shadow-sm">
            {props.type === 0 ? (
                <Image 
                    src="/assets/icons/led-strip.svg"
                    width={40}
                    height={40}
                    alt="LED Strip"
                    className="my-1"
                />
            ) : props.type === 1 ? (
                <Image 
                    src="/assets/icons/bulb.svg"
                    width={40}
                    height={40}
                    alt="LED Strip"
                    className="my-1"
                />
            ) : (
                <Image 
                    src="/assets/icons/matrix.svg"
                    width={40}
                    height={40}
                    alt="LED Strip"
                    className="my-1"
                />
            )}
            <div>
                <h5 className="text-md font-medium">{props.name}</h5>
                <p className="text-slate-600">100%</p>
            </div>
        </div>
    )
}

export default Card;