'use client';
import React from 'react';
import Link from 'next/link';

const ProductList = ({ productData }: {
    productData: any
}) => {
    if (!productData) {
        return;
    }
    const { data } = productData;
    return (
        data && data.map((item: any) => {
            return (
                <Link href={`/room/${item.propertyId}/propertyInfo`}>
                    <div className="product-card mb-3 flex flex-col">
                        <img className="aspect-square object-cover rounded-lg" src={item.images[0]} />
                        <span className="font-medium line-clamp-2">{item.location.raw.display_name}</span>
                        <span className="text-muted-foreground">208 kilometers</span>
                        <span className="mb-1">31 Mar-5 Apr</span>
                        <span className="font-medium">{item.priceInfo.currencySymbol}{item.priceInfo.price} <span className="font-normal">night</span></span>
                    </div>
                </Link>

            )
        })
    )
}

export default ProductList