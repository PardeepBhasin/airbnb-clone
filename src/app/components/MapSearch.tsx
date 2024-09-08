'use client';
import { useEffect, useState } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import 'leaflet-geosearch/assets/css/leaflet.css';
import useStore from '../lib/useStore';
const Search = () => {
    const provider = new OpenStreetMapProvider();
    const [location, setLocation] = useState<any>();
    const addProperty = useStore((state: any) => state.addProperty)
    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar'
    });

    useEffect(() => {
        if (location) {
            addProperty({
                location
            })
        }
    }, location)

    const map = useMap();
    // @ts-ignore
    useEffect(() => {
        map.addControl(searchControl);
        map.on('geosearch/showlocation', (results: any) => {
            const { location } = results;
            setLocation(location);
        })
        return () => map.removeControl(searchControl);
    }, []);

    return null;
};

export default Search;