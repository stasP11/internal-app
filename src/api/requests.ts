import {
  DistributorsList,
  DataQualityReports,
  mockReportDetails,
} from "./mockData";


export async function aproveReport(reportName: any){
  const url = `https://csci-api-skthk6k3ja-ew.a.run.app/move_file_back_to_flow?filename=${reportName}.csv`;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: ''
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Assuming the response is JSON
    console.log('Response:', data);
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
}

export async function deleteReportRow(filename:any, row_number:any) {
  try {
    const url = `https://csci-api-skthk6k3ja-ew.a.run.app/delete_row_from_exception_file?filename=${filename}.csv&row_number=${row_number}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: ''
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Assuming the response is JSON
    return {status: 200, ...data};
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
}


export async function getDistributorsList() {
  try {
    const response = await fetch(
      "https://csci-api-skthk6k3ja-ew.a.run.app/get_distributors_list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed (e.g., authorization)
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Assuming the response is JSON, you can use response.json()
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function getDataQualityReports() {
  try {
    const response = await fetch(
      "https://csci-api-skthk6k3ja-ew.a.run.app/get_file_details_with_status",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed (e.g., authorization)
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Assuming the response is JSON, you can use response.json()
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function fackegetDistributorsList() {
  return await DistributorsList;
}

export async function fackegetDataQualityReports() {
  return await DataQualityReports;
}

export function fakeGetReportData() {
  return mockReportDetails;
}
