"use client"
import { IScene } from '@db/data';
import SceneForm from './SceneForm';
import SceneCard from './SceneCard';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import SkeletonSceneCard from './SkeletonSceneCard';

const fetcher = (url:string) => fetch(url, { cache: 'no-store' }).then(r => r.json())

const Scenes = () => {
  const [editMode, setEditMode] = useState(false);
  const { data, error, isLoading, mutate } = useSWR("http://localhost:3000/api/scene", fetcher);

  if (error) return <div className="text-white">failed to load</div>
  if (isLoading) return (
    <div className='text-slate-100'>
      <h2 className=" font-semibold text-3xl">Scenes</h2>
      <div className='flex justify-between'>
        <p className="text-slate-500">Your saved scenes</p>
        <button className='bg-zinc-800/50 p-1 px-5 rounded-md hover:bg-violet-600 z-10' onClick={() => setEditMode(!editMode)}>
          <Image
            src="/assets/icons/edit.svg"
            width={20}
            height={20}
            alt="LED Strip"
            className="my-1"
          />
          
        </button>
      </div>
      <div className="w-50 py-5 flex flex-row flex-wrap gap-4">
            <SkeletonSceneCard />
            <SkeletonSceneCard />
            <SkeletonSceneCard />
        </div>
    </div>
)

  return (
    <div className='text-slate-100'>
      <h2 className=" font-semibold text-3xl">Scenes</h2>
      <div className='flex justify-between'>
        <p className="text-slate-500">Your saved scenes</p>
        <button className='bg-zinc-800/50 p-1 px-5 rounded-md hover:bg-violet-600 z-10 w-16' onClick={() => setEditMode(!editMode)}>
          <Image
            src="/assets/icons/edit.svg"
            width={20}
            height={20}
            alt="LED Strip"
            className="my-1"
          />
          
        </button>
      </div>
      <div className="w-50 py-5 flex flex-row flex-wrap gap-4">
        <SceneForm swrMutate={mutate}/>
        { data.scenes.map((scene: IScene, index: number) => (
          <SceneCard index={index+1} scene={scene} editMode={editMode} swrMutate={mutate}/>
        ))
        }
      </div>
      <div className="w-50 h-60 py-10 flex flex-row flex-wrap gap-4">
      </div>
    </div>
  )
}

export default Scenes;