'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import uniqid from 'uniqid';
import useStore from '@/app/lib/useStore';

const PageComponent = () => {
    const router = useRouter();
    const uniqId = uniqid();
    const [guests, setGuests] = useState<number>(0);
    const [bedrooms, setBedrooms] = useState<number>(0);
    const [beds, setBeds] = useState<number>(0);
    const [bathrooms, setBathrooms] = useState<number>(0);
    const addProperty = useStore((state: any) => state.addProperty);
    const property = useStore((state: any) => state.property);
    useEffect(() => {
        addProperty({
            guests
        })
    }, [guests]);
    useEffect(() => {
        addProperty({
            bedrooms
        })
    }, [bedrooms]);
    useEffect(() => {
        addProperty({
            beds
        })
    }, [beds]);
    useEffect(() => {
        addProperty({
            bathrooms
        })
    }, [bathrooms]);
    return (
        <>
            <div className='flex flex-col gap-6 justify-center w-1/3 m-auto'>
                <div className='text-2xl font-bold'>Share some basics about your place</div>
                <div className='text-muted-foreground'>You'll add more details later, such as bed types.</div>
                <div className='flex flex-col'>
                    <div className='flex justify-between border-solid border-b-[1px] pt-4 pb-4'>
                        <div>Guests</div>
                        <div className='flex gap-4 items-center'>
                            <div onClick={() => setGuests(guests - 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full cursor-pointer'>-</div>
                            <div>{guests}</div>
                            <div onClick={() => setGuests(guests + 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full cursor-pointer'>+</div>
                        </div>
                    </div>
                    <div className='flex justify-between border-solid border-b-[1px] pt-4 pb-4'>
                        <div>Bedrooms</div>
                        <div className='flex gap-4 items-center'>
                            <div onClick={() => setBedrooms(bedrooms - 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full cursor-pointer'>-</div>
                            <div>{bedrooms}</div>
                            <div onClick={() => setBedrooms(bedrooms + 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full cursor-pointer'>+</div>
                        </div>
                    </div>
                    <div className='flex justify-between border-solid border-b-[1px] pt-4 pb-4'>
                        <div>Beds</div>
                        <div className='flex gap-4 items-center'>
                            <div onClick={() => setBeds(beds - 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full cursor-pointer'>-</div>
                            <div>{beds}</div>
                            <div onClick={() => setBeds(beds + 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full cursor-pointer'>+</div>
                        </div>
                    </div>
                    <div className='flex justify-between border-solid border-b-[1px] pt-4 pb-4'>
                        <div>Bathrooms</div>
                        <div className='flex gap-4'>
                            <div onClick={() => setBathrooms(bathrooms - 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full'>-</div>
                            <div>{bathrooms}</div>
                            <div onClick={() => setBathrooms(bathrooms + 1)} className='h-8 w-8 border-solid border-[1px] text-center rounded-full'>+</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={() => router.push(`/become-a-host/${property.propertyId}/photoes`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Next</button>
            </div>
        </>
    )
}

export default PageComponent;