'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import useStore from '@/app/lib/useStore';

const PageContent = () => {
    const router = useRouter();
    const [selectedPrivacyType, setPrivacyType] = useState<string>('entirePlace');
    const addProperty = useStore((state: any) => state.addProperty);
    const property = useStore((state: any) => state.property);
    useEffect(() => {
        if (selectedPrivacyType) {
            addProperty({
                privacyType: selectedPrivacyType
            })
        }
    }, [selectedPrivacyType])
    return (
        <>
            <div className='flex flex-col gap-6 justify-center w-1/3 m-auto'>
                <div className='text-2xl font-bold'>What type of place will guests have?</div>
                <div onClick={() => setPrivacyType('entirePlace')} className={`${selectedPrivacyType === 'entirePlace' && 'border-black'} p-5 border-solid rounded-xl border-[1px] hover:border-black`}>
                    <div className="font-bold">An entire place</div>
                    <div className="text-muted-foreground">Guests have the whole place to themseleves.</div>
                </div>
                <div onClick={() => setPrivacyType('room')} className={`${selectedPrivacyType === 'room' && 'border-black'} p-5 border-solid rounded-xl border-[1px] hover:border-black`}>
                    <div className="font-bold">A room</div>
                    <div className="text-muted-foreground">Guests have their own room in a home, plus access to shared spaces.</div>
                </div>
                <div onClick={() => setPrivacyType('sharedRoom')} className={`${selectedPrivacyType === 'sharedRoom' && 'border-black'} p-5 border-solid rounded-xl border-[1px] hover:border-black`}>
                    <div className="font-bold">An shared room</div>
                    <div className="text-muted-foreground">Guests sleep in a room or a common area that may be shared with you or others.</div>
                </div>
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={() => router.push(`/become-a-host/${property.propertyId}/location`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Next</button>
            </div>
        </>
    )
}

export default PageContent;