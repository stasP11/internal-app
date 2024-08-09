import removeDuplicates from "./removeDuplicates";

export default function formatDataForBackEnd(data: any): any {
  const newObj: any = {};

  // Iterate over each key in the data object
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      newObj[key] = Array.isArray(data[key])
        ? removeDuplicates(data[key])
        : data[key];
      newObj[`${key}_old`] = data[key];
    }
  }

  return newObj;
}
