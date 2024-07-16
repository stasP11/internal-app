import "./DefaultLayout.scss";
import React, { useState, useEffect } from 'react';
import Header from "components/header/Header";
import Sidebar from "components/sidebar/Sidebar";
import { useLocation } from 'react-router-dom';
import iconTimelines from "../../icons/timelines/NavNotificationLine.svg";
// import {SuccessAlert, ErrorAlert} from "./"

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';



function DefaultLayout({ children, userProfile }: any) {
    const location = useLocation();    
    const [page, setPage]= useState('dashboard');

    useEffect(()=>{
      const { pathname } = location;
      const pageName = pathname.slice(1, pathname.length);
      setPage(pageName.split('/')[0]);
    }, [location]);
    

  return (
    <div className="default-layout">
        <Header headerValue={page} userProfile={userProfile}  />
        <Sidebar onPageChoose={(boardName: any)=>setPage(boardName)} userProfile={userProfile}  activePage={page}/>
      <main>
        <>{children}</>
        </main>
    </div>
  );
}

export default DefaultLayout;



