import React from "react";

const SkeletonCard = () => {
    return (
        <div className="flex flex-col justify-between p-3 lg:p-5 rounded-xl bg-slate-300/10 w-32 h-32 lg:w-40 lg:h-40 drop-shadow-sm backdrop-blur-md">
            
            <div className="w-8 lg:w-10">
                <div className="w-10 h-10 bg-zinc-400/20 rounded-lg skeleton"></div>
            </div>
            <div>
                <div>
                    <div className="w-5 h-5 bg-zinc-400/20 rounded-lg absolute top-5 right-5 skeleton"></div>
                    <div className="text-md font-medium w-full h-5 bg-zinc-400/20 rounded-lg skeleton"></div>
                    <div className="text-md font-medium w-2/5 h-4 bg-zinc-400/20 rounded-lg mt-1 skeleton"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard;