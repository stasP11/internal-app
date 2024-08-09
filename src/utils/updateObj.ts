export default function updateObj(original: any, updates: any) {
  for (let key in updates) {
    if (key in original) {
      original[key] = updates[key];
    }
  }

  return original;
}
