import { useCallback, useLayoutEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { logout } from 'config/axios-config';
import { useSessionStorage } from 'hooks/useSessionStorage';
import { isEmptyObject } from 'utils/isEmptyObject';
import { noop } from 'utils/noop';
import { timeout } from 'utils/timeout';

import { IS_REDIRECT_KEY, LOGIN_START_SCREEN } from 'constants/additional';
import { AppRoutes, GigyaRoutes } from 'constants/app-routes';

import { Container } from './login.styles';

const { LOGIN, REGISTRATION } = GigyaRoutes;

const TIME_DELAY_FOR_PAGE_REDIRECT = 300000; // 5 min delay

const useGigyaSetup = () => {
    const navigate = useNavigate();
    const [searchParams, setParams] = useSearchParams();

    const [getGigyaCache, removeGigyaCache] = useSessionStorage(IS_REDIRECT_KEY);
    const [getStartScreenFromStore, setStartScreenToStore] = useSessionStorage(LOGIN_START_SCREEN);

    const [startScreen, setStartScreen] = useState(null);

    const gigyaCache = getGigyaCache();
    const screen = searchParams.get('screen');

    useLayoutEffect(() => {
        let startScreen;
        const isRegistrationScreen = getStartScreenFromStore() === REGISTRATION;

        if (screen === 'registration') {
            removeGigyaCache();
            logout(false);
            setStartScreenToStore(GigyaRoutes.REGISTRATION);
            startScreen = REGISTRATION;
        } else {
            isRegistrationScreen && setParams({ screen: 'registration' });
            startScreen = isRegistrationScreen ? REGISTRATION : LOGIN;
        }

        setStartScreen(startScreen);
    }, []);

    /*
     * Promises are needed to avoid infinite redirect, bc we don't have access to gigya to controls redirect urls.
     * The solution based on storing a flag in session storage (IS_REDIRECT_KEY = 'gigyaCache`) and checking it.
     */


    const firstLoginHandler = useCallback(
        (eventObj) => {
            if (startScreen) {
                const { hostname } = window.location;
                const timestamp = new Date().toISOString(); // please convert the timestamp to UTC if your server is not in UTC

                const apps = eventObj.data.bc_accessApplications || []; // if application list empty, create new object

                let isNewApp = true;

                // is app new or already in the apps list?
                apps.forEach((appItem, idx, appList) => {
                    const appInfo = JSON.parse(appItem);

                    // search for app in the array
                    if (appInfo.hostname === hostname) {
                        isNewApp = false;
                        // app is already in array, actualize timestamp in lastLogin
                        appInfo.lastLogin = timestamp;
                        appList[idx] = JSON.stringify(appInfo);
                    }
                });

                if (isNewApp) {
                    const loginInfo = {
                        hostname,
                        firstLogin: timestamp,
                        lastLogin: timestamp,
                    };

                    // app is new -> new entry in array
                    apps.push(JSON.stringify(loginInfo));
                }

                // update apps list on server
                window.gigya.accounts.setAccountInfo({
                    data: {
                        bc_accessApplications: apps,
                    },
                });

                // Redirect to proxy
                window.location.href = window.gigya.utils.URL.addParamsToURL('proxy.html', {
                    mode: 'afterLogin',
                });
            }
        },
        [startScreen]
    );

    useLayoutEffect(() => {
        if (startScreen) {
            Promise.resolve()
                .then(() => {
                    const hasLoginRedirectKey = gigyaCache && gigyaCache instanceof Object && !isEmptyObject(gigyaCache);

                    if (!hasLoginRedirectKey) {
                        throw Error('No redirect!');
                    }
                })
                /*
                 * Login process (after press login button)
                 */
                .then(() => {
                    window.gigya.accounts.addEventHandlers({
                        onLogin: firstLoginHandler,
                    });
                })
                .then(() => {
                    window.gigya.socialize.addEventHandlers({
                        onLogin: () => {
                            // Redirect to proxy
                            window.location.href = window.gigya.utils.URL.addParamsToURL('proxy.html', {
                                mode: 'afterLogin',
                            });
                        },
                    });
                })
                .then(() => {
                    window.gigya.accounts.showScreenSet({
                        screenSet: 'bayer-RegistrationLogin',
                        startScreen,
                        containerID: 'container',
                        lang: 'uk',
                    });
                })
                .catch(noop);
        }
    }, [startScreen]);

    // this is need for correct opening of registration screen at first start Login, when gigya send request for getting gigyaCache
    useLayoutEffect(() => {
        if (startScreen) {
            (async () => {
                if (!gigyaCache) {
                    await timeout(5000);
                }
                setStartScreenToStore(LOGIN);
            })();
        }
    }, [startScreen]);

    useLayoutEffect(() => {
        const timerIdList = [];

        (async () => {
            await timeout(TIME_DELAY_FOR_PAGE_REDIRECT, timerIdList);
            removeGigyaCache();
            navigate(AppRoutes.ROOT);
        })();

        return () => {
            removeGigyaCache();
            timerIdList.forEach(clearTimeout);
        };
    }, []);
};

export const Login = () => {
    useGigyaSetup();

    return <Container id='container' />;
};
