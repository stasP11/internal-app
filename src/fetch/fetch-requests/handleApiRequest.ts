import defaultFetchRequest from "fetch/fetch-requests/defaultFetch";

export interface FetchParams {
    authResult: {
      accessToken: string;
    };
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    data?: Record<string, any>;
  }
  
export const handleApiRequest = async (
    fetchParams: FetchParams,
    setUpdateLoaded: (value: boolean) => void,
    setNewAlert: (alert: any) => void,
    successMessage: string,
    errorMessage: string,
    mutateAfterSuccessFn?: any,
  ) => {
    setUpdateLoaded(true);
    try {
      const response: any = await defaultFetchRequest(fetchParams);
  
      if (response.ok) {
        // added delay until back-end will be fixed
        setTimeout( async ()=>{
          await mutateAfterSuccessFn();
          setUpdateLoaded(false);
          setNewAlert({ alertType: 'success', text: successMessage });
        }, 2000)
      } else {
        setUpdateLoaded(false);
        setNewAlert({ alertType: 'error', text: errorMessage });
      }
    } catch (error) {
      setUpdateLoaded(false);
      setNewAlert({ alertType: 'error', text: errorMessage });
    }
  };
