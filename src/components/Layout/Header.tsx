import React, { FC, useState, useEffect } from "react";
import * as S from "./styled";
import Image from "next/image";

const Header: FC = () => {
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
    <S.HeaderContainer>
      <nav>
        <S.Logo>
          <Image
            src="/images/korea_oneday.png"
            width={100}
            height={100}
            alt="main_img"
          />
        </S.Logo>
        <S.RightHeader className="pcFlex">
          <Image
            src="/images/korea_building5.png"
            width={100}
            height={100}
            alt="main_img"
          />
        </S.RightHeader>
      </nav>
    </S.HeaderContainer>
  );
};

export default Header;
