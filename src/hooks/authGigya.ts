import { useEffect, useState } from "react";

const useAuthGigya = ({onStatusChange}: any) => {

    useEffect(()=>{
        console.log('useAuthGigya is worked')
        if(window.gigya){
            console.log('gigya script is loaded')
            window.gigya.accounts.verifyLogin({
                callback: (response: any) =>{
                    onStatusChange(response?.status)
                } 
            });
        }

    })
}

export default useAuthGigya