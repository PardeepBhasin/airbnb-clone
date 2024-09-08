'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useStore from '@/app/lib/useStore';
const PageComponent = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>();
    const addProperty = useStore((state: any) => state.addProperty);
    const property = useStore((state: any) => state.property);
    useEffect(() => {
        if (title) {
            addProperty({
                title
            })
        }
    }, [title])
    return (
        <>
            <div className='flex flex-col gap-6 justify-center w-1/3 m-auto'>
                <div className='text-2xl font-bold'>Now, let's give your property a title</div>
                <div className='text-muted-foreground'>Short titles work best. Have fun with it – you can always change it later.</div>
                <input className='p-3 border-solid border-[1px] border-black mt-3' type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={() => router.push(`/become-a-host/${property.propertyId}/description`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Next</button>
            </div>
        </>
    )
}

export default PageComponent;