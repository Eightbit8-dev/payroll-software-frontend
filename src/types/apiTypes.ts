export interface signInRequestType {
  username: string;
  password: string;
}

export interface SignInResponseType {
  token: string;
}
export interface BranchDetails {
  id: number;

  code: string;
  companyId: number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  remarks: string;
  active?: boolean;
}

export interface BloodDetails {
  id: number;
  name: string;
  remarks: string;
}

export interface DesignationsDetails {
  id: number;
  code: string;
  name: string;
  remarks: string;
}

export interface ResignationDetails {
  id: number;
  name: string;
  remarks: string;
}

export interface DepartmentDetails {
  id: number;
  name: string;
  remarks: string;
  code: string;
  active?: boolean;
}

export interface AttendanceDetails {
  id: number;
  name: string;
  code: string;
  factor: number;
  mastertypeId: number;
  carryForward: boolean;
  remarks: string;
}

export interface PermissionDetails {
  id?: number;
  name: string;
  mastertypeId: number;
  mastertypeName?: string;
  startTime: string;
  endTime: string;
  remarks: string;
}

export interface LoanDetails {
  id: number;
  name: string;
  maxEligibilityAmount: number;
  loanRepaymentPeriod: number;
  employeeWorkedMonths: number;
  remarks: string;
}

export interface AllowanceDetails {
  id: number;
  name: string;
  mastertypeId: number;
  percent: number;
  on: string;
  remarks: string;
}

export interface ShiftDetails {
  id: number;
  name: string;
  type: string;
  present: string;
  lop: string;
  earlyGoing: string;
  lateComing: string;
  isNight: string;
  shiftIn: string;
  shiftOut: string;
  lunchOut: string;
  lunchIn: string;
}
