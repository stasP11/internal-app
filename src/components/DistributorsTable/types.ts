export interface DistributorsTableProps {
  rowData: Array<DistributorRowData>;
}

export type DistributorRowData = {
  id: number;
  distributorName: [string, number];
  email: string[];
  phone: string;
  injectionChannels: string;
  active: boolean;
};

export type DistributorDetails = {
    distributor_id: number;
    distributor_name: string;
    active: number;
    phone: string;
    injection_channels: string;
    country: string;
    emails: string[];
  };