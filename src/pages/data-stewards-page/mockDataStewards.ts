export type DataSteward = {
  id: number;
  name: string;
  active: DataStewardActiveStatus;
  email: string;
};

export type DataStewardActiveStatus = 1 | 0;

export const mockDataStewards: DataSteward[] = [
  {
    id: 4876201,
    name: "Data steward name 1",
    active: 1,
    email: "steward1@email.com",
  },
  {
    id: 4876202,
    name: "Data steward name 2",
    active: 1,
    email: "steward2@email.com",
  },
  {
    id: 4876203,
    name: "Data steward name 3",
    active: 1,
    email: "steward3@email.com",
  },
  {
    id: 4876204,
    name: "Data steward name 4",
    active: 1,
    email: "steward4@email.com",
  },
  {
    id: 4876205,
    name: "Data steward name 5",
    active: 1,
    email: "steward5@email.com",
  },
  {
    id: 4876206,
    name: "Data steward name 6",
    active: 1,
    email: "steward6@email.com",
  },
  {
    id: 4876207,
    name: "Data steward name 7",
    active: 0,
    email: "steward7@email.com",
  },
  {
    id: 4876208,
    name: "Data steward name 8",
    active: 0,
    email: "steward8@email.com",
  },
  {
    id: 4876209,
    name: "Data steward name 9",
    active: 1,
    email: "steward9@email.com",
  },
  {
    id: 4876210,
    name: "Data steward name 10",
    active: 0,
    email: "steward10@email.com",
  },
  {
    id: 4876211,
    name: "Data steward name 11",
    active: 1,
    email: "steward11@email.com",
  },
  {
    id: 4876212,
    name: "Data steward name 12",
    active: 1,
    email: "steward12@email.com",
  },
  {
    id: 4876213,
    name: "Data steward name 13",
    active: 1,
    email: "steward13@email.com",
  },
  {
    id: 4876214,
    name: "Data steward name 14",
    active: 1,
    email: "steward14@email.com",
  },
  {
    id: 4876215,
    name: "Data steward name 15",
    active: 1,
    email: "steward15@email.com",
  },
];
