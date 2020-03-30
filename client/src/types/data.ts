export type UserData = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
};

export type FundingDataRecord = {
  debtor_name: string;
  invoice_number: string;
  invoice_date: Date;
  days_due: number;
  po_number: string;
  amount: number;
  additional_details: string;
};

export type FundingsData = {
  records: FundingDataRecord[];
};
