/* eslint-disable @next/next/no-img-element */
import { useGetEstimateDetail } from "@shared/hooks/queries/estimate";
import {
  TIMELINE_JOIN_KEY,
  comma,
  getItemImg,
  safeJsonParse,
} from "@shared/utils/base";
import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as S from "./styled";
import { groupBy, isEmpty, isNil, keys } from "lodash-es";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import draftToHtml from "draftjs-to-html";
import {
  GoogleMap,
  GoogleMapApiLoader,
  InfoWindow,
  Marker,
  Polyline,
} from "react-google-map-wrapper";
import { PATHS } from "@shared/path";

interface IGroupByDays {
  [day: number]: {
    id: number;
    createdAt: string;
    updatedAt: string;
    price: number;
    days: number;
    sequence: number;
    quantity: number;
    estimateId: number;
    itemId: number;
    enableContent: boolean;
    item: {
      id: number;
      createdAt: string;
      updatedAt: string;
      type: string;
      nameKor: string;
      nameEng: string;
      price: number;
      address: string;
      addressEnglish: string;
      description: string;
      keyword: string;
      lat: string;
      lng: string;
      enable: boolean;
      pricePolicy: string;
      websiteLink: string;
      files: {
        id: number;
        createdAt: string;
        updatedAt: string;
        type: string;
        itemSrc: string;
        itemSize: string;
      }[];
    };
  }[];
}

