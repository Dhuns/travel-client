import React, { FC, useState, useEffect } from "react";
import * as S from "./styled";

const Footer: FC = () => {
  /**
   * States
   */

  /**
   * Queries
   */

  /**
   * Side-Effects
   */

  /**
   * Handlers
   */

  /**
   * Helpers
   */
  return (
    <S.FooterContainer>
      <S.FooterMessage>You make a wish, we make a tour!</S.FooterMessage>
      <S.FooterTextBox>
        <div>
          <label>Address : </label>
          <p>204ho, Gyeonghuigung Achim 3rd Complex, 72 Naesu-dong, Jongno-gu, Seoul, South Korea</p>
        </div>
        <div>
          <label>Email : </label>
          <p>info@onedaykorea.com</p>
        </div>

        <div>
          <div>
            <label>Office hours (weekdays) : </label>
            <p>09:30 ~ 18:30 GMT +9</p>
          </div>
          <div>
            <label>Office number : </label>
            <p>+82.70.7556.5355</p>
          </div>
          <div>
            <label>Emergency number : </label>
            <p>+82.10.2479.1242</p>
          </div>
        </div>
      </S.FooterTextBox>
      <S.Copyright>
        Copyright 2024. OnedayKorea. All rights reserved.
      </S.Copyright>
    </S.FooterContainer>
  );
};

export default Footer;
