'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useStore from '@/app/lib/useStore';
const PageComponent = () => {
    const router = useRouter();
    const [descr, setDescription] = useState<string>();
    const addProperty = useStore((state: any) => state.addProperty);
    const property = useStore((state: any) => state.property);
    useEffect(() => {
        if (descr) {
            addProperty({
                description: descr
            })
        }
    }, [descr])
    return (
        <>
            <div className='flex flex-col gap-6 justify-center w-1/3 m-auto'>
                <div className='text-2xl font-bold'>Create your description</div>
                <div className='text-muted-foreground'>Share what makes your place special.</div>
                <input placeholder='The whole group will enjoy easy access to everything from this centrally located place.' className='p-3 border-solid border-[1px] border-black mt-3' type='text' name='descr' value={descr} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={() => router.push(`/become-a-host/${property.propertyId}/price`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Next</button>
            </div>
        </>
    )
}

export default PageComponent;