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

export interface BloodDetails{
  id: number;
  name:string;
  remarks: string;
}

export interface DesignationsDetails {
  id: number;
  code: string;
  name: string;
  remarks: string;
}

export interface ResignationDetails{
  id: number;
  name: string;
  remarks: string;
}

export interface SignInResponseType {
  token: string;
}
