'use client';
import { useEffect } from 'react';
import SvgComponent from "./AppLogo";
import { Globe, Search } from 'lucide-react';
import Login from './Login';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = ({ categories }: any) => {
    const router = useRouter();
    useEffect(() => {
        const element = document.querySelector('.parent-container');
        function handleScroll() {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 3) {
                element?.classList.add('show-item');
            } else {
                element?.classList.remove('show-item');
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return (
        <>
            <div className="main-header pl-4 pr-4">
                <div className="flex h-20 items-center justify-between">
                    <SvgComponent />
                    <div className="flex gap-4 items-center">
                        <div className='cursor-pointer z-[2]' onClick={() => router.push('/become-a-host')}>Airbnb your home</div>
                        <div><Globe /></div>
                        <Login />
                    </div>
                </div>
                <div className="primary-header hidden z-0 md:flex flex-col w-full justify-center gap-5 items-center md:-translate-y-25px lg:-translate-y-50px">
                    <div className="flex gap-6 justify-center">
                        <div className="font-medium">Stays</div>
                        <div className='text-muted-foreground'>Experiences</div>
                        <div className='text-muted-foreground'>Online Experiences</div>
                    </div>
                    <div className="flex w-full max-w-[850px] rounded-full border-[1px] border-solid pb-2 pl-6 pt-2 shadow-lg">
                        <div className='flex-1 border-solid border-r-2'>
                            <div className="font-medium text-sm">Where</div>
                            <div className='text-muted-foreground'>Search destinations</div>
                        </div>
                        <div className='pl-4 pr-4 border-solid border-r-2'>
                            <div className="font-medium text-sm">Check in</div>
                            <div className='text-muted-foreground'>Add dates</div>
                        </div>
                        <div className='pl-4 pr-4 border-solid border-r-2'>
                            <div className="font-medium text-sm">Check out</div>
                            <div className='text-muted-foreground'>Add dates</div>
                        </div>
                        <div className='flex-1 pl-4'>
                            <div className="font-medium text-sm">Who</div>
                            <div className='text-muted-foreground'>Add guests</div>
                        </div>
                        <div className="mr-3 h-12 w-12 rounded-full bg-red-500 flex justify-center items-center text-white">
                            <Search />
                        </div>
                    </div>
                </div>
                <div className="secondary-header hidden md:flex w-full justify-center">
                    <div className="flex w-fit justify-between gap-10 rounded-full border-[1px] border-solid pb-2 pl-6 pt-2 hover:shadow-lg">
                        <div className="font-medium">Anywhere</div>
                        <div className="font-medium">Any week</div>
                        <div className="font-medium">Add guests</div>
                        <div className="mr-3 aspect-square h-9 w-9 rounded-full bg-red-500 flex justify-center items-center text-white">
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-header h-20 pl-20 pr-20 border-solid border-t-[1px]">
                <Carousel className="w-full">
                    <CarouselContent className="-ml-1">
                        {Array.from(categories).map((item: any, index) => (
                            <CarouselItem key={index} className="pl-1 basis-auto">
                                <div className="p-1">
                                    <Card className='shadow-none border-0 bg-transparent'>
                                        <Link href={{
                                            href: '/', query: {
                                                filter: item.title
                                            }
                                        }}>
                                            <CardContent className="flex flex-col items-center justify-center p-4 text-muted-foreground hover:underline">
                                                <Image width={30} height={30} src={item.imageUrl} alt='category-image' />
                                                <span className="text-sm font-normal">{item.title}</span>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>

    )
}

export default Header;