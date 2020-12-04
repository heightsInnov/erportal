export const environment = {
  production: true,
  apiBaseUrl: 'https://ac911e27dd4a.ngrok.io/erportal-0.0.1/',
  loginUrl: 'secured/user/login',
  resetPasswordUrl: 'secured/user/password-reset',
  employeeUrl: {
                  createStaff: 'secured/user/create-staff',
                  createFamily: 'secured/user/insert-family',
                  createNextOfKin: 'secured/user/insert-next-of-kin',
                  createExperience: 'secured/user/insert-experience-details',
                  createEducation: 'secured/user/insert-education-details'
                },

  createHandoverNoteUrl: {
                          createHandoverNote: 'secured/handover/create-handover',
                          addVehicleMaintenance: 'secured/handover/create-vehicle-maintenance',
                          addDocumentRegister: 'secured/handover/create-document-register',
                          addBusinessContact: '',
                          addBooksCdsSoftwares: 'secured/handover/create-bcsrm',
                          addToolsandEquipment: 'secured/handover/create-tools-equipment',
                          addActivities: 'secured/handover/create-act-proj-prop',
                          getHandoverCategories: 'secured/handover/get-categories'
                         },

  getHandoverNotesUrl: 'secured/handover/get-all-handover',
  employeeProfileUrl: 'secured/user/load-user-profile',
  createActivityUrl: 'secured/activity/create-activity',
  updateActivityUrl: 'secured/activity/update-activity',
  getActivityUrl: 'secured/activity/get-user-activity',
  getActivityStatusURL: 'secured/activity/get-activity-status',
  updateActivityStatusURL: 'secured/activity/update-activity-status',
  getUnitsUrl: 'secured/get-units',
  getAllEmployeeUrl: 'secured/report/get-all-employee',
  getUploadTypesUrl: 'secured/get-upload-types',
  uploadEmployeeDocumentUrl: 'secured/user/upload-user-document',
  getEmployeeUploadsUrl: 'secured/user/'
};
