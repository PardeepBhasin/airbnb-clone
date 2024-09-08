'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCountryCode, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list';
import getSymbolFromCurrency from 'currency-symbol-map'
import useStore from '@/app/lib/useStore';
import { saveRoomInfo, saveYourAirbnb, saveYourPropertyPrice } from '@/app/actions/action';
import { useSession } from 'next-auth/react';
const PageComponent = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [price, setPrice] = useState<string>();
    const property = useStore((state: any) => state.property);
    const displayName = property.location.raw.display_name.split(',');
    const country = displayName[displayName.length - 1].trim();
    const countryCode = getCountryCode(country);
    const countryData = getCountryData(countryCode as any);
    const currencySymbol = getSymbolFromCurrency(countryData.currency[0]);
    const addProperty = useStore((state: any) => state.addProperty);
    useEffect(() => {
        if (price) {
            addProperty({
                priceInfo: {
                    price,
                    currencySymbol
                }
            })
        }
    }, [price]);

    const saveYourHome = async () => {
        if (session && session.user) {
            await saveYourAirbnb({
                ...property,
                priceInfo: {
                    price,
                    currencySymbol
                },
                email: session.user.email
            });

            await saveYourPropertyPrice({
                price,
                currencySymbol,
                propertyId: property.propertyId
            })
            const { guests, bedrooms, beds, bathrooms } = property
            await saveRoomInfo({
                guests,
                bedrooms,
                beds,
                bathrooms,
                availableRooms: bedrooms,
                propertyId: property.propertyId
            })
            router.push('/');
        }
    }
    return (
        <>
            <div className='flex flex-col gap-6 justify-center w-1/3 m-auto'>
                <div className='text-2xl font-bold'>Now, set your price</div>
                <div className='text-muted-foreground'>You can change it anytime.</div>
                <div className='flex gap-2 items-baseline'>
                    <div className='text-5xl font-bold'>{currencySymbol}</div>
                    <input placeholder='Please set the price' className='mt-3 text-5xl font-bold focus-visible:outline-0' type='number' name='price' value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
            </div>
            <div className="flex fixed w-full border-solid border-t-4 bottom-0 p-4 bg-white">
                <button className='font-bold' onClick={() => router.back()}>Back</button>
                <button onClick={saveYourHome} className="p-3 bg-gradient-to-tr from-pink-600 via-pink-500 to-pink-400 font-bold text-white rounded-xl ml-auto">Save & Exit</button>
            </div>
        </>
    )
}

export default PageComponent;