'use client';
import { getPropertyByPropertyId, getRatingsByPropertyId } from '@/app/actions/action';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const PageComponent = ({ params }: any) => {
    const [images, setImages] = useState<string[]>();
    const [ratings, setRatings] = useState<[]>();
    const { data: session } = useSession();
    console.log("Session+++++++", session);
    const [averageRating, setAverageRating] = useState<any>();
    useEffect(() => {
        const fetchPropertyInfoById = async () => {
            const { data } = await getPropertyByPropertyId(params.slug[0]);
            setImages(data?.images);
        }
        const fetchRatingsById = async () => {
            const { data } = await getRatingsByPropertyId(params.slug[0]);
            const ratings = data?.reduce((acc, item) => item.ratings + acc, 0);
            if (ratings && data) {
                const value = ratings / data.length;
                const singleDecimalPlace = Math.round(value * 10) / 10;
                console.log("Value++++++++", singleDecimalPlace);
                setAverageRating(singleDecimalPlace);
                setRatings(data as any);
            }
        }
        fetchPropertyInfoById();
        fetchRatingsById();
    }, [])
    return (
        <div className="flex flex-col justify-center m-auto gap-6">
            <div className='flex justify-between'>
                {averageRating ? <div className='font-bold'>{averageRating} out of 5</div> : <div className='font-bold'>No Rating</div>}
                <div className='flex gap-1'>
                    {
                        [...Array(5)].map((_, index) => {
                            const starIndex = index + 1;
                            if (starIndex <= averageRating) {
                                return (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='size-6' key={index}>
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                )
                            } else if (starIndex <= Math.ceil(averageRating) && averageRating % 0 !== 0) {
                                return (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half size-6" viewBox="0 0 16 16" key={index}>
                                        <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                                    </svg>
                                )
                            } else {
                                return (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star size-6" viewBox="0 0 16 16" key={index}>
                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                    </svg>

                                )
                            }
                        })
                    }
                </div>
                <Link className='underline font-bold' href={`/review/${params.slug[0]}/createReview`}>
                    Write a review
                </Link>
            </div>
            {
                images && (
                    <div className='grid lg:grid-cols-2 gap-2'>
                        <div className='grid'>
                            <img className='h-full w-full' src={images[0]} />
                        </div>
                        <div className='grid grid-cols-2 h-full gap-2'>
                            {
                                images.slice(1).map((image) => {
                                    return <img  className="h-full" src={image} />
                                })
                            }
                        </div>
                    </div>
                )
            }
            <div className='grid grid-cols-2 gap-2'>
                {
                    ratings && ratings.map((rating: any, index) => {
                        return (
                            <div key={index}>
                                <div className='font-bold'>TestUser</div>
                                <div className='text-muted-foreground'>Gurgaon, India</div>
                                <div>2 days ago</div>
                                <div>
                                    {rating.description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PageComponent;