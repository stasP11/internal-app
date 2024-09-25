export function findSameProducts(
  arr: any,
  sameProductsData: any,
  materialNumber: any,
  uom: string,
  productName: string,
  id: any,
  matchedMaterialNumber: any
) {
  const result: any = {};
  if (
    !sameProductsData.some((obj: any) => obj.material_number === materialNumber)
  ) {
    result.matchedMaterialNumber = matchedMaterialNumber;
    result.material_number = materialNumber;
    result.products = [];
    result.isOpenForUse = true;
    arr.forEach((obj: any) => {
      if (
        obj?.material_number === materialNumber &&
        obj?.product_name === productName &&
        obj?.uom === uom &&
        obj?.id !== id
      ) {
        result?.products.push(obj);
      }
    });
  }

  return result;
}
