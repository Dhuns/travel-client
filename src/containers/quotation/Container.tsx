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
  use,
  useCallback,
  Suspense,
} from "react";
import * as S from "./styled";
import { groupBy, isEmpty, isNil, keys } from "lodash-es";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {
  GoogleMap,
  GoogleMapApiLoader,
  InfoWindow,
  Marker,
  Polyline,
} from "react-google-map-wrapper";

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

const MapTypeId = {
  HYBRID: "hybrid",
  ROADMAP: "roadmap",
  SATELLITE: "satellite",
  TERRAIN: "terrain",
};

const Container: FC = () => {
  /**
   * States
   */

  const [memo, setMemo] = useState<any>("");
  const [zoom, setZoom] = useState<number>(11);
  const [activeWindowIds, setActiveWindowIds] = useState<{[key: number]: number}>({});
  const [dayDirections, setDayDirections] = useState<{[key: number]: any}>({});

  /**
   * Queries
   */
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

  // const { data: estimateDetail, isLoading, error } = useGetEstimateDetail(TEMP_HASH);

  const { batchInfo, estimateDetails, estimateInfo } = estimateDetail || {};

  const [groupByDays, setGroupByDays] = useState<IGroupByDays>();
  const [timeline, setTimeline] = useState<string[]>([]);

  /**
   * Side-Effects
   */
  useEffect(() => {
    if (!error) {
      return;
    }

    // console.log(error, "error is here");

    // if (error?.response?.data?.statusCode === 400) {
    //   replace("/404");
    // }
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

  // 일자별 마커와 경로를 계산하는 헬퍼 함수
  const getMarkersForDay = (dayEstimates: any[]) => {
    return dayEstimates
      .filter((o: any) => {
        // 이동수단 제외
        if (o.item.type === "이동수단") return false;

        // 컨텐츠 타입 제외 (영어가이드 등)
        if (o.item.type === "컨텐츠") return false;

        // 위도/경도가 없거나 0이면 제외
        if (!o.item.lat || !o.item.lng || o.item.lat === "0" || o.item.lng === "0") {
          return false;
        }

        // 여행지와 숙박만 표시
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

  // Directions API를 사용한 경로 계산
  const calculateDirections = useCallback(async (markers: any[], day: number) => {
    // 이미 계산되었으면 스킵
    if (dayDirections[day] !== undefined) {
      return;
    }

    if (markers.length < 2 || typeof window === "undefined" || !window.google) {
      setDayDirections(prev => ({ ...prev, [day]: null }));
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    // 경유지가 너무 많으면 경로 계산 스킵 (Polyline 사용)
    if (markers.length > 10) {
      console.log(`Day ${day}: Too many markers (${markers.length}), using polyline`);
      setDayDirections(prev => ({ ...prev, [day]: null }));
      return;
    }

    // 경유지 샘플링 (최대 8개로 제한)
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

    // 출발지와 도착지가 같으면 경로 계산 스킵
    const isSameLocation =
      Math.abs(origin.lat - destination.lat) < 0.0001 &&
      Math.abs(origin.lng - destination.lng) < 0.0001;

    if (isSameLocation && sampledWaypoints.length === 0) {
      console.log(`Day ${day}: Same origin and destination, using polyline`);
      setDayDirections(prev => ({ ...prev, [day]: null }));
      return;
    }

    const waypoints = sampledWaypoints.map((m) => ({
      location: { lat: m.lat, lng: m.lng },
      stopover: true,
    }));

    console.log(`Day ${day}: Calculating route with ${waypoints.length} waypoints`);

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
        region: 'KR', // 한국 지역 설정
        language: 'en', // 주소는 영어로
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(`Day ${day}: Directions success!`);
          setDayDirections(prev => ({ ...prev, [day]: result }));
        } else {
          console.log(`Day ${day}: Directions failed (${status}), using polyline`);
          setDayDirections(prev => ({ ...prev, [day]: null }));
        }
      }
    );
  }, [dayDirections]);

  /**
   * Handlers
   */

  const onAddressHandler = (placeName: string, address: string) => {
    // 장소명으로 구글맵 검색 (장소명 + 주소로 더 정확한 검색)
    const searchQuery = `${placeName} ${address}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    window.open(url, "_blank");
  };

  const goWebsite = (link: string) => {
    if (!link || isNil(link) || link === "") {
      return;
    }
    window.open(link, "_blank");
  };

  /**
   * Helpers
   */

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
    // URL을 매칭하는 정규 표현식 (http, https, www) - '<' 또는 '>' 포함되지 않도록 수정
    const urlRegex = /(https?:\/\/[^\s<>\)]+|www\.[^\s<>\)]+)/g;

    // 입력된 text를 정규 표현식으로 나눈 후, URL이면 a태그로 변환하고, 아니면 그대로 반환
    return text
      .split(urlRegex)
      .map((part) => {
        if (part.match(urlRegex)) {
          // 'www'로 시작하는 URL은 'https'를 자동으로 추가
          const href = part.startsWith("www.") ? `https://${part}` : part;

          // a 태그로 변환하여 반환
          return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">${part}</a>`;
        }
        return part;
      })
      .join(""); // 배열을 문자열로 변환하여 반환
  };

  // const onChangeHandler = (ev: any) => {
  // 	setZoom(Number(Math.round(ev.target.value)));
  // };

  if (isLoading) return null;

  return (
    <S.Container>
      {/* <S.ItineraryText>Information</S.ItineraryText> */}
      <S.Information>
        <S.BatchInfoSection>
          <S.BatchInfo>
            <label>Customer</label>
            <p>{batchInfo?.recipient ?? ""}</p>
          </S.BatchInfo>
          <S.BatchInfo>
            <label>Title</label>
            <p>{batchInfo?.title ?? ""}</p>
          </S.BatchInfo>
          <S.BatchInfo>
            <label>Price for {totalPeople} people</label>
            <p>${comma(batchInfo?.autoSumAmount)} USD</p>
          </S.BatchInfo>
          <S.BatchInfo>
            <label>Travel date</label>
            <p>{`${dayjs(batchInfo?.startDate).format(
              "dddd, DD MMMM YYYY"
            )} ~ ${dayjs(batchInfo?.endDate).format("dddd, DD MMMM YYYY") ||
            dayjs(batchInfo?.startDate).format("dddd, DD MMMM YYYY")
              }`}</p>
          </S.BatchInfo>
          <S.BatchInfo>
            <label>Headcount composition</label>
            <p>{`Adults : ${batchInfo?.adultsCount ?? 0} / Children : ${batchInfo?.childrenCount ?? 0
              } / FOC : ${batchInfo?.infantsCount ?? 0}`}</p>
          </S.BatchInfo>
          <S.BatchInfo>
            <label>Date of Issue</label>
            <p>{dayjs(estimateInfo?.createdAt).format("dddd, DD MMMM YYYY")}</p>
          </S.BatchInfo>
        </S.BatchInfoSection>
        <S.Companies>
          <h1>{batchInfo?.quotation}</h1>
          <div>
            <span>Prepared by</span>
            <p>{batchInfo?.preparedBy}</p>
          </div>
          <div>
            <span>Email</span>
            <p>{batchInfo?.email}</p>
          </div>
          <div>
            <span>Office hours (weekdays)</span>
            <p>{batchInfo?.officeHours}</p>
          </div>
          <div>
            <span>Office number</span>
            <p>{batchInfo?.officeNumber}</p>
          </div>
          <div>
            <span>Emergency number</span>
            <p>{batchInfo?.emergencyNumber}</p>
          </div>
          <div style={{ flexDirection: "column" }}>
            <span>Address</span>
            <p>{batchInfo?.address}</p>
          </div>
          <img src="/images/signature.png" alt="main_img" />
        </S.Companies>
      </S.Information>

      <S.TitleDivision>
        <S.ItineraryText>Itinerary</S.ItineraryText>
        {/* <S.DisableButton onClick={() => setOnlyPlaces((prev) => !prev)}>{onlyPlaces ? 'Show All' : 'Only Places'}</S.DisableButton> */}
      </S.TitleDivision>

      <S.EstimateDetailsSection>
        {keys(groupByDays).map((day) => {
          const getTimeline = timeline?.[Number(day) - 1] ?? "";
          const dayMarkers = getMarkersForDay(groupByDays?.[Number(day)] ?? []);

          return (
            <div key={day}>
              <S.EachEstimateBox>
                <S.DayBox key={day}>
                  Day {day}
                  <span>
                    {dayjs(batchInfo?.startDate)
                      .add(Number(day) - 1, "day")
                      .format("dddd, DD.MMMM.YYYY")}
                  </span>
                </S.DayBox>
                <S.DetailBox>
                  <S.ItemBox>
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
                        <S.ItemDetailBox key={id}>
                          <div>
                            <S.ItemThumbnailImgFigure
                              $src={getItemImg(getThumbnailImg)}
                              onClick={() => goWebsite(item?.websiteLink)}
                            >
                              <summary>{transType(item?.type)}</summary>
                            </S.ItemThumbnailImgFigure>
                          </div>
                          <S.ItemName>
                            {item?.nameEng} <span>{item.nameKor}</span>
                          </S.ItemName>
                          <S.ItemAddress
                            onClick={() => onAddressHandler(item.nameEng, item.addressEnglish)}
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
                          {/* <S.ItemDesc>{item?.description}</S.ItemDesc> */}
                          {/* <div>
														{getDetailImg.map((img) => {
															return (
																<div key={img.id}>
																	<S.ItemDetailImgFigure $src={getItemImg(img.itemSrc)} />
																</div>
															);
														})}
													</div> */}
                        </S.ItemDetailBox>
                      );
                    })}
                  </S.ItemBox>
                  <S.TimelineBox>
                    <h5>Day {day} Itinerary</h5>
                    <div>{linkify(getTimeline)}</div>
                  </S.TimelineBox>
                </S.DetailBox>

                {/* Day별 지도 */}
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
              </S.EachEstimateBox>
            </div>
          );
        })}

        {memo && memo?.length > 0 && memo !== "" ? (
          <S.MemoSection>
            <label />
            <div dangerouslySetInnerHTML={{ __html: linkifyStr(memo) }} />
          </S.MemoSection>
        ) : null}
      </S.EstimateDetailsSection>
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
  }, [markers.length, day]);

  const activeWindowId = activeWindowIds[day] || 0;
  const setActiveWindowId = (id: number) => {
    setActiveWindowIds(prev => ({ ...prev, [day]: id }));
  };

  const directions = dayDirections[day];

  // 모든 마커를 포함하는 bounds 계산
  const getBounds = () => {
    if (!window.google || markers.length === 0) return null;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
    });
    return bounds;
  };

  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = getBounds();
      if (bounds) {
        map.fitBounds(bounds);
        // 여백 추가
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          const currentZoom = map.getZoom();
          if (currentZoom && currentZoom > 15) {
            map.setZoom(15);
          }
        });
      }
    }
  }, [map, markers.length]);

  return (
    <S.MapSection>
      <S.TitleDivision>
        <S.ItineraryText>Day {day} Route Map</S.ItineraryText>
      </S.TitleDivision>
      <div style={{
        marginBottom: '16px',
        fontSize: '14px',
        color: '#6b7280',
        lineHeight: '1.6'
      }}>
        {markers.length} location{markers.length > 1 ? 's' : ''} • {directions ? 'Road-based route' : 'Direct path'}
      </div>
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
  }, [isOpen]);

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
