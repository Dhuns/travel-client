import styled from "@emotion/styled";
import { munit, unit } from "@shared/utils/base";
import { backgroundImageCover, mobilePoint } from "@styles/globalStyles";
import { css } from "@emotion/react";

export const Container = styled.div`
  width: ${unit(1080)};
  margin: 0 auto;

  * {
    /* font-family: 'Aeonik'; */
    /* font-family: 'Times New Roman'; */
    /* font-family: 'Helvetica';
		font-family: 'SF Pro'; */
    font-family: "Lato", sans-serif;
  }

  #my-map {
    height: ${unit(600)} !important;
  }

  @media screen and (max-width: ${mobilePoint}) {
    width: 100%;
    margin: 0;

    #my-map {
      height: ${munit(600)} !important;
    }
  }

  .gm-style-mtc {
    display: none !important;
  }
`;

export const Information = styled.div`
  display: flex;
  border-top: 3px solid;
  border-bottom: 3px solid;
  padding: ${unit(20)} 0;
  border-top: 3px solid;
  border-bottom: 3px solid;
  padding: ${unit(20)} 0;
  justify-content: space-between;
  margin-bottom: ${unit(50)};
  position: relative;

  @media screen and (max-width: ${mobilePoint}) {
    display: flex;
    flex-direction: column;
    border-top: 3px solid;
    border-bottom: 3px solid;
    padding: ${munit(20)} ${munit(10)};
    justify-content: space-between;
    margin-bottom: ${munit(25)};
  }
`;

export const Companies = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${unit(5)};
  width: ${unit(350)};
  h1 {
    font-size: ${unit(80)};
    font-weight: black;
    letter-spacing: -5px;
    font-family: "Times New Roman";
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-bottom: ${unit(30)};
    text-transform: uppercase;
  }

  & > div {
    display: flex;
    justify-content: flex-end;
    /* flex-direction: column; */
    font-size: ${unit(16)};
    span {
      font-weight: 500;
      text-align: right;
      &::after {
        content: ":";
        margin-left: ${unit(5)};
      }
    }
    p {
      color: #888;
      margin-left: ${unit(10)};
      text-align: right;
    }
  }

  img {
    display: block;
    margin-left: auto;
    margin-top: auto;
    height: ${unit(50)};
  }

  @media screen and (max-width: ${mobilePoint}) {
    gap: ${munit(20)};
    width: 100%;
    margin-top: ${munit(20)};
    h1 {
      font-size: ${munit(45)};
      width: 100%;
      font-weight: black;
      letter-spacing: -5px;
      font-family: "Times New Roman";
      display: block;
      margin-bottom: ${munit(30)};
      /* display: none; */
      position: absolute;
      top: ${munit(20)};
      left: 0;
      text-align: center;
      white-space: pre-wrap;
      word-break: break-all;
      /* transform: translateX(-50%); */
    }

    & > div {
      display: flex;
      flex-direction: column;
      /* justify-content: flex-start; */
      font-size: ${munit(16)};
      span {
        font-weight: 500;
        text-align: left;
        &::after {
          content: none;
          margin-left: 0;
        }
      }
      p {
        /* margin-left: ${munit(10)}; */
        margin-left: 0;
        text-align: left;
      }
    }

    img {
      height: ${munit(50)};
    }
  }
`;

export const BatchInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${unit(10)};
  position: relative;

  @media screen and (max-width: ${mobilePoint}) {
    gap: ${munit(10)};
    padding-top: ${munit(100)};
  }
`;

export const BatchInfo = styled.div`
  margin-bottom: ${unit(5)};
  label {
    display: block;
    font-weight: 500;
    color: #000;
    font-size: ${unit(16)};
  }
  & > p {
    font-size: ${unit(16)};
    color: #888;
    font-style: italic;
  }

  @media screen and (max-width: ${mobilePoint}) {
    margin-bottom: ${munit(5)};
    label {
      display: block;
      font-weight: 500;
      color: #000;
      font-size: ${munit(16)};
    }
    & > p {
      font-size: ${munit(16)};
      color: #888;
      font-style: italic;
    }
  }
`;

const tableStyles = css`
  border-radius: ${unit(15)};
  padding: ${unit(20)};
  z-index: 100;
`;

export const TitleDivision = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: ${unit(50)};
  justify-content: space-between;

  @media screen and (max-width: ${mobilePoint}) {
    margin-bottom: ${munit(25)};
    padding: ${munit(15)};
  }
