export async function aproveReportRequest(reportName: any, handleResult: any) {
    const url = `${process.env.REACT_APP_API_PYTHON_API}/move_file_back_to_flow?filename=${reportName}.csv`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: "",
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        handleResult('is failed');
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Assuming the response is JSON
      handleResult('is approved');
      console.log("Response:", data);
    } catch (error) {
      handleResult('is failed');
      console.error("There was a problem with your fetch operation:", error);
    }
  }

export async function rejectReportRequest(reportName: any, handleResult: any) {
  // reject file api
  const url = `${process.env.REACT_APP_API_PYTHON_API}/reject_file?filename=${reportName}.csv`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: "",
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      handleResult("is failed to reject");
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Assuming the response is JSON
    handleResult("is rejected");
    console.log("Response:", data);
  } catch (error) {
    handleResult("is failed to reject");
    console.error("There was a problem with your fetch operation:", error);
  }
}
