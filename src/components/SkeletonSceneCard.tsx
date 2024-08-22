import React from "react";

const SkeletonSceneCard = () => {
    return (
        <div className="flex flex-col justify-center items-center rounded-xl bg-slate-300/10 w-32 h-32 lg:w-40 lg:h-40 drop-shadow-sm backdrop-blur-md cursor-pointer">
            <div className='absolute text-xl skeleton w-1/2 h-5 bg-zinc-400/20 rounded-lg'></div>
        </div>
    )
}

export default SkeletonSceneCard;