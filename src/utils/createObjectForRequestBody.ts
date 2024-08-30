export function createObjectForRequestBody(oldObj: any, newObj: any): any {
  const result: any = { ...newObj };

  Object.keys(oldObj).forEach((key) => {
    if (key !== "idx" && key !== "idx_old") {
      const oldKey = `${key}_old`;
      result[oldKey] = oldObj[key];
    }
  });

  const { idx, idx_old, ...filteredResult } = result;
  return filteredResult;
}
