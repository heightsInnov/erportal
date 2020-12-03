export interface IHandoverNote {
  resignee_name: string;
  resignee_address: string;
  resignee_phone: string,
  handover_effective_date: string;
  handover_reason: string;
  handover_witness: string;
  takeover_name: string;
}

export interface IHandoverActivites {
  followup_staff_id: string;
  subject: string;
  followup_req: string,
  expected_comp_date: string;
  expected_outcome: string;
  status: string;
}

export interface IDocumentRegister {
  sub_category: string;
  document_owner: string;
  date_created: string;
  title: string;
  file_directory_name: string;
  reference_number: string;
  file_hard_copy_loc: string;
}

export interface IBusinessContacts {
  subcat: string;
  contact_phone: string;
  name: string;
  company_or_department: string;
  designation: string;
  office_address: string;
  // relationship: string;
  contact_email: string;
}

export interface IToolsAndEquipment {
  condition: string;
  item: string;
  no_of_units: string;
  location: string;
  type: string;
}

// export interface IBooksCdsSoftwares {

// }

export interface IVehicleMaintenace {
  driver_name: string;
  vehicle_number: string;
  vehicle_type: string;
  status: string;
}
