import React, { createContext, useContext, useState } from "react";

interface DistributorDetailsContextType {
  distributorToShowId: number | null;
  setDistributorToShowId: (id: number | null) => void;
}

const DistributorDetailsContext =
  createContext<DistributorDetailsContextType | null>(null);

export function useDistributorToShow() {
  const context = useContext(DistributorDetailsContext);
  if (context === null) {
    throw new Error(
      "useDistributorDetails must be used within a DistributorDetailsProvider"
    );
  }
  return context;
}

export const DistributorDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [distributorToShowId, setDistributorToShowId] = useState<number | null>(
    null
  );

  return (
    <DistributorDetailsContext.Provider
      value={{
        distributorToShowId: distributorToShowId,
        setDistributorToShowId: setDistributorToShowId,
      }}
    >
      {children}
    </DistributorDetailsContext.Provider>
  );
};
