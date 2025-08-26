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
  const [markers, setMarkers] = useState<any[]>([]);
  const [zoom, setZoom] = useState<number>(11);
  const [activeWindowId, setActiveWindowId] = useState<number>(0);

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

    console.log(error, "error is here");

    if (error?.response?.data?.statusCode === 400) {
      replace("/404");
    }
  }, [error]);

  useEffect(() => {
    if (!estimateDetails || isEmpty(estimateDetails)) {
      return;
    }
    const locations = estimateDetails
      .filter((o: any) => o.item.type !== "이동수단")
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
    setMarkers(locations);

    const groupByDays = groupBy(estimateDetails, "days");
    const splitTimeline =
      estimateInfo?.timeline?.split(TIMELINE_JOIN_KEY) ?? [];

    setGroupByDays(groupByDays);
    setTimeline(splitTimeline);
  }, [estimateDetails]);

  useEffect(() => {
    if (estimateInfo?.comment) {
      const parse = safeJsonParse(estimateInfo.comment);
      setMemo(draftToHtml(parse));
    }
  }, [estimateInfo?.comment]);

  /**
   * Handlers
   */

  const onAddressHandler = (address: string) => {
    // const url = `https://google.co.kr/maps/@${lng},${lat},${17}z`;
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
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
      .map((part, index) => {
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

                      const getDetailImg = item?.files?.filter(
                        (img) => img.type !== "썸네일"
                      );

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
                            onClick={() => onAddressHandler(item.address)}
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
              </S.EachEstimateBox>
            </div>
          );
        })}

        <S.TitleDivision>
          <S.ItineraryText>Travel Route</S.ItineraryText>
          {/* <S.DisableButton onClick={() => setOnlyPlaces((prev) => !prev)}>{onlyPlaces ? 'Show All' : 'Only Places'}</S.DisableButton> */}
        </S.TitleDivision>
        {markers?.length && (
          <GoogleMapApiLoader
            language="en"
            apiKey="AIzaSyAnX6B3sNw-OG7TxZXtQxAoFT000z7kMDU"
            suspense
          >
            <GoogleMap
              className="h-[400px]"
              containerProps={{ id: "my-map" }}
              style={{ width: "100%", height: "500px" }}
              zoom={zoom}
              center={{ lat: markers[0].lat, lng: markers[0].lng }}
              mapOptions={{
                mapTypeId: MapTypeId.TERRAIN,
                disableDefaultUI:false, // Removes all default controls
                gestureHandling: 'cooperative', // Requires ctrl+scroll to zoom
                styles: [
                  {
                    featureType: "all",
                    stylers: [{ visibility: "off" }]
                  },
                  {
                    featureType: "geometry",
                    stylers: [{ visibility: "on", color: "#f5f5f5" }]
                  },
                  {
                    featureType: 'administrative',
                    elementType: 'geometry',
                    stylers: [{ visibility: 'off' }],
                  },
                  {
                    featureType: 'administrative.country',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }],
                  },
                  {
                    featureType: 'road',
                    stylers: [{ visibility: 'off' }], // Optional: Hide roads as well
                  },
                  {
                    featureType: 'poi',
                    stylers: [{ visibility: 'off' }], // Optional: Hide points of interest
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

              <Polyline
                path={markers}
                strokeColor="#0066ca"
                strokeOpacity={1.0}
                strokeWeight={4}
                geodesic
              />
            </GoogleMap>
          </GoogleMapApiLoader>
        )}

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
