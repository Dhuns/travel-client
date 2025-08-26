import { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";

const Home: FC = () => {
  /**
   * States
   */
  const { replace } = useRouter();

  /**
   * Queries
   */

  /**
   * Side-Effects
   */
  useEffect(() => {
    replace("/404");
  }, []);

  /**
   * Handlers
   */

  /**
   * Helpers
   */
  return <></>;
};

export default Home;
