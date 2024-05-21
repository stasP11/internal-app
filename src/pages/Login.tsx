import React, { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "./login-styles";

function useGigyaSetup() {
  function firstLoginHandler( eventObj:any ) {
    var application = window.location.hostname;
    var date = new Date();
    var apps = eventObj.data.bc_accessApplications;
    var json_obj;
    var timestamp = date.toISOString(); // please convert the timestamp to UTC if your server is not in UTC
    if (!apps) {
        // if application list empty, create new json object
        json_obj = {"hostname": application, "firstLogin": timestamp, "lastLogin": timestamp};
        apps = [JSON.stringify(json_obj)];
    } else {
        var isNewApp = true;
        var appIndex:any;
        // is app new or already in the apps list?
        for (var i = 0; i < apps.length; i++) {
            // search for app in the array
            var host = JSON.parse(apps[i]).hostname;
            if (host == application) {
                isNewApp = false;
                appIndex = i;
                break;
            }
        }
        if (isNewApp) {
            // app is new -> new entry in array
            json_obj = {"hostname": application, "firstLogin": timestamp, "lastLogin": timestamp};
            apps.push(JSON.stringify(json_obj));
        } else {
            // app is already in array, actualize timestamp in lastLogin
            json_obj = JSON.parse(apps[appIndex]);
            json_obj.lastLogin = timestamp;
            apps[appIndex] = JSON.stringify(json_obj);
        }
    }
    // update apps list on server
    window.gigya.accounts.setAccountInfo({ data: {"bc_accessApplications": apps } });
}

  function redirectToProxy() {
    var url = window.gigya.utils.URL.addParamsToURL("proxy.html", {
      mode: "afterLogin",
    });
    window.location.href = url;
  }


  window.gigya.accounts.addEventHandlers({
    onLogin: firstLoginHandler,
});

  window.gigya.socialize.addEventHandlers({
    onLogin: function () {
      redirectToProxy();
    },
  });
  window.gigya.accounts.showScreenSet({
    screenSet: "Default-RegistrationLogin",
    containerID: "container",
    sessionExpiration: "14400", // 4 hours
  });
}

const LoginPage = () => {
  useGigyaSetup();

  return <Container id="container" />;
};

export default LoginPage;

//window.gigya.accounts.addEventHandlers
