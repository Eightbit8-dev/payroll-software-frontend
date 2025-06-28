export interface signInRequestType {
  username: string;
  password: string;
}

export interface BranchDetails {
  id: number;
  code: string;
  companyId: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  remarks: string;
}

export interface SignInResponseType {
  token: string;
}
