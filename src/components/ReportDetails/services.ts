export function findSameProducts(
  arr: any,
  sameProductsData: any,
  materialNumber: string,
  uom: string,
  productName: string,
  id: any,
  matchedMaterialNumber: any,
  matchedMaterialName: string,
) {

  const result: any = {};

  if (
    !sameProductsData.some((obj: any) => obj.material_number === materialNumber)
  ) {
    result.matchedMaterialNumber = matchedMaterialNumber;
    result.matchedMaterialName = matchedMaterialName;
    result.material_number = materialNumber;
    result.products = [];
    result.isOpenForUse = true;
    arr.forEach((obj: any) => {


      if (
        obj?.initial_product_data.material_number === materialNumber &&
        obj?.initial_product_data.product_name === productName &&
        obj?.uom === uom &&
        obj?.id !== id &&
        obj.matched === null
      ) {
        result?.products.push(obj);
      }
    });
  }

  return result;
}
