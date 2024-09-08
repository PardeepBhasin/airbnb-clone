'use server';

import prisma from '../lib/dbConnect';

export async function saveYourAirbnb(propertyData: any) {
    try {
        const propertyInfo = await prisma.property.create({
            data: propertyData
        })
        return {
            message: 'Successfully saved',
            propertyInfo
        }
    } catch (err: any) {
        return {
            message: "Failed to save property in data base",
            err
        }
    }
}

export async function saveYourPropertyPrice(propertyPriceData: any) {
    console.log("propertyPriceData+++++++++++++++++++++", propertyPriceData);
    try {
        const priceInfo = await prisma?.price.create({
            data: propertyPriceData
        })
        console.log("priceInfo+++++++++++++++++++++", priceInfo);
        return {
            message: 'Price Successfully saved',
            priceInfo
        }
    } catch (err: any) {
        return {
            message: "Failed to save property price in data base",
            err
        }
    }
}

export async function saveRoomInfo(propertyRoomData: any) {
    console.log("propertyRoomData+++++++++++++++++++++", propertyRoomData);
    try {
        const roomInfo = await prisma?.room.create({
            data: propertyRoomData
        })
        console.log("priceInfo+++++++++++++++++++++", roomInfo);
        return {
            message: 'Room info Successfully saved',
            roomInfo
        }
    } catch (err: any) {
        return {
            message: "Failed to save property room in data base",
            err
        }
    }
}

export async function fetchAirbnbData() {
    try {
        const data = await prisma.property.findMany();
        return {
            message: 'Successfully fetched',
            data
        }
    } catch (err: any) {
        return {
            message: "Failed to fetch data from data base",
            err
        }
    }
}

export async function getPropertyByPropertyId(propertyId: string) {
    try {
        const data = await prisma?.property.findUnique({
            where: {
                propertyId
            }
        })
        return {
            message: 'Fetch data successfully',
            data
        }
    } catch (error) {
        return {
            message: 'Failed to get property by property id',
            error
        }
    }
}

export async function saveRating(ratingInfo: any) {
    try {
        const data = await prisma?.rating.create({
            data: ratingInfo
        })
        console.log("Rating data++++++++++++++", data);
        return {
            message: 'Review Rating save successfully',
            data
        }
    } catch (error) {
        return {
            message: 'Failed to save rating',
            error
        }
    }
}

export async function getRatingsByPropertyId(propertyId: string) {
    try {
        const data = await prisma?.rating.findMany({
            where: {
                propertyId
            }
        })
        return {
            message: 'Fetch data successfully',
            data
        }
    } catch (error) {
        return {
            message: 'Failed to get ratings by property id',
            error
        }
    }
}
