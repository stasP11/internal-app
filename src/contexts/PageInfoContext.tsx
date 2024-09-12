import React, { useState, createContext, ReactNode } from "react";

type PageInfoType = {
  button?: ReactNode;
  headerContent?: string;
  selectedPage?: string;
  selectedTab?: string;
};

type PageInfoContextType = {
  pageInfo?: PageInfoType;
  setPageInfo?: React.Dispatch<React.SetStateAction<PageInfoType>> | any;
};

export const PageInfoContext = createContext<PageInfoContextType>({});

export function PageInfoContextWrapper({ children }: any) {
  const [pageInfo, setPageInfo] = useState<PageInfoType>({});
  return (
    <PageInfoContext.Provider value={{ pageInfo, setPageInfo }}>
      {children}
    </PageInfoContext.Provider>
  );
}
