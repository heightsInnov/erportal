export const environment = {
  production: true,
  apiBaseUrl: 'https://a69488b31db9.ngrok.io/erportal-0.0.1/',
  loginUrl: 'secured/user/login',
  resetPasswordUrl: 'secured/user/password-reset',
  employeeUrl: {
                  createStaff: 'secured/user/create-staff',
                  createFamily: 'secured/user/insert-family',
                  createNextOfKin: 'secured/user/insert-next-of-kin',
                  createExperience: 'secured/user/insert-experience-details',
                  createEducation: 'secured/user/insert-education-details'
                },
  employeeProfileUrl: 'secured/user/load-user-profile',
  createActivityUrl: 'secured/activity/create-activity',
  updateActivityUrl: 'secured/activity/update-activity',
  getActivityUrl: 'secured/activity/get-user-activity',
  getActivityStatusURL: 'secured/activity/get-activity-status',
  updateActivityStatusURL: 'secured/activity/update-activity-status',
  getUnitsUrl: 'secured/get-units',
  getHandoverNotesUrl: 'secured/handover/get-all-handover/3',
  getAllEmployeeUrl: 'secured/report/get-all-employee',
  getUploadTypesUrl: 'secured/get-upload-types',
  uploadEmployeeDocumentUrl: 'secured/user/upload-user-document',
  getEmployeeUploadsUrl: 'secured/user/'
};
