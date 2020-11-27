export interface IEmployeePayload {
  emp_local_govt_ward: string;
  emp_id_no: string;
  emp_nationality: string;
  emp_employment_date: Date;
  emp_date_of_first_employment: Date;
  emp_username: string;
  emp_gsm_no: string;
  emp_gender: string;
  emp_religion: string;
  emp_firstname: string;
  emp_state: string;
  emp_email: string;
  emp_middlename: string;
  emp_role: string;
  emp_id_type: string;
  emp_confirmation_date: Date;
  emp_phone: string;
  emp_present_posting_deployment: string;
  emp_address: string;
  emp_pso_file_no: string;
  emp_dob: Date;
  emp_commission_file_no: string;
  emp_professional_affiliaions: string;
  emp_lastname: string;
  emp_present_posting_date: Date;
  emp_current_department: string;
  emp_establisment_file_no: string;
  emp_place_of_birth: string;
  emp_marital_status: string;
  emp_hobbies: string;
}


export interface IFamilyPayload {
  spouse_name?: string;
  child_name?: string;
}

export interface INextOfKinPayload {
  nok_address: string;
  nok_phone: string;
  nok_name: string;
  nok_relationship: string;
}

export interface IWorkExperiencePayload {
  exp_designation: string;
  exp_responsibility: string;
  exp_organization: string;
  exp_end_date: Date;
  exp_start_date: Date;
}

export interface IEducationDataPayload{
    edu_category: string;
    edu_institution: string;
    edu_start_date: Date;
    edu_degree: string;
    edu_cgpa: string;
    edu_end_date: Date;
}
