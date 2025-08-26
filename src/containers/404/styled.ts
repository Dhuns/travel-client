import styled from "@emotion/styled";
import { unit } from "@shared/utils/base";

export const NotFoundBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ImgFigure = styled.figure`
  width: ${unit(250)};
  height: auto;

  img {
    width: 100% !important;
    height: auto !important;
  }
`;