const Container: FC = () => {
  const router = useRouter();
  const [memo, setMemo] = useState<any>("");
  const [zoom, setZoom] = useState<number>(11);
  const [activeWindowIds, setActiveWindowIds] = useState<{[key: number]: number}>({});
  const [dayDirections, setDayDirections] = useState<{[key: number]: any}>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { query, replace } = useRouter();

  const {
    data: estimateDetail,
    isLoading,
    error,
  } = useGetEstimateDetail(
    query?.hash?.toString()
      ? encodeURIComponent(query?.hash?.toString())
      : undefined
  );

  const { batchInfo, estimateDetails, estimateInfo } = estimateDetail || {};

  const [groupByDays, setGroupByDays] = useState<IGroupByDays>();
  const [timeline, setTimeline] = useState<string[]>([]);

  useEffect(() => {
    if (!error) {
      return;
    }
  }, [error]);

  useEffect(() => {
    if (!estimateDetails || isEmpty(estimateDetails)) {
      return;
    }

    const groupByDays = groupBy(estimateDetails, "days");
    const splitTimeline =
      estimateInfo?.timeline?.split(TIMELINE_JOIN_KEY) ?? [];

    setGroupByDays(groupByDays);
    setTimeline(splitTimeline);
  }, [estimateDetails, estimateInfo]);

  useEffect(() => {
    if (estimateInfo?.comment) {
      const parse = safeJsonParse(estimateInfo.comment);
      setMemo(draftToHtml(parse));
    }
  }, [estimateInfo?.comment]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 공유 기능
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 공통 서비스 항목 추출 (컨텐츠 타입)
  const getIncludedServices = () => {
    if (!estimateDetails || estimateDetails.length === 0) {
      return [];
    }

    // 컨텐츠 항목들만 필터링
    const contentItems = estimateDetails.filter((detail: any) => detail.item?.type === '컨텐츠');

    // 항목별로 그룹핑 (이름 기준)
    const groupedByName: Record<string, any[]> = {};
    contentItems.forEach((item: any) => {
      const key = item.item.nameEng || item.item.nameKor;
      if (!groupedByName[key]) {
        groupedByName[key] = [];
      }
      groupedByName[key].push(item);
    });

    // 각 항목의 통계 계산
    return Object.entries(groupedByName).map(([name, items]) => {
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
      const dayCount = items.length;
      const sampleItem = items[0].item;

      return {
        name,
        nameKor: sampleItem.nameKor,
        nameEng: sampleItem.nameEng,
        dayCount,
        totalPrice,
        item: sampleItem,
      };
    });
  };

  const includedServices = getIncludedServices();

  const getMarkersForDay = (dayEstimates: any[]) => {
    return dayEstimates
      .filter((o: any) => {
        if (o.item.type === "이동수단") return false;
        if (o.item.type === "컨텐츠") return false;
        if (!o.item.lat || !o.item.lng || o.item.lat === "0" || o.item.lng === "0") {
          return false;
        }
        return o.item.type === "여행지" || o.item.type === "숙박";
      })
      .map((o: any, idx: number) => {
        const src = o.item?.files?.find(
          (img: any) => img.type === "썸네일"
        )?.itemSrc;
        return {
          id: idx + 1,
          lat: Number(o.item.lng),
          lng: Number(o.item.lat),
          name: o.item.nameEng,
          nameKor: o.item.nameKor,
          address: o.item.addressEnglish,
          src,
        };
      });
  };

  const calculateDirections = useCallback(async (markers: any[], day: number) => {
    if (dayDirections[day] !== undefined) {
      return;
    }

    if (markers.length < 2 || typeof window === "undefined" || !window.google) {
      setDayDirections(prev => ({ ...prev, [day]: null }));
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    if (markers.length > 10) {
      setDayDirections(prev => ({ ...prev, [day]: null }));
      return;
    }

    const maxWaypoints = 8;
    const middleMarkers = markers.slice(1, -1);
    let sampledWaypoints = middleMarkers;

    if (middleMarkers.length > maxWaypoints) {
      const step = Math.floor(middleMarkers.length / maxWaypoints);
      sampledWaypoints = [];
      for (let i = 0; i < maxWaypoints; i++) {
        const idx = Math.min(i * step, middleMarkers.length - 1);
        sampledWaypoints.push(middleMarkers[idx]);
      }
    }

    const origin = { lat: markers[0].lat, lng: markers[0].lng };
    const destination = {
      lat: markers[markers.length - 1].lat,
      lng: markers[markers.length - 1].lng,
    };

    const isSameLocation =
      Math.abs(origin.lat - destination.lat) < 0.0001 &&
      Math.abs(origin.lng - destination.lng) < 0.0001;

    if (isSameLocation && sampledWaypoints.length === 0) {
      setDayDirections(prev => ({ ...prev, [day]: null }));
      return;
    }

    const waypoints = sampledWaypoints.map((m) => ({
      location: { lat: m.lat, lng: m.lng },
      stopover: true,
    }));

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
        region: 'KR',
        language: 'en',
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDayDirections(prev => ({ ...prev, [day]: result }));
        } else {
          setDayDirections(prev => ({ ...prev, [day]: null }));
        }
      }
    );
  }, [dayDirections]);

  // 여행지 클릭 핸들러 - websiteLink 우선, 없으면 Google Places 검색
  const handlePlaceClick = (item: any) => {
    if (item?.websiteLink && !isNil(item.websiteLink) && item.websiteLink !== "") {
      window.open(item.websiteLink, "_blank");
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item?.nameEng || '')}`;
      window.open(url, "_blank");
    }
  };

  const totalPeople =
    Number(batchInfo?.adultsCount ?? 0) +
    Number(batchInfo?.childrenCount ?? 0) +
    Number(batchInfo?.infantsCount ?? 0);

  const transType = (type: string) => {
    switch (type) {
      case "여행지":
        return "Place";
      case "이동수단":
        return "Transportation";
      case "컨텐츠":
        return "Contents";
      case "숙박":
        return "Accommodation";
      default:
        return "";
    }
  };

  const linkify = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        const href = part.startsWith("www.") ? `https://${part}` : part;
        return (
          <a href={href} key={index} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const linkifyStr = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s<>\)]+|www\.[^\s<>\)]+)/g;

    return text
      .split(urlRegex)
      .map((part) => {
        if (part.match(urlRegex)) {
          const href = part.startsWith("www.") ? `https://${part}` : part;
          return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #667eea; text-decoration: none;">${part}</a>`;
        }
        return part;
      })
      .join("");
  };

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <S.LoadingSpinner>Loading quotation...</S.LoadingSpinner>
      </S.LoadingContainer>
    );
  }

  if (error || !estimateDetail) {
    return (
      <S.ErrorContainer>
        <S.ErrorCard>
          <S.ErrorIcon>❌</S.ErrorIcon>
          <S.ErrorText>Quotation not found or has been deleted.</S.ErrorText>
          <S.ActionButton onClick={() => router.push(PATHS.HOME)}>
            Go to Home
          </S.ActionButton>
        </S.ErrorCard>
      </S.ErrorContainer>
    );
  }

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.Logo onClick={() => router.push(PATHS.HOME)}>✈️ DIY Travel</S.Logo>
        <S.HeaderActions>
          <S.ActionButton onClick={handleCopyLink}>
            {copiedLink ? '✓ Copied!' : '🔗 Share'}
          </S.ActionButton>
          <S.ActionButton onClick={() => window.print()}>
            🖨️ Print
          </S.ActionButton>
          <S.ActionButton onClick={() => router.push(PATHS.HOME)}>
            🏠 Home
          </S.ActionButton>
        </S.HeaderActions>
      </S.Header>

      <S.Content>
        {/* 기본 정보 카드 */}
        <S.InfoCard>
          <S.InfoHeader>
            <S.QuotationTitle>{batchInfo?.title ?? "Travel Quotation"}</S.QuotationTitle>
            <S.QuotationSubtitle>
              {dayjs(estimateInfo?.createdAt).format("MMMM DD, YYYY")}
            </S.QuotationSubtitle>
          </S.InfoHeader>

          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>Customer</S.InfoLabel>
              <S.InfoValue>{batchInfo?.recipient ?? "-"}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>Travel Date</S.InfoLabel>
              <S.InfoValue>
                {dayjs(batchInfo?.startDate).format("MMM DD, YYYY")} ~{" "}
                {dayjs(batchInfo?.endDate).format("MMM DD, YYYY")}
              </S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>Headcount</S.InfoLabel>
              <S.InfoValue>
                Adults: {batchInfo?.adultsCount ?? 0} / Children:{" "}
                {batchInfo?.childrenCount ?? 0} / FOC: {batchInfo?.infantsCount ?? 0}
              </S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>Total Participants</S.InfoLabel>
              <S.InfoValue>{totalPeople} People</S.InfoValue>
            </S.InfoItem>
          </S.InfoGrid>

          {!batchInfo?.hidePrice && (
            <S.PriceHighlight>
              <S.PriceLabel>Total Price for {totalPeople} people</S.PriceLabel>
              <S.PriceValue>${comma(batchInfo?.autoSumAmount)} USD</S.PriceValue>
            </S.PriceHighlight>
          )}

          {/* 담당자 정보 */}
          <S.AgentInfo>
            <S.AgentTitle>{batchInfo?.quotation || "Travel Agency"}</S.AgentTitle>
            <S.AgentGrid>
              <S.InfoItem>
                <S.InfoLabel>Prepared by</S.InfoLabel>
                <S.InfoValue>{batchInfo?.preparedBy ?? "-"}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Email</S.InfoLabel>
                <S.InfoValue>{batchInfo?.email ?? "-"}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Office Hours</S.InfoLabel>
                <S.InfoValue>{batchInfo?.officeHours ?? "-"}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Office Number</S.InfoLabel>
                <S.InfoValue>{batchInfo?.officeNumber ?? "-"}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Emergency Number</S.InfoLabel>
                <S.InfoValue>{batchInfo?.emergencyNumber ?? "-"}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Address</S.InfoLabel>
                <S.InfoValue>{batchInfo?.address ?? "-"}</S.InfoValue>
              </S.InfoItem>
            </S.AgentGrid>
          </S.AgentInfo>
        </S.InfoCard>

        {/* 공통 서비스 섹션 */}
        {includedServices.length > 0 && (
          <S.InfoCard style={{ marginTop: 24 }}>
            <S.SectionTitle>📋 Included Services</S.SectionTitle>
            <S.ItemsGrid>
              {includedServices.map((service, idx) => {
                const getThumbnailImg = service.item?.files?.find(
                  (img: any) => img.type === "썸네일"
                )?.itemSrc;

                return (
                  <S.ItemCard key={idx} onClick={() => handlePlaceClick(service.item)}>
                    <S.ItemThumbnail $src={getItemImg(getThumbnailImg)}>
                      <S.ItemType>Contents</S.ItemType>
                    </S.ItemThumbnail>
                    <S.ItemInfo>
                      <S.ItemName>
                        {service.nameEng} <span>{service.nameKor}</span>
                      </S.ItemName>
                      <S.ItemAddress>
                        Included for {service.dayCount} {service.dayCount === 1 ? 'day' : 'days'}
                      </S.ItemAddress>
                      {!batchInfo?.hidePrice && (
                        <S.ItemPrice>
                          ${comma(service.totalPrice)} USD
                          <span> / Total</span>
                        </S.ItemPrice>
                      )}
                    </S.ItemInfo>
                  </S.ItemCard>
                );
              })}
            </S.ItemsGrid>
          </S.InfoCard>
        )}

        {/* 일정 섹션 */}
        <S.ItinerarySection>
          <S.SectionTitle>Travel Itinerary</S.SectionTitle>

          {keys(groupByDays).map((day) => {
            const getTimeline = timeline?.[Number(day) - 1] ?? "";
            const dayMarkers = getMarkersForDay(groupByDays?.[Number(day)] ?? []);

            return (
              <S.DayCard key={day}>
                <S.DayHeader>
                  <S.DayTitle>Day {day}</S.DayTitle>
                  <S.DayDate>
                    {dayjs(batchInfo?.startDate)
                      .add(Number(day) - 1, "day")
                      .format("dddd, MMMM DD, YYYY")}
                  </S.DayDate>
                </S.DayHeader>

                <S.ItemsGrid>
                  {groupByDays?.[Number(day)]?.sort().map((estimate) => {
                    const {
                      item,
                      id,
                      enableContent,
                      item: { type },
                    } = estimate;

                    if (
                      batchInfo?.onlyPlace &&
                      type !== "여행지" &&
                      !enableContent
                    )
                      return null;

                    const getThumbnailImg = item?.files?.find(
                      (img) => img.type === "썸네일"
                    )?.itemSrc;

                    return (
                      <S.ItemCard key={id} onClick={() => handlePlaceClick(item)}>
                        <S.ItemThumbnail $src={getItemImg(getThumbnailImg)}>
                          <S.ItemType>{transType(item?.type)}</S.ItemType>
                        </S.ItemThumbnail>
                        <S.ItemInfo>
                          <S.ItemName>
                            {item?.nameEng} <span>{item.nameKor}</span>
                          </S.ItemName>
                          <S.ItemAddress
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlaceClick(item);
                            }}
                          >
                            {item?.addressEnglish}
                          </S.ItemAddress>
                          {!batchInfo?.hidePrice && (
                            <S.ItemPrice>
                              ${comma(estimate.price)} USD
                              <span>
                                {" / "}
                                {estimate.quantity}{" "}
                                {estimate.quantity === 1 ? "Person" : "People"}
                              </span>
                            </S.ItemPrice>
                          )}
                        </S.ItemInfo>
                      </S.ItemCard>
                    );
                  })}
                </S.ItemsGrid>

                {getTimeline && (
                  <S.TimelineCard>
                    <S.TimelineTitle>Day {day} Itinerary</S.TimelineTitle>
                    <S.TimelineContent>{linkify(getTimeline)}</S.TimelineContent>
                  </S.TimelineCard>
                )}

                {dayMarkers?.length > 0 && (
                  <DayMapSection
                    day={Number(day)}
                    markers={dayMarkers}
                    zoom={zoom}
                    dayDirections={dayDirections}
                    calculateDirections={calculateDirections}
                    activeWindowIds={activeWindowIds}
                    setActiveWindowIds={setActiveWindowIds}
                  />
                )}
              </S.DayCard>
            );
          })}

          {memo && memo?.length > 0 && memo !== "" && (
            <S.MemoSection>
              <label>Additional Notes</label>
              <div dangerouslySetInnerHTML={{ __html: linkifyStr(memo) }} />
            </S.MemoSection>
          )}
        </S.ItinerarySection>
      </S.Content>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <S.ActionButton
          onClick={scrollToTop}
          title="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000
          }}
        >
          ↑
        </S.ActionButton>
      )}
    </S.Container>
  );
};

