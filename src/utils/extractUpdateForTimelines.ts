import isArrayOfNumbers from "./isArrayOfNumbers";
import removeDuplicates from "./removeDuplicates";

export default function extractUpdateForTimelines(
  data: any,
  analogyDictionary: any
) {
  const handledDataObject: any = {};
  const arrayOfKeys = Object.keys(data);

  function extractSelectedValueFromArray(arr: any): any[] {
    if (arr.length === 0) return arr;
    if (isArrayOfNumbers(arr)) {
      return arr;
    }
    return (arr as { selected: boolean; value: any }[])
      .filter((item) => item.selected)
      .map((item) => item.value);
  }

  arrayOfKeys.forEach((key: string) => {
    const keyValue = data[key];
    const keyValueIsArray = Array.isArray(keyValue);

    //potential error!!!
    const actualNameForBackEnd =
      key in analogyDictionary ? analogyDictionary[key] : key;

    if (keyValueIsArray && key !== "periodsSettings") {
      handledDataObject[actualNameForBackEnd] = removeDuplicates(
        extractSelectedValueFromArray(keyValue)
      );
    } else if (keyValueIsArray && key == "periodsSettings") {
      handledDataObject[actualNameForBackEnd] = keyValue.map(
        ({ startPeriod, endPeriod, startDay, dueDay }: any) => {
          return { startPeriod, endPeriod, startDay, dueDay };
        }
      );
    } else {
      handledDataObject[actualNameForBackEnd] = String(keyValue);
    }
  });

  return handledDataObject;
}
