async function updateDistributorActiveStatus(data: any){
    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_distributor_list_metadata`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
  
    try{
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log('success')
      }
    }catch(error){
      console.log('fail')
    }
  
  }

  export default updateDistributorActiveStatus