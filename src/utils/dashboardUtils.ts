export function hasOnlyMissings(arr: any) {
  // Check if all elements in the array are "MISSING"
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "MISSING") {
      return false; // Return false if any element is not "MISSING"
    }
  }
  return true; // Return true if all elements are "MISSING"
}

export function hasOnlyNotMissings(arr: any) {
  // Check if all elements in the array are "MISSING"
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "MISSING") {
      return true; // Return false if any element is not "MISSING"
    }
  }
  return false; // Return true if all elements are "MISSING"
}