export default Container;

// Day별 지도 섹션 컴포넌트
const DayMapSection: FC<{
  day: number;
  markers: any[];
  zoom: number;
  dayDirections: {[key: number]: any};
  calculateDirections: (markers: any[], day: number) => void;
  activeWindowIds: {[key: number]: number};
  setActiveWindowIds: React.Dispatch<React.SetStateAction<{[key: number]: number}>>;
}> = ({ day, markers, zoom, dayDirections, calculateDirections, activeWindowIds, setActiveWindowIds }) => {

  const [hasCalculated, setHasCalculated] = useState(false);

  useEffect(() => {
    if (!hasCalculated && markers.length >= 2 && typeof window !== "undefined") {
      setHasCalculated(true);
      calculateDirections(markers, day);
    }
  }, [markers.length, day, hasCalculated, markers, calculateDirections]);

  const activeWindowId = activeWindowIds[day] || 0;
  const setActiveWindowId = (id: number) => {
    setActiveWindowIds(prev => ({ ...prev, [day]: id }));
  };

  const directions = dayDirections[day];

  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (map && markers.length > 0) {
      const getBounds = () => {
        if (!window.google || markers.length === 0) return null;

        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) => {
          bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
        });
        return bounds;
      };

      const bounds = getBounds();
      if (bounds) {
        map.fitBounds(bounds);
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          const currentZoom = map.getZoom();
          if (currentZoom && currentZoom > 15) {
            map.setZoom(15);
          }
        });
      }
    }
  }, [map, markers]);

  return (
    <S.MapSection>
      <S.MapTitle>Day {day} Route Map</S.MapTitle>
      <S.MapInfo>
        {markers.length} location{markers.length > 1 ? 's' : ''} • {directions ? 'Road-based route' : 'Direct path'}
      </S.MapInfo>
      <GoogleMapApiLoader
        language="en"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}
        suspense
      >
        <GoogleMap
          className="h-[300px]"
          containerProps={{ id: `day-${day}-map` }}
          style={{ width: "100%", height: "400px" }}
          zoom={zoom}
          center={{ lat: markers[0].lat, lng: markers[0].lng }}
          onLoad={(mapInstance) => setMap(mapInstance)}
          mapOptions={{
            mapTypeId: "roadmap",
            disableDefaultUI: false,
            gestureHandling: 'cooperative',
            styles: [
              {
                featureType: "poi",
                stylers: [{ visibility: "off" }]
              },
              {
                featureType: "transit",
                stylers: [{ visibility: "off" }]
              },
            ]
          }}
        >
          {markers.map(
            ({ id, lat, lng, name, nameKor, address, src }: any) => (
              <MarkerWithWindowInfo
                key={id}
                id={id}
                lat={lat}
                lng={lng}
                address={address}
                nameKor={nameKor}
                name={name}
                src={src}
                activeWindowId={activeWindowId}
                setActiveWindowId={setActiveWindowId}
              />
            )
          )}

          {directions ? (
            <Polyline
              path={directions.routes[0].overview_path.map((p: any) => ({ lat: p.lat(), lng: p.lng() }))}
              strokeColor="#FF5722"
              strokeOpacity={0.9}
              strokeWeight={5}
              geodesic
            />
          ) : (
            <Polyline
              path={markers}
              strokeColor="#FF5722"
              strokeOpacity={0.9}
              strokeWeight={5}
              geodesic
            />
          )}
        </GoogleMap>
      </GoogleMapApiLoader>
    </S.MapSection>
  );
};

const MarkerWithWindowInfo = (props: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const {
    id,
    lat,
    lng,
    name,
    nameKor,
    address,
    src,
    activeWindowId,
    setActiveWindowId,
  } = props;

  useEffect(() => {
    if (isOpen) {
      setActiveWindowId(id);
    }
  }, [isOpen, id, setActiveWindowId]);

  const close = () => {
    setOpen(false);
    if (activeWindowId === id) {
      setActiveWindowId(0);
    }
  };

  return (
    <InfoWindow
      key={id}
      ariaLabel={name}
      content={
        <Content
          lat={lat}
          lng={lng}
          name={name}
          address={address}
          nameKor={nameKor}
          src={src}
        />
      }
      onCloseClick={close}
      open={activeWindowId === id}
    >
      <Marker lat={lat} lng={lng} onClick={() => setActiveWindowId(id)} />
    </InfoWindow>
  );
};

function Content({ nameKor, name, address, src }: any) {
  return (
    <S.WindowContent>
      <div id="bodyContent">
        <img src={getItemImg(src)} alt="" />
      </div>
      <span>{nameKor}</span>
      <h1 id="firstHeading" className="firstHeading">
        {name}
      </h1>
      <p>{address}</p>
    </S.WindowContent>
  );
}
