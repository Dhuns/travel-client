import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import styled from '@emotion/styled';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';

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
	background-color: #651d2a;
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

const DayMap: React.FC<DayMapProps> = ({ day, locations, center }) => {
	const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);

	console.log(`[DayMap] Day ${day} - Center:`, center, 'Locations:', locations);

	if (!locations || locations.length === 0) {
		return null;
	}

	return (
		<div>
			<div style={{ padding: '10px', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px', marginBottom: '10px', fontSize: '12px' }}>
				<strong>DEBUG - Day {day} Map Center:</strong> lat={center.lat}, lng={center.lng}<br/>
				<strong>Location Count:</strong> {locations.length}<br/>
				{locations.map((loc, idx) => (
					<div key={idx}>
						#{idx + 1}: {loc.name} (lat={loc.lat}, lng={loc.lng})
					</div>
				))}
			</div>
			<MapContainer>
				<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
					<Map
						center={center}
						zoom={13}
						mapId={`day-${day}-map`}
						gestureHandling="greedy"
						disableDefaultUI={false}
					>
						{locations.map((location, index) => (
							<Marker
								key={`${location.itemId}-${index}`}
								position={{ lat: location.lat, lng: location.lng }}
								title={location.name}
								onClick={() => setSelectedMarker(location)}
								label={{
									text: `${index + 1}`,
									color: 'white',
									fontSize: '11px',
									fontWeight: 'bold',
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
										<InfoWindowText>₩{selectedMarker.price.toLocaleString()}</InfoWindowText>
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
