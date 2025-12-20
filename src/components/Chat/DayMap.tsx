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

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 16px;
`;

const MapContainer = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 2px solid ${props => props.isActive ? 'var(--color-tumakr-maroon)' : '#e5e7eb'};
  transition: border-color 0.2s ease;
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const MapOverlayText = styled.span`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
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
  const [isMapActive, setIsMapActive] = useState(false);

  if (!locations || locations.length === 0) {
    return null;
  }

  const handleActivateMap = () => {
    setIsMapActive(true);
  };

  const handleDeactivateMap = () => {
    setIsMapActive(false);
    setSelectedMarker(null);
  };

  return (
    <MapWrapper>
      <MapContainer isActive={isMapActive} key={`map-container-${day}`}>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} key={`api-provider-${day}`}>
          <Map
            key={`map-${day}-${center.lat}-${center.lng}`}
            defaultCenter={center}
            defaultZoom={13}
            mapId={`day-${day}-map`}
            gestureHandling={isMapActive ? "greedy" : "none"}
            disableDefaultUI={!isMapActive}
            zoomControl={isMapActive}
            scrollwheel={isMapActive}
          >
            <MapBoundsFitter locations={locations} />
            {locations.map((location, index) => (
              <Marker
                key={`${location.itemId}-${index}`}
                position={{ lat: location.lat, lng: location.lng }}
                title={location.name}
                onClick={() => isMapActive && setSelectedMarker(location)}
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

      {!isMapActive && (
        <MapOverlay onClick={handleActivateMap}>
          <MapOverlayText>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Click to interact with map
          </MapOverlayText>
        </MapOverlay>
      )}

      {isMapActive && (
        <CloseMapButton onClick={handleDeactivateMap}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Lock map
        </CloseMapButton>
      )}
    </MapWrapper>
  );
};

const CloseMapButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: #f3f4f6;
  }
`;

export default DayMap;
