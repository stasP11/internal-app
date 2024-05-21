type EmailType = {
    verified: never[];
    unverified: [number];
  };
  
  type DataType = {
    bc_title: string;
    bc_salutation: string;
    // Add other properties as needed
  };
  
  type RequestParamsType = {
    connectWithoutLoginBehavior: 'loginExistingUser';
    defaultRegScreenSet: 'bayer-RegistrationLogin';
    defaultMobileRegScreenSet: '';
    sessionExpiration: number;
    rememberSessionExpiration: number;
    // Add other properties as needed
  };
  
  type SessionInfoType = {
    login_token: string;
    expires_in: string;
    // Add other properties as needed
  };
  
  type UserType = {
    nickname: string;
    photoURL: string;
    thumbnailURL: string;
    birthDay: string;
    birthMonth: string;
    // Add other properties as needed
  };
  
  export type ResponseType = {
    UID: string;
    UIDSignature: string;
    apiVersion: number;
    callId: string;
    context: undefined;
    created: "2023-12-13T17:00:33.302Z";
    createdTimestamp: number;
    data: DataType;
    emails: EmailType;
    errorCode: 0;
    errorMessage: "";
    isActive: boolean;
    isRegistered: boolean;
    isVerified: boolean;
    lastLogin: "2024-01-04T18:35:42.210Z";
    lastLoginTimestamp: 1704393342;
    lastUpdated: "2023-12-13T17:00:33.632Z";
    lastUpdatedTimestamp: number;
    loginProvider: "site";
    newUser: boolean;
    oldestDataUpdated: "2023-12-13T17:00:33.302Z";
    oldestDataUpdatedTimestamp: number;
    operation: "/accounts.login";
    preferences: Record<string, unknown>; // Assuming preferences can have arbitrary properties
    profile: {
      firstName: 'Taras';
      lastName: 'Zopenko';
      email: 'bocib49847@hupoi.com';
      // Add other properties as needed
    };
    registered: "2023-12-13T17:00:33.632Z";
    registeredTimestamp: number;
    requestParams: RequestParamsType;
    sessionInfo: SessionInfoType;
    signatureTimestamp: "1704393342";
    socialProviders: "site";
    status: "OK";
    statusMessage: "";
    subscriptions: Record<string, unknown>; // Assuming subscriptions can have arbitrary properties
    time: "2024-01-04T18:35:42.270Z";
    user: UserType;
    screen: "bayer-login-nosc";
    screenSetID: "bayer-RegistrationLogin";
    source: "showScreenSet";
    // Add other properties as needed
  };

  type ProfileType = {
    firstName: string
    lastName: string
    email: string
  }
  

type GigyaAfterLoginResponseType = {
    addresses: object,
    communications: object,
    customIdentifiers: object,
    data: { bc_title: 'Bayer', bc_salutation: 'Mr.' },
    eventName: "afterSubmit",
    form: "gigya-login-form",
    instanceID: "screenSet",
    preferences: object,
    profile: ProfileType,
    response: ResponseType
    screen: "bayer-login-nosc",
    screenSetID: "bayer-RegistrationLogin",
    source: "showScreenSet",
    subscriptions: object,
    // Add other properties as needed
  };