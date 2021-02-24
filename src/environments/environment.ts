// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://20ac8f04547e.ngrok.io/erportal-0.0.1/',
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
                          addBusinessContact: 'secured/handover/create-business-contact',
                          addBooksCdsSoftwares: 'secured/handover/create-bcsrm',
                          addToolsandEquipment: 'secured/handover/create-tools-equipment',
                          addActivities: 'secured/handover/create-act-proj-prop',
                          getHandoverCategories: 'secured/handover/get-categories'
                         },
  reportsUrl: {
                activityReport: 'secured/report/get-activity-report',
                leaveReport: 'secured/report/get-leave-report',
                handoverReport: 'secured/report/get-handover-report',
                employeeReport: 'secured/report/get-employee-report'
              },

  edocumentsUrl: {
                  getEntry: 'secured/edocument/get-entry',
                  createEntry: 'secured/edocument/register-entry',
                  assignEntry: 'secured/edocument/assign-entry',
                  deleteEntry: 'secured/edocument/delete-entry',
                  editEntry: 'secured/edocument/edit-entry',
                  hrDocuments: 'secured/edocument/get-hr-entry',
                  editAssignment: 'secured/edocument/edit-assignment'
                },
  dashboardUrl: 'secured/get-dashboard',
  getHandoverNotesUrl: 'secured/handover/get-all-handover',
  getHandoverDetailsUrl: 'secured/handover/get-handover-details',
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
  getEmployeeUploadsUrl: 'secured/user/get-user-document',
  getDegreesUrl: 'secured/get-degrees',
  getLeaveUrl: 'secured/leave/get-leaves',
  createLeaveUrl: 'secured/leave/create-leave'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
