export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IResetPayload {
  username: string;
  password: string;
  new_password: string;
}

export interface IUserProfile {
  emp_address: any;
  emp_age: any;
  emp_commission_file_no: any;
  emp_confirmation_date: any;
  emp_creation_date: any;
  emp_current_department: any;
  emp_date_of_first_employment: any;
  emp_dob: any;
  emp_email: any;
  emp_employment_date: any;
  emp_establishment_file_no: any;
  emp_firstname: any;
  emp_gender: any;
  emp_gsm_no: any;
  emp_hobbies: any;
  emp_id: any;
  emp_id_no: any;
  emp_id_type: any;
  emp_lastname: any;
  emp_leave_days: number;
  emp_local_govt_ward: any;
  emp_maiden_name: any;
  emp_marital_status: any;
  emp_middlename: any;
  emp_nationality: any;
  emp_phone: any;
  emp_place_of_birth: any;
  emp_present_posting_date: any;
  emp_present_posting_deployment: any;
  emp_professional_affiliation: any;
  emp_professional_affiliations: any;
  emp_pso_file_no: any;
  emp_religion: any;
  emp_retirement_date: any;
  emp_role: any;
  emp_state: any;
  emp_username: any;
  passport: any;
  roles: any;
  status: any;
}
