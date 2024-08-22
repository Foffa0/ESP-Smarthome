"use client"
import { IScene } from '@db/data';
import { KeyedMutator } from 'swr';

const SceneCard = (props: {index: number, scene: IScene, editMode: boolean, swrMutate: KeyedMutator<any>}) => {
  return(
      <div>
      {props.editMode ? (
        <div className="flex flex-col justify-between p-3 lg:p-5 rounded-xl bg-slate-300/10 w-32 h-32 lg:w-40 lg:h-40 drop-shadow-sm backdrop-blur-md">
            <p>{props.scene.name}</p>
            <button className='w-full mt-4 self-end text-red-600 bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-5 py-1 text-center' onClick={() => fetch('/api/scene/deleteScene', {method: 'POST', body: JSON.stringify({id: props.scene.id})}).then(() => props.swrMutate())}>
                Delete
            </button>
        </div>
      ):(
        <div className="flex flex-col justify-center items-center rounded-xl bg-slate-300/10 w-32 h-32 lg:w-40 lg:h-40 drop-shadow-sm backdrop-blur-md cursor-pointer" onClick={() => fetch('/api/scene/activateScene', {method: 'POST', body: JSON.stringify({id: props.scene.id})}).then(() => props.swrMutate())}>
          <p className='absolute text-xl'>{props.scene.name}</p>
            {props.index < 10 ? (
              <p className='font-bold lg:text-9xl text-center pb-3 text-slate-600/50 text-8xl'>0{props.index}</p>
            ):(
              <p className='font-bold lg:text-9xl text-center place-self-center text-slate-600 text-8xl'>{props.index}</p>
            )}
        </div>
      )}
      </div>
  )
}

export default SceneCard;