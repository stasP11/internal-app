export function getUniqueEmails(emails: string[]) {
  return Array.from(
    new Set(emails.flatMap((emailString) => emailString.split(", ")))
  );
}
