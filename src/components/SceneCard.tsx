"use client"
import { IScene } from '@db/data';
import { KeyedMutator } from 'swr';

const SceneCard = (props: {scene: IScene, editMode: boolean, swrMutate: KeyedMutator<any>}) => {
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
        <div className="flex flex-col justify-between p-3 lg:p-5 rounded-xl bg-slate-300/10 w-32 h-32 lg:w-40 lg:h-40 drop-shadow-sm backdrop-blur-md cursor-pointer" onClick={() => fetch('/api/scene/activateScene', {method: 'POST', body: JSON.stringify({id: props.scene.id})}).then(() => props.swrMutate())}>
            <p>{props.scene.name}</p>
        </div>
      )}
      </div>
  )
}

export default SceneCard;