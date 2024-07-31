import React, { useEffect, useRef } from "react";
import "./PopUp.scss";

type BasePopUpProps = {
  isActive: boolean;
  children: React.ReactNode;
  id: any;
  onClosePopUp: any;
};

function BasePopUp({ isActive, children, onClosePopUp, id }: BasePopUpProps) {
  const countRef = useRef<number>(0);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      countRef.current = Number(countRef.current) + 1;

      //condition countRef.current>1 do not close the popup during the opening process
      if (event.target.id !== id && countRef.current > 1) {
        onClosePopUp();
      }
    };

    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      countRef.current = 0;
    };
  });

  return (
    <div id={id} className={`pop-up ${isActive ? "--active" : "--inactive"}`}>
      {children}
    </div>
  );
}

export default BasePopUp;
