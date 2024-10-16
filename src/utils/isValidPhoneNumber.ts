export const isValidPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.trim() === "") {
    return false;
  }
  const PHONE_REGEX = /^\+?[\d\s\-\(\)]+$/;
  return PHONE_REGEX.test(phoneNumber);
};
