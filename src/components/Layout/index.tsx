import React, { FC, useState, useEffect, ReactNode } from "react";
import { unit } from "@shared/utils/base";
import Header from "./Header";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
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
    <>
      <Header />
      <main style={{ minHeight: `calc(100vh - ${unit(200)})` }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
