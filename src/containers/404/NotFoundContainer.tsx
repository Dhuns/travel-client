import React, { FC, useState, useEffect } from "react";
import * as S from "./styled";
import Image from "next/image";

const NotFoundContainer: FC = () => {
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
    <S.NotFoundBox>
      <S.ImgFigure>
        <Image
          src="/images/404.jpeg"
          alt="not found"
          width={200}
          height={100}
        />
      </S.ImgFigure>
    </S.NotFoundBox>
  );
};

export default NotFoundContainer;
