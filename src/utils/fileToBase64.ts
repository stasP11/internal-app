const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Directly resolve with the result of readAsDataURL, which includes the correct format
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Reads file as Base64 data URL
    });
  };

export default fileToBase64;