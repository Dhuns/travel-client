import styled from "@emotion/styled";
import { munit, unit } from "@shared/utils/base";
import { backgroundImageCover, mobilePoint } from "@styles/globalStyles";
import { css } from "@emotion/react";

export const Container = styled.div`
  max-width: ${unit(1200)};
  margin: 0 auto;
  padding: ${unit(60)} ${unit(40)};
  background: #ffffff;

  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  }

  #my-map {
    height: ${unit(600)} !important;
  }

  @media screen and (max-width: ${mobilePoint}) {
    padding: ${munit(30)} ${munit(20)};

    #my-map {
      height: ${munit(400)} !important;
    }
  }

  .gm-style-mtc {
    display: none !important;
  }
`;

// Header Section
export const Information = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${unit(60)};
  padding: ${unit(40)} 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: ${unit(60)};

  @media screen and (max-width: ${mobilePoint}) {
    grid-template-columns: 1fr;
    gap: ${munit(40)};
    padding: ${munit(30)} 0;
    margin-bottom: ${munit(40)};
  }
`;

export const BatchInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${unit(20)};
`;

export const BatchInfo = styled.div`
  label {
    display: block;
    font-size: ${unit(12)};
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${unit(6)};
  }

  p {
    font-size: ${unit(16)};
    color: #111827;
    line-height: 1.5;
  }

  @media screen and (max-width: ${mobilePoint}) {
    label {
      font-size: ${munit(11)};
      margin-bottom: ${munit(4)};
    }

    p {
      font-size: ${munit(14)};
    }
  }
`;

export const Companies = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${unit(16)};

  h1 {
    font-size: ${unit(28)};
    font-weight: 700;
    color: #111827;
    margin-bottom: ${unit(24)};
    text-transform: uppercase;
    letter-spacing: -0.5px;
  }

  & > div {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${unit(12)};
    font-size: ${unit(14)};

    span {
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      font-size: ${unit(11)};
      letter-spacing: 0.5px;
    }

    p {
      color: #111827;
    }
  }

  img {
    width: ${unit(120)};
    height: auto;
    margin-top: ${unit(20)};
    opacity: 0.8;
    object-fit: contain;
  }

  @media screen and (max-width: ${mobilePoint}) {
    h1 {
      font-size: ${munit(24)};
      margin-bottom: ${munit(20)};
    }

    & > div {
      grid-template-columns: 1fr;
      gap: ${munit(4)};
      font-size: ${munit(13)};

      span {
        font-size: ${munit(10)};
      }
    }

    img {
      width: ${munit(100)};
      margin-top: ${munit(16)};
    }
  }
`;

// Itinerary Section
export const TitleDivision = styled.div`
  width: 100%;
  margin-bottom: ${unit(40)};

  @media screen and (max-width: ${mobilePoint}) {
    margin-bottom: ${munit(30)};
  }
`;

export const ItineraryText = styled.h2`
  font-size: ${unit(24)};
  font-weight: 700;
  color: #111827;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  padding-bottom: ${unit(12)};
  border-bottom: 2px solid #111827;

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(20)};
    padding-bottom: ${munit(10)};
  }
`;

export const EstimateDetailsSection = styled.section``;

export const EachEstimateBox = styled.article`
  margin-bottom: ${unit(60)};
  padding-bottom: ${unit(60)};
  border-bottom: 2px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: ${mobilePoint}) {
    margin-bottom: ${munit(40)};
    padding-bottom: ${munit(40)};
  }
`;

export const DayBox = styled.div`
  font-size: ${unit(20)};
  font-weight: 700;
  color: #111827;
  margin-bottom: ${unit(24)};
  padding-bottom: ${unit(12)};
  border-bottom: 1px solid #e5e5e5;

  span {
    font-size: ${unit(14)};
    font-weight: 400;
    color: #6b7280;
    margin-left: ${unit(12)};
  }

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(18)};
    margin-bottom: ${munit(20)};
    padding-bottom: ${munit(10)};

    span {
      display: block;
      font-size: ${munit(12)};
      margin-left: 0;
      margin-top: ${munit(4)};
    }
  }
`;

export const DetailBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: ${unit(40)};

  @media screen and (max-width: ${mobilePoint}) {
    grid-template-columns: 1fr;
    gap: ${munit(30)};
  }
`;

export const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${unit(24)};

  @media screen and (max-width: ${mobilePoint}) {
    grid-template-columns: 1fr;
    gap: ${munit(20)};
  }
`;

export const ItemDetailBox = styled.div`
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: ${unit(12)};
  padding: ${unit(16)};
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  @media screen and (max-width: ${mobilePoint}) {
    border-radius: ${munit(10)};
    padding: ${munit(14)};
  }
