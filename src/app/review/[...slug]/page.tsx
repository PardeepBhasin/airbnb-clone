'use client';

import { useState } from 'react';
import { Star } from "lucide-react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { saveRating } from '@/app/actions/action';
import {useRouter} from 'next/navigation'

type Input = {
    description: string
}
const PageComponent = ({ params }: any) => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<Input>();
    const router = useRouter();
    const [ratings, setRating] = useState<number>(0);
    const onSubmit: SubmitHandler<Input> = async (data) => {
        console.log(data);
        await saveRating({
            ratings,
            description: data.description,
            propertyId: params.slug[0]
        })
        router.push(`/room/${params.slug[0]}/propertyInfo`);
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="font-bold text-2xl">Create Review</div>
            <hr />
            <div className="font-bold text-xl">Overall rating</div>
            <div className="flex gap-1">
                {
                    [...Array(5)].map((star, index) => {
                        return <Star onClick={() => setRating(index + 1)} className={`${index < ratings && 'fill-black'} cursor-pointer`} />
                    })
                }
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <label>Add a written review</label>
                    <input className="w-full border-solid border-2 border-black p-3"  {...register('description', { required: true })} />
                    {errors.description && <span className="text-red-600">This field is required</span>}
                    <input className="bg-pink-500 text-white w-full p-3 cursor-pointer" type='submit' />
                </div>
            </form>
            <hr />
        </div>
    )
}

export default PageComponent;