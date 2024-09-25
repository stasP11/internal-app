type FetchParamsType = {
    authResult: {
      accessToken: string;
    };
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    data?: Record<string, any>; // Assuming data is a key-value object
  };


const defaultFetchRequest = async ({authResult, method, url, data}: FetchParamsType) => {
    if (authResult?.accessToken) {
      const headers = new Headers();
      const bearer = `Bearer ${authResult?.accessToken}`;
  
      headers.append("Authorization", bearer);
  
      // If it's a GET request and data is provided, add data as query parameters
      if (method === 'GET' && data) {
        url += '?' + new URLSearchParams(data);
      }
  
      let options: any = {
        method: method,
        headers: headers,
      };
  
      // If it's not a GET request and data is provided, add data to the body
      if (method !== 'GET' && data) {
        options.body = JSON.stringify(data);
        headers.append("Content-Type", "application/json");
      }
  
      const response = await fetch(url, options);
      return response;
    }
};

export default defaultFetchRequest;