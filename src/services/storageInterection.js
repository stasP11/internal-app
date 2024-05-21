export function getFromLocalStorage(key) {
    try {
      const serializedObject = localStorage.getItem(key);
      if (serializedObject === null) {
        // If the key doesn't exist in local storage, return null
        return null;
      }
      // Parse the serialized object into JavaScript object
      return JSON.parse(serializedObject);
    } catch (error) {
      // Handle errors, such as parsing errors
      console.error('Error retrieving object from local storage:', error);
      return null;
    }
  }
  

export function saveToLocalStorage(key, object) {
    try {
      // Serialize the object into a JSON string
      const serializedObject = JSON.stringify(object);
      // Store the serialized object in local storage
      localStorage.setItem(key, serializedObject);
      console.log(`Object saved to local storage with key '${key}'`);
    } catch (error) {
      // Handle errors, such as serialization errors
      console.error('Error saving object to local storage:', error);
    }
  }
  