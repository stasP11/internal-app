import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';



function useExtractUrlValue(){
  const location = useLocation();
  const routeName = location.pathname.split('/').pop();
  
  return routeName
};


