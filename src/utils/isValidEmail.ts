export const isValidEmail = (email: string) => {
  if (email.trim() === "") {
    return false;
  }
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return EMAIL_REGEX.test(email);
};
