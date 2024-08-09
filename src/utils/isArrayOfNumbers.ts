export default function isArrayOfNumbers(arr: any[]): boolean {
  return (
    Array.isArray(arr) && arr.every((element) => typeof element === "number")
  );
}
