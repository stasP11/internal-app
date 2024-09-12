export interface Distributor {
  name: string;
  code: string;
  status: "Active" | "Inactive";
  phones: string[];
  emails: string[];
}