`;

export const DisableButton = styled.button`
  width: ${unit(180)};
  height: ${unit(50)};
  background-color: #0066ca;
  color: #fff;
  border-radius: ${unit(8)};
  font-size: ${unit(16)};
`;

export const ItineraryText = styled.p`
  width: 100%;
  font-size: ${unit(35)};
  font-weight: 600;

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(35)};
  }
`;

export const EstimateDetailsSection = styled.section``;

export const EachEstimateBox = styled.article`
  margin-bottom: ${unit(50)};

  @media screen and (max-width: ${mobilePoint}) {
    margin-bottom: ${munit(25)};
  }
`;

export const DayBox = styled.div`
  width: 100%;
  font-size: ${unit(32)};
  font-weight: 600;
  margin-bottom: ${unit(20)};
  padding: ${unit(15)};
  border-bottom: 2px solid #ddd;

  span {
    font-size: ${unit(17)};
    font-weight: 500;
    margin-left: ${unit(10)};
  }

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(32)};
    margin-bottom: ${munit(20)};
    padding: ${munit(15)};
    border-bottom: 2px solid #ddd;

    span {
      font-size: ${munit(14)};
      margin-left: ${munit(10)};
    }
  }
`;

export const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  gap: ${unit(15)};
  align-items: flex-start;

  @media screen and (max-width: ${mobilePoint}) {
    flex-direction: column;
    gap: ${munit(15)};
  }
`;

export const TimelineBox = styled.div`
  width: ${unit(300)};
  flex-shrink: 0;
  ${tableStyles}
  padding: ${unit(30)} ${unit(20)};
  white-space: pre-line;
  h5 {
    font-size: ${unit(20)};
    font-weight: 500;
  }
  div {
    padding: ${unit(20)} 0;
    white-space: pre-line;
    font-size: ${unit(16)};
    line-height: ${unit(25)};
    color: #444;
    font-weight: 400;
    font-style: italic;

    a {
      color: #0041ff;
      text-decoration: underline;
    }
  }

  @media screen and (max-width: ${mobilePoint}) {
    width: 100%;
    flex-shrink: 0;
    ${tableStyles}
    padding: ${munit(30)} ${munit(20)};
    h5 {
      font-size: ${munit(20)};
    }
    div {
      padding: ${munit(20)} 0;
      font-size: ${munit(16)};
      line-height: ${munit(25)};
    }
  }
`;

export const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${unit(15)};
  ${tableStyles}

  @media screen and (max-width: ${mobilePoint}) {
    gap: ${munit(15)};
  }
`;

export const ItemDetailBox = styled.div`
  padding: ${unit(15)};
  box-shadow: rgba(0, 0, 0, 0.1) ${unit(0)} ${unit(20)} ${unit(25)} ${unit(-5)},
    rgba(0, 0, 0, 0.04) ${unit(0)} ${unit(10)} ${unit(10)} ${unit(-5)};
  border: 1px solid #f0f0f0;
  border-radius: ${unit(15)};
  background-color: #fff;
  width: ${unit(350)};
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    border-top: 1px solid #eee;
  }

  @media screen and (max-width: ${mobilePoint}) {
    padding: ${munit(15)};
    box-shadow: rgba(0, 0, 0, 0.1) ${munit(0)} ${munit(20)} ${munit(25)}
        ${munit(-5)},
      rgba(0, 0, 0, 0.04) ${munit(0)} ${munit(10)} ${munit(10)} ${munit(-5)};
    border-radius: ${munit(15)};
    width: 100%;

    &:not(:first-child) {
      border-top: 1px solid #eee;
    }
  }
`;

export const ItemName = styled.p`
  margin-top: ${unit(10)};
  font-size: ${unit(18)};
  font-weight: 500;
  line-height: 1.4;

  span {
    font-size: ${unit(15)};
    color: #888;
    font-weight: 400;
  }

  @media screen and (max-width: ${mobilePoint}) {
    margin-top: ${munit(10)};
    font-size: ${munit(18)};

    span {
      font-size: ${munit(15)};
      font-weight: 400;
    }
  }
`;

export const ItemType = styled.p`
  font-size: ${unit(16)};
  font-weight: 400;
  line-height: 1.4;
  color: #999;
  margin-bottom: ${unit(10)};

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(16)};
    margin-bottom: ${munit(10)};
  }