`;

export const ItemThumbnailImgFigure = styled.figure<{ $src: string }>`
  width: 100%;
  height: ${unit(180)};
  border-radius: ${unit(8)};
  background-image: ${({ $src }) => `url(${$src})`};
  ${backgroundImageCover}
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: ${unit(12)};

  summary {
    position: absolute;
    top: ${unit(12)};
    left: ${unit(12)};
    padding: ${unit(6)} ${unit(12)};
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    border-radius: ${unit(6)};
    font-size: ${unit(11)};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #111827;
  }

  @media screen and (max-width: ${mobilePoint}) {
    height: ${munit(160)};
    border-radius: ${munit(6)};
    margin-bottom: ${munit(10)};

    summary {
      top: ${munit(10)};
      left: ${munit(10)};
      padding: ${munit(5)} ${munit(10)};
      font-size: ${munit(10)};
    }
  }
`;

export const ItemName = styled.p`
  font-size: ${unit(16)};
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
  margin-bottom: ${unit(4)};

  span {
    display: block;
    font-size: ${unit(13)};
    font-weight: 400;
    color: #6b7280;
    margin-top: ${unit(2)};
  }

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(15)};

    span {
      font-size: ${munit(12)};
    }
  }
`;

export const ItemAddress = styled.p`
  font-size: ${unit(12)};
  color: #9ca3af;
  margin-bottom: ${unit(8)};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #111827;
  }

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(11)};
    margin-bottom: ${munit(6)};
  }
`;

export const ItemPrice = styled.div`
  font-size: ${unit(15)};
  font-weight: 700;
  color: #111827;
  margin-top: auto;
  padding-top: ${unit(8)};
  border-top: 1px solid #e5e5e5;

  span {
    font-size: ${unit(12)};
    font-weight: 400;
    color: #6b7280;
  }

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(14)};
    padding-top: ${munit(6)};

    span {
      font-size: ${munit(11)};
    }
  }
`;

export const TimelineBox = styled.div`
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: ${unit(12)};
  padding: ${unit(24)};
  position: sticky;
  top: ${unit(20)};

  h5 {
    font-size: ${unit(14)};
    font-weight: 700;
    color: #111827;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${unit(16)};
    padding-bottom: ${unit(12)};
    border-bottom: 1px solid #e5e5e5;
  }

  div {
    font-size: ${unit(13)};
    line-height: 1.8;
    color: #4b5563;
    white-space: pre-line;

    a {
      color: #111827;
      text-decoration: underline;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  @media screen and (max-width: ${mobilePoint}) {
    position: static;
    border-radius: ${munit(10)};
    padding: ${munit(20)};

    h5 {
      font-size: ${munit(13)};
      margin-bottom: ${munit(14)};
      padding-bottom: ${munit(10)};
    }

    div {
      font-size: ${munit(12)};
      line-height: 1.6;
    }
  }
`;

// Map Section
export const MapSection = styled.div`
  margin-top: ${unit(60)};
  margin-bottom: ${unit(40)};

  @media screen and (max-width: ${mobilePoint}) {
    margin-top: ${munit(40)};
    margin-bottom: ${munit(30)};
  }
`;

// Memo Section
export const MemoSection = styled.div`
  margin-top: ${unit(60)};
  padding: ${unit(32)};
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: ${unit(12)};

  label {
    display: block;
    font-size: ${unit(14)};
    font-weight: 700;
    color: #111827;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${unit(16)};
    padding-bottom: ${unit(12)};
    border-bottom: 1px solid #e5e5e5;
  }

  & > div {
    font-size: ${unit(14)};
    line-height: 1.8;
    color: #4b5563;
    white-space: pre-line;

    a {
      color: #111827;
      text-decoration: underline;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  @media screen and (max-width: ${mobilePoint}) {
    margin-top: ${munit(40)};
    padding: ${munit(24)};
    border-radius: ${munit(10)};

    label {
      font-size: ${munit(13)};
      margin-bottom: ${munit(14)};
      padding-bottom: ${munit(10)};
    }

    & > div {
      font-size: ${munit(13)};
      line-height: 1.6;
    }
  }
`;

// Map Info Window
export const WindowContent = styled.div`
  padding: ${unit(12)};
  max-width: ${unit(220)};

  & > div {
    margin-bottom: ${unit(8)};

    img {
      width: 100%;
      border-radius: ${unit(6)};
    }
  }

  & > span {
    display: block;
    font-size: ${unit(12)};
    font-weight: 400;
    color: #6b7280;
    margin-bottom: ${unit(4)};
  }

  & > h1 {
    font-size: ${unit(14)};
    font-weight: 600;
    color: #111827;
    margin-bottom: ${unit(4)};
    line-height: 1.4;
  }

  & > p {
    font-size: ${unit(11)};
    color: #9ca3af;
    line-height: 1.4;
  }
`;

export const ItemType = styled.p``;
export const ItemDesc = styled.p``;
export const ItemDetailImgFigure = styled.figure<{ $src: string }>``;
export const DisableButton = styled.button``;
