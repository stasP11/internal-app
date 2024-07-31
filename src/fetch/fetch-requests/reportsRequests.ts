export async function aproveReport(reportName: any, handleResult: any) {
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
        handleResult(response, `some issue with an attempt to approve ${reportName}`);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      handleResult(response, `${reportName} was successfully approved`);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
}

export async function rejectReport(reportName: any, handleResult: any) {
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
        handleResult( `some issue with an attempt to reject ${reportName}`);
        throw new Error("Network response was not ok");
      }
      await response.json(); // Assuming the response is JSON
      handleResult(response, `${reportName} was successfully rejected`);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
}