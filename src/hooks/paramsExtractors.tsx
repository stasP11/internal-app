import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


 const useURLParamsExtractor = (setValue: any) => {
    const location = useLocation();
    const routeName = location.pathname.split('/').pop();

    useEffect(()=>{
      setValue(routeName);
    }, [location])
  }
  
  export default useURLParamsExtractor