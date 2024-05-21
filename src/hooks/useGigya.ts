import { useEffect, useState } from "react";

/*
Function that loads the gigya web SDK scripts:
-gigya JS
-gigya OIDC
See 'set up & activate your proxy page' https://help.sap.com/docs/SAP_CUSTOMER_DATA_CLOUD/8b8d6fffe113457094a17701f63e3d6a/4167d5cb70b21014bbc5a10ce4041860.html
*/
const useGigya = () => {
  const [jsLoaded, setJsLoaded] = useState<boolean>(false);

  
  useEffect(() => {

      const gigyaScript = document.createElement("script");

      if (gigyaScript) {
        gigyaScript.onload = () => setJsLoaded(true);
        gigyaScript.src = `${
          process.env.REACT_APP_GIGYA_PATH as string
        }?apikey=${process.env.REACT_APP_GIGYA_API_KEY as string}`;
        gigyaScript.async = true;



        const urls = {
          loginURL: process.env.REACT_APP_GIGYA_LOGIN_URL,
        //  errorURL: process.env.REACT_APP_GIGYA_ERROR_URL,
        };

        document.head.appendChild(gigyaScript);
      }

  }, []);

  return jsLoaded;
};

export default useGigya;
