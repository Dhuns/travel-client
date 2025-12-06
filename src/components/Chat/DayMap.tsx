import styled from "@emotion/styled";
import { APIProvider, InfoWindow, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

interface Location {
  itemId: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  price?: number;
  type?: string;
}

interface DayMapProps {
  day: number;
  locations: Location[];
  center: {
    lat: number;
    lng: number;
  };
}

const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 12px;
  margin-bottom: 16px;
`;

const DayTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 16px 0 4px 0;
`;

const LocationCount = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 400;
  margin-left: 6px;
`;

const LocationList = styled.div`
  margin-top: 12px;
  margin-bottom: 8px;
`;

const LocationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  color: #374151;
`;

const LocationNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: var(--color-tumakr-maroon);
  color: white;
  font-size: 11px;
  font-weight: 600;
  margin-right: 10px;
  flex-shrink: 0;
`;

const LocationName = styled.span`
  flex: 1;
`;

const InfoWindowContent = styled.div`
  padding: 4px;
  max-width: 200px;
`;

const InfoWindowTitle = styled.h6`
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #111827;
`;

const InfoWindowText = styled.p`
  font-size: 12px;
  margin: 0;
  color: #6b7280;
`;

// Helper component to fit bounds after map loads
const MapBoundsFitter: React.FC<{ locations: Location[] }> = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !locations || locations.length === 0 || typeof window === "undefined")
      return;

    try {
      // @ts-ignore - google.maps is loaded via APIProvider
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });

      map.fitBounds(bounds);

      // Add some padding to the bounds
      const padding = { top: 50, right: 50, bottom: 50, left: 50 };
      setTimeout(() => {
        map.fitBounds(bounds, padding);
      }, 100);
    } catch (error) {
      console.error("[MapBoundsFitter] Error fitting bounds:", error);
    }
  }, [map, locations]);

  return null;
};

const DayMap: React.FC<DayMapProps> = ({ day, locations, center }) => {
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);

  if (!locations || locations.length === 0) {
    return null;
  }

  return (
    <div>
      <MapContainer key={`map-container-${day}`}>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} key={`api-provider-${day}`}>
          <Map
            key={`map-${day}-${center.lat}-${center.lng}`}
            defaultCenter={center}
            defaultZoom={13}
            mapId={`day-${day}-map`}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            <MapBoundsFitter locations={locations} />
            {locations.map((location, index) => (
              <Marker
                key={`${location.itemId}-${index}`}
                position={{ lat: location.lat, lng: location.lng }}
                title={location.name}
                onClick={() => setSelectedMarker(location)}
                label={{
                  text: `${index + 1}`,
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <InfoWindowContent>
                  <InfoWindowTitle>{selectedMarker.name}</InfoWindowTitle>
                  {selectedMarker.type && (
                    <InfoWindowText>Type: {selectedMarker.type}</InfoWindowText>
                  )}
                  {selectedMarker.price && selectedMarker.price > 0 && (
                    <InfoWindowText>
                      ₩{selectedMarker.price.toLocaleString()}
                    </InfoWindowText>
                  )}
                </InfoWindowContent>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </MapContainer>
    </div>
  );
};

export default DayMap;
