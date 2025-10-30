import { css } from "@emotion/react";
import { IMG_URI, munit, unit } from "@shared/utils/base";
import { mobilePoint } from "./globalStyles";

const globalStyles = css`
  a,
  a:link,
  a:visited {
    text-decoration: none;
    color: #222;
  }
  html,
  body {
    strong {
      color: unset;
    }
    background-color: #fff;
    overflow: initial !important;
    overflow-x: hidden;
    /* @media screen and (max-width: 1240px) {
      font-size: 0.85rem;
    }

    @media screen and (max-width: 1024px) {
      font-size: 0.82rem;
    }

    @media screen and (max-width: 1000px) {
      font-size: 0.75rem;
    }

    @media screen and (max-width: 920px) {
      font-size: 0.7rem;
    }

    @media screen and (max-width: 860px) {
      font-size: 0.65rem;
    }

    @media screen and (max-width: 800px) {
      font-size: 0.63rem;
    }

    @media screen and (max-width: ${mobilePoint}) {
      font-size: 1rem;
    } */

    .ReactModal__Body--open,
    .ReactModal__Html--open {
      /* 모달 열렸을 때 스크롤 되지 않도록 수정 */
      overflow: hidden !important;
    }
  }
  body {
    -ms-overflow-style: none;
    background-color: #fff;

    .Overlay {
      background-color: rgba(0, 0, 0, 0.6);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .FreeOverlay {
      z-index: 900;
    }

    .Modal {
      background-color: white;
      min-width: ${unit(340)};
      /* min-height: ${unit(280)}; */
      border-radius: ${unit(15)};
      border: none;
      inset: 0;
      box-shadow: 0 0 ${unit(30)} 0 rgba(0, 0, 0, 0.05);

      position: relative;
      display: flex;
      flex-direction: column;

      padding: 0;
      white-space: pre-wrap;
      z-index: 1100;

      /* align-items: center; */
      /* text-align: center; */
      /* padding: ${unit(30)} ${unit(55)} ${unit(50)}; */

      @media screen and (max-width: ${mobilePoint}) {
        width: ${munit(320)};
        min-width: ${munit(320)};
        /* min-height: ${munit(240)}; */
        border-radius: ${munit(8)};
        box-shadow: 0 0 ${munit(30)} 0 rgba(0, 0, 0, 0.05);
      }
    }

    .FreeModal {
      z-index: 990;
    }

    .tooltipStyle {
      box-shadow: 0 ${unit(2)} ${unit(4)} 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      font-weight: 500;
      color: #222;
      font-size: ${unit(13)};
      white-space: pre-wrap;
      z-index: 10000;

      @media screen and (max-width: ${mobilePoint}) {
        box-shadow: 0 ${munit(2)} ${munit(4)} 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;
        font-weight: 500;
        color: #222;
        font-size: ${munit(13)};
      }
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
  *::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  * {
    color: #222;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    box-sizing: border-box;
    font-family: "Pretendard";
    margin: 0;
    padding: 0;
    word-break: keep-all;
    /* color: #111; */
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  /* li {
    list-style: none;
  } */

  button {
    user-select: none;
    color: black;
    background: none;
    border: none;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
  *:focus {
    outline: none;
  }

  input:not([type="radio"]):not([type="checkbox"]) {
    outline: none;
    -webkit-appearance: none;
  }

  input:not([type="radio"]):not([type="checkbox"]),
  textarea {
    -webkit-appearance: none;
    -moz-user-select: auto !important;
    -webkit-user-select: auto !important;
    -ms-user-select: auto !important;
    user-select: auto !important;
    &::placeholder {
      color: #ccc;
    }
  }
  select {
    position: relative;
    background-image: url("/images/select_image.webp") !important;
    background-position: right ${unit(10)} center;
    background-repeat: no-repeat;
    background-color: #fff;
    padding-right: ${unit(14)} !important;
    outline: none;
    -moz-appearance: none !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    background-size: ${unit(14)} auto;

    /* select 플레이스홀더 적용 */
    &:required:invalid {
      color: #c3c7cc;
    }
    option[value=""][disabled] {
      display: none;
    }
    option {
      color: black;
    }

    @media screen and (max-width: ${mobilePoint}) {
      background-position: right ${munit(10)} center;
    }
  }
  button:disabled {
    &:hover {
      cursor: unset;
    }
  }
  button:not(:disabled):active {
    transform: scale(0.98);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: #333;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  /* 파이어폭스에서의 초기화 방법 */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input:read-only:focus {
    border-color: #e8e8e8;
  }
  input {
    transition: 0.2s;
  }

  .pcBlock {
    display: block !important;
    @media screen and (max-width: ${mobilePoint}) {
      display: none !important;
    }
  }
  .pcFlex {
    display: flex !important;
    @media screen and (max-width: ${mobilePoint}) {
      display: none !important;
    }
  }
  .mBlock {
    display: none !important;
    @media screen and (max-width: ${mobilePoint}) {
      display: block !important;
    }
  }
  .mFlex {
    display: none !important;
    @media screen and (max-width: ${mobilePoint}) {
      display: flex !important;
    }
  }
`;

export default globalStyles;
