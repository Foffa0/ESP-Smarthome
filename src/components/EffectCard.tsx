import React from "react";
import Image from 'next/image';
import clsx from 'clsx';

const EffectCard = (props: {name: string, imageUrl?: string, onClick: () => void, active?: boolean}) => {
    return (
        <div className={clsx("flex flex-col items-center justify-center p-3 lg:p-5 rounded-xl bg-slate-900 w-28 h-28 lg:w-28 lg:h-28 drop-shadow-sm", {"active-shadow": props.active})} onClick={props.onClick}>
            <div className="w-8 lg:w-10">
                {props.imageUrl ? (
                    <Image 
                        src={props.imageUrl}
                        width={40}
                        height={40}
                        alt="LED Strip"
                        className="my-1"
                        style={{ width: "100%", height: "auto"}}
                    />
                ) : null}
            </div>
            <div>
                <h5 className="text-sm font-normal">{props.name}</h5>
            </div>
        </div>
    )
}

export default EffectCard;