`;

export const ItemAddress = styled.p`
  font-size: ${unit(16)};
  font-weight: 400;
  line-height: 1.4;
  color: #888;
  color: #a8a8a8;
  margin-top: ${unit(5)};
  margin-bottom: ${unit(10)};
  position: relative;
  user-select: none;
  cursor: pointer;
  &:hover {
    color: #0066cb;
    font-weight: 500;
    /* text-decoration: underline; */
  }

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(16)};
    font-weight: 400;
    line-height: 1.4;
    color: #888;
    color: #a8a8a8;
    margin-top: ${munit(5)};
    margin-bottom: ${munit(10)};
    position: relative;
    user-select: none;
    cursor: pointer;
    &:hover {
      color: #0066cb;
      font-weight: 500;
      /* text-decoration: underline; */
    }
  }
`;

export const ItemDesc = styled.p`
  font-size: ${unit(14)};
  font-weight: 400;
  line-height: 1.4;
  color: #888;

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(14)};
  }
`;

export const ItemThumbnailImgFigure = styled.figure<{ $src: string }>`
  width: 100%;
  height: ${unit(200)};
  border-radius: ${unit(10)};
  flex-shrink: 0;
  background-image: ${({ $src }) => `url(${$src})`};
  ${backgroundImageCover}
  position: relative;
  overflow: hidden;
  cursor: pointer;

  /* &:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: ${unit(60)};
		background-image: linear-gradient(to top, rgba(74, 118, 223, 0.6), rgba(0, 0, 0, 0));
	} */

  summary {
    position: absolute;
    padding: ${unit(10)} ${unit(20)};
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: ${unit(10)};
    left: ${unit(15)};
    top: ${unit(15)};
    box-shadow: rgba(0, 0, 0, 0.2) ${unit(0)} ${unit(20)} ${unit(25)}
        ${unit(-5)},
      rgba(0, 0, 0, 0.06) ${unit(0)} ${unit(10)} ${unit(10)} ${unit(-5)};
    font-size: ${unit(14)};
    font-weight: 700;
  }

  @media screen and (max-width: ${mobilePoint}) {
    height: ${munit(200)};
    border-radius: ${munit(10)};
    background-image: ${({ $src }) => `url(${$src})`};

    summary {
      position: absolute;
      padding: ${munit(10)} ${munit(20)};
      background-color: rgba(255, 255, 255, 0.85);
      border-radius: ${munit(10)};
      left: ${munit(15)};
      top: ${munit(15)};
      box-shadow: rgba(0, 0, 0, 0.2) ${munit(0)} ${munit(20)} ${munit(25)}
          ${munit(-5)},
        rgba(0, 0, 0, 0.06) ${munit(0)} ${munit(10)} ${munit(10)} ${munit(-5)};
      font-size: ${munit(14)};
      font-weight: 700;
    }
  }
`;

export const ItemDetailImgFigure = styled.figure<{ $src: string }>`
  width: ${unit(80)};
  height: ${unit(80)};
  background-image: ${({ $src }) => `url(${$src})`};
  ${backgroundImageCover}

  @media screen and (max-width: ${mobilePoint}) {
    width: ${munit(80)};
    height: ${munit(80)};
  }
`;

export const ItemPrice = styled.div`
  font-weight: 400;
  font-size: ${unit(17)};
  margin-top: auto;
  font-style: italic;
  font-weight: bold;
  display: block;

  span {
    font-size: ${unit(14)};
    color: #111;
    font-weight: 500;
  }

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(17)};

    span {
      font-size: ${munit(14)};
    }
  }
`;

export const MemoSection = styled.div`
  padding: ${unit(30)} ${unit(20)};
  margin-bottom: ${unit(10)};
  label {
    display: block;
    font-size: ${unit(20)};
    font-weight: 500;
    color: #000;
    margin-bottom: ${unit(15)};
  }
  & > div {
    white-space: pre-line;
  }

  * {
      /* font-family: "Times New Roman" !important; */
    }

  @media screen and (max-width: ${mobilePoint}) {
    padding: ${munit(30)} ${munit(20)};
    margin-bottom: ${munit(10)};
    label {
      margin-bottom: ${munit(15)};
      font-size: ${munit(20)};
    }

    * {
      font-size: 1rem;
      /* font-family: "Times New Roman" !important; */
    }
  }
`;

export const WindowContent = styled.div`
  padding-bottom: ${unit(10)};
  max-width: auto;
  padding-right: ${unit(10)};
  width: ${unit(200)};
  & > div {
    padding-bottom: ${unit(5)};
    img {
      width: ${unit(150)};
      width: 100%;
    }
  }
  & > h1 {
    white-space: pre-line;
    font-size: ${unit(20)};
    font-weight: 400;
  }

  & > span {
    font-weight: 500;
    color: #777;
  }
`;
