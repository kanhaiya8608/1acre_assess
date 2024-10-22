'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

type Property = {
  id: number;
  lat: string;
  long: string;
  total_land_size_in_acres: {
    acres: number;
    guntas: number;
  };
  price_per_acre_crore: {
    crore: number;
    lakh: number;
  };
  division_slugs: {
    state: string;
    district: string;
    mandal: string;
    village: string | null;
  };
};

type GoogleMapComponentProps = {
  properties: Property[];
};

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

// Memoized map options to avoid re-renders
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const mapCenter = useMemo(() => ({
    lat: parseFloat(properties[0]?.lat || '17.385044'),
    lng: parseFloat(properties[0]?.long || '78.486671'),
  }), [properties]);

  const handleMarkerClick = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCoDOQyMRswFRDR4wTm8cID877oRCuemYA">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={mapCenter} 
        options={mapOptions}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{ lat: parseFloat(property.lat), lng: parseFloat(property.long) }}
            onClick={() => handleMarkerClick(property)} 
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedProperty.lat),
              lng: parseFloat(selectedProperty.long),
            }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className='space-y-2'>
              <h4 className='text-lg font-bold capitalize'>{selectedProperty.division_slugs.village || 'Unknown Village'}</h4>
              <p>
                <span className='font-bold'>Acres:</span> {selectedProperty.total_land_size_in_acres.acres}
              </p>
              <p>
                <span className='font-bold'>Price (per acre):</span> ₹{selectedProperty.price_per_acre_crore.lakh} Lakh
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
