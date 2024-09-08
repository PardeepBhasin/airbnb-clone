'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import uniqid from 'uniqid';
import useStore from "../lib/useStore";

const PageComponent = () => {
    const router = useRouter();
    const [uniqId, setUniqId] = useState<any>();
    const addProperty = useStore((state: any) => state.addProperty);
    useEffect(() => {
        const id = uniqid();
        setUniqId(id);
        addProperty({
            propertyId: id
        })
    }, [])
    return (
        <>
            <div className="flex flex-col md:flex-row max-w-screen-2xl items-center h-[calc(100vh-160px)] overflow-auto m-auto mb-[-80px] gap-4 p-4">
                <div className="flex text-5xl font-bold">
                    It’s easy to get started on Airbnb
                </div>
                <div className="flex flex-col">
                    <div className="flex max-w-screen-md gap-6 h-32 mb-4">
                        <div className="text-2xl font-bold">1</div>
                        <div className="flex flex-col gap-3">
                            <div className="text-2xl font-bold">
                                Tell us about your place
                            </div>
                            <div className="text-2xl text-muted-foreground">
                                Share some basic info, such as where it is and how many guests can stay.
                            </div>
                        </div>
                    </div>
                    <div className="flex max-w-screen-md gap-6 h-32 mb-4">
                        <div className="text-2xl font-bold">2</div>
                        <div className="flex flex-col gap-3">
                            <div className="text-2xl font-bold">
                                Make it stand out
                            </div>
                            <div className="text-2xl text-muted-foreground">
                                Add 5 or more photos plus a title and description – we’ll help you out.
                            </div>
                        </div>
                    </div>
                    <div className="flex max-w-screen-md gap-6 h-32 mb-4">
                        <div className="text-2xl font-bold">3</div>
                        <div className="flex flex-col gap-3">
                            <div className="text-2xl font-bold">
                                Finish up and publish
                            </div>
                            <div className="text-2xl text-muted-foreground">
                                Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button onClick={() => router.push(`/become-a-host/${uniqId}/structure`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 float-right font-bold text-white rounded-xl">Get started</button>
            </div>
        </>
    )
}

export default PageComponent;