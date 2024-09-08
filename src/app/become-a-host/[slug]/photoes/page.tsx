'use client';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import useStore from '@/app/lib/useStore';


const PageComponent = () => {
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const router = useRouter();
    const addProperty = useStore((state: any) => state.addProperty);
    const property = useStore((state: any) => state.property);
    useEffect(() => {
        if (images) {
            const imageData = images.map((image: any) => {
                return image.data_url
            })
            addProperty({
                images: imageData
            })
        }
    }, [images])

    const onChange = (imageList: any, addUpdateIndex: number) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    return (
        <>
            <div className="flex justify-center max-w-xl m-auto">
                <div className="flex flex-col gap-5">
                    <div className="text-2xl font-bold">Add some photoes of your property</div>
                    <div className="text-muted-foreground">You'll need to add photoes of your property</div>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                        }) => (
                            <div className="flex flex-col gap-3">
                                {
                                    imageList.length === 0 ? (
                                        <div onClick={onImageUpload} className="flex justify-center items-center h-52 border-dashed border-2 cursor-pointer">
                                            Click or Drop here
                                        </div>
                                    ) : <>
                                        <div><img src={imageList[0]['data_url']} alt="primaryImage" /></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {
                                                imageList && imageList.length > 0 && imageList.slice(1).map((image, index) => (
                                                    <div key={index} className="w-full">
                                                        <img src={image['data_url']} alt="secondaryImages" />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        )}
                    </ImageUploading>
                </div>
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={() => router.push(`/become-a-host/${property.propertyId}/title`)} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Next</button>
            </div>
        </>
    )
}

export default PageComponent;