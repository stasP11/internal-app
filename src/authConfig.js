/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

export const msalConfig = {
    auth: {
        clientId: "f6caac59-eebd-4f1c-a7bc-861487c37cfd", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/b41b72d0-4e9f-4c26-8a69-f949f367c91d", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/redirect", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
     //   clientCapabilities: ["CP1"] // this lets the resource owner know that this client is capable of handling claims challenge.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            /**
             * Below you can configure MSAL.js logs. For more information, visit:
             * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
             */
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};


export const protectedResources = {
    apiTodoList: {
        endpoint: "http://localhost:5000/api/todolist",
        scopes: {
            read: [ "api://f6caac59-eebd-4f1c-a7bc-861487c37cfd/Reports.Read" ],
            write: [ "api://f6caac59-eebd-4f1c-a7bc-861487c37cfd/Reports.ReadWrite" ]
        }
    }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes.read, ...protectedResources.apiTodoList.scopes.write]
};


