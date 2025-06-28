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
  active?: boolean;
}

export interface SignInResponseType {
  token: string;
}

export interface DepartmentDetails {
  id: number;
  name: string;
  remarks: string;
  code: string;
  active?: boolean;
}
