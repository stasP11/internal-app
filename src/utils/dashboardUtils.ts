export function hasOnlyMissings(arr: any) {
  // Check if all elements in the array are "MISSING"
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "MISSING") {
      return false; // Return false if any element is not "MISSING"
    }
  }
  return true; // Return true if all elements are "MISSING"
}

function isAllPropertiesEquel(array: any, value: any) {
  let isEquel = true;
  array.forEach((element: any) => {
    if (element !== value) {
      isEquel = false;
    }
  });

  return isEquel;
}

function isAllPropertiesNotEquel(array: any, value: any) {
  let isNotEquel = true;
  array.forEach((element: any) => {
    if (element == value) {
      isNotEquel = false;
    }
  });

  return isNotEquel;
}

export function fullyReportedDistr(arr: any) {
  const reportsStatuses: any = [];

  arr.forEach((obj: any) => {
    if (isAllPropertiesNotEquel(obj?.widget_status, "MISSING")) {
      reportsStatuses.push(obj);
    }
  });

  return reportsStatuses.length;
}

export function fullyNotReportedDistr(arr: any) {
  const reportsStatuses = [];
  arr.forEach((obj: any) => {
    if (isAllPropertiesEquel(obj?.widget_status, "MISSING")) {
      reportsStatuses.push(obj);
    }
  });

  return reportsStatuses.length;
}

export function partiallyReportedDistr(arr: any) {
  return arr.length - fullyNotReportedDistr(arr) - fullyReportedDistr(arr);
}
