import styled from "@emotion/styled";
import { munit, unit } from "@shared/utils/base";
import { mobilePoint } from "@styles/globalStyles";

export const HeaderContainer = styled.header`
  width: 100%;
  height: ${unit(120)};
  /* background-color: #0066cb; */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  nav {
    width: ${unit(1080)};
    height: ${unit(120)};
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
  }

  @media screen and (max-width: ${mobilePoint}) {
    width: 100%;
    height: ${munit(90)};

    nav {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Logo = styled.figure`
  width: calc(100% / 3);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0;
  margin-right: auto;

  img {
    width: auto !important;
    height: ${unit(80)} !important;
  }

  @media screen and (max-width: ${mobilePoint}) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;

    img {
      width: auto !important;
      height: ${munit(60)} !important;
    }
  }
`;

export const RightHeader = styled.figure`
  width: calc(100% / 3);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  img {
    width: auto !important;
    height: ${unit(100)} !important;
  }

  @media screen and (max-width: ${mobilePoint}) {
    display: none;
  }
`;

export const Title = styled.h1`
  color: blue;
  width: calc(100% / 3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterContainer = styled.footer`
  width: 100%;
  /* height: ${unit(100)}; */
  background-color: #f9f9f9;
  padding: ${unit(30)} 0;

  * {
    font-family: "Lato", sans-serif;
  }

  @media screen and (max-width: ${mobilePoint}) {
    padding: ${munit(30)} ${munit(15)};
  }
`;

export const FooterMessage = styled.p`
  text-align: center;
  font-size: ${unit(35)};
  font-weight: 500;
  margin-bottom: ${unit(20)};
  font-family: "Times New Roman" !important;

  @media screen and (max-width: ${mobilePoint}) {
    font-size: ${munit(25)};
    margin-bottom: ${munit(20)};
  }
`;

export const FooterTextBox = styled.div`
  /* width: ${unit(450)}; */
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${unit(10)};
  width: ${unit(1080)};
  /* flex-direction: column; */
  font-size: ${unit(15)};

  & > div {
    display: flex;
    gap: ${unit(10)};
    flex-wrap: wrap;

    div {
      display: flex;
    }
  }

  label {
    font-weight: 500;
    /* margin-right: ${unit(8)}; */
    color: #888;
  }
  p {
    color: #888;
  }

  @media screen and (max-width: ${mobilePoint}) {
    gap: ${munit(10)};
    font-size: ${munit(14)};
    width: 100%;
    justify-content: flex-start;

    & > div {
      display: flex;
      gap: ${munit(6)};
      flex-wrap: wrap;
    }
  }
`;

export const Copyright = styled.div`
  display: flex;
  justify-content: center;
  color: #888;
  margin-top: ${unit(10)};

  @media screen and (max-width: ${mobilePoint}) {
    margin-top: ${munit(10)};
    font-size: ${munit(14)};
  }
`;
