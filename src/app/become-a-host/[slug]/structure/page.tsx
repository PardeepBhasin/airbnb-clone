'use client';
import React, { useState, useEffect } from 'react'
import { categoryData } from '@/app/lib/categories';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useStore from '@/app/lib/useStore';

const page = () => {
    const { categoryBar: { categories } } = categoryData;
    const [selectedCategory, setCategory] = useState<string>();
    const router = useRouter();
    const addProperty = useStore((state: any) => state.addProperty);
    const property = useStore((state: any) => state.property);
    console.log("property++++++++++", property);
    useEffect(() => {
        addProperty({
            category: selectedCategory
        })
    }, [selectedCategory])
    return (
        <>
            <div className='flex flex-col gap-6 justify-center m-auto max-w-[656px] w-full pl-4 pr-4'>
                <div className='text-2xl font-bold'>Which of these best describes your place?</div>
                <div className='flex flex-wrap gap-4'>
                    {
                        categories && categories.map((item) => {
                            return (
                                <div onClick={() => setCategory(item.title)} key={Math.random()} className={`${selectedCategory === item.title && 'border-black'} flex flex-col p-4 text-muted-foreground border-solid border-[1px] rounded-xl w-full md:w-[calc(50%-16px)] lg:w-[calc(33%-32px)] gap-2 hover:border-black cursor-pointer`}>
                                    <Image width={30} height={30} src={item.imageUrl} alt='category-image' />
                                    <span className="text-black">{item.title}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={() => router.push(`/become-a-host/${property.propertyId}/privacy-type`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Next</button>
            </div>
        </>
    )
}

export default page