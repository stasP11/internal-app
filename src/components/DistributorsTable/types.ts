export interface DistributorsTableProps {
  rowData: Array<DistributorRowData>;
  authResult: any;
  country: string;
}

export type DistributorRowData = {
  idx: number;
  distributorId: number;
  distributorName: [string, number];
  email: string;
  phone: string;
  injectionChannels: string;
  active: DistributorActiveStatus;
};

export type DistributorDetails = {
  distributor_id: number;
  distributor_name: string;
  active: DistributorActiveStatus;
  phone: string;
  injection_channels: string;
  country: string;
  emails: string[];
  country_code?: string;
};

export type DistributorActiveStatus = 1 | 0;
