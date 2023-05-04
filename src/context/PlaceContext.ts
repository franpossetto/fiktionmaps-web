import React from 'react';
interface IFictionPlaceConext {
    place: any
}
const PlaceContext = React.createContext<IFictionPlaceConext | null>(null);
export default PlaceContext;