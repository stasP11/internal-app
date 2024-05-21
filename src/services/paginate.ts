// Transforms an array of items [{}, {}] into a Map-like object {1: [], 2: []}

function transformForPaginate(arrayOfItems: any, itemsPerPage: number) {
  const result = new Map();
  const totalPages = Math.ceil(arrayOfItems.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const startIndex = (i - 1) * itemsPerPage;
    const endIndex = startIndex + Number(itemsPerPage);
    result.set(i, [ ...arrayOfItems.slice(startIndex, endIndex)]);
  }


  return result;
}

export default transformForPaginate