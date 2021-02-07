export interface IRegisterEntryPayload {
  edoc_doc_ref: string;
  edoc_doc_name: string;
  edoc_received_by: number;
  file_name: string;
  image_byte: string;
  edoc_date_received: Date;
  edoc_doc_desc: string;
  edoc_doc_title: string;
  edoc_receiving_dept: string;
  edoc_receiving_unit: string;
}

export interface IEditEntryPayload {
  edoc_id: number;
  edoc_doc_ref: string;
  edoc_doc_title: string;
  edoc_doc_name: string;
  edoc_received_by: number;
  edoc_date_received: any;
  edoc_doc_desc: string;
  edoc_receiving_dept: string;
  edoc_receiving_unit: string;
}

export interface IEditAssignmentPayload {
  edas_id: number;
  edas_present_unit: string;
  edas_comment: string;
  edas_assigned_to: string;
}

export interface INewAssignmentPayload {
  edas_edoc_ref: string;
  edas_present_unit: string;
  edas_comment: string;
  edas_assigned_to: number;
  edas_assigned_by: number;
  image_byte?: string;
  image_file_name?: string;
}
