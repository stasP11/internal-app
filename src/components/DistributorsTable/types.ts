export type DistributorActiveStatus = 1 | 0;

export type DistributorType = {
  distributor_id: number;
  distributor_name: string;
  active: DistributorActiveStatus;
  phone: string;
  injection_channels: string;
  country: string;
  emails: string[];
  country_code: string;
  distributor_type: string;
  email_name: string;
  email_active: number;
};

export type DistributorTypeWithIndex = DistributorType & {
  idx: number;
};

export type DistributorWithPhoneArray = Omit<DistributorType, "phone"> & {
  phone: string[];
};

export type EditedDistributor = Omit<DistributorWithPhoneArray, "emails"> & {
  emails: (string | null)[];
};
