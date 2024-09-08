
'use client';

import { useRouter } from "next/navigation";
import 'leaflet/dist/leaflet.css';
import React from "react";
import dynamic from "next/dynamic";
import useStore from "@/app/lib/useStore";

const MapComponent = dynamic(() => import('@/app/components/Map'), { ssr: false })

const PageComponent = () => {
    const router = useRouter();
    const property = useStore((state: any) => state.property);
    return (
        <>
            <div className='flex flex-col gap-6 justify-center w-1/3 m-auto'>
                <div className='text-2xl font-bold'>Is the pin in the right spot?</div>
                <div className='text-muted-foreground'>Your address is only shared with guests after they've made a reservation.</div>
                <div><MapComponent /></div>
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={() => router.push(`/become-a-host/${property.propertyId}/floor-plan`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Next</button>
            </div>
        </>
    )
}

export default PageComponent;