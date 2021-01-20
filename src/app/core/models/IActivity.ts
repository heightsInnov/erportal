export interface ICreateActivity {
  unit: string;
  activity: string;
  objectives: string;
  remarks: string;
}

export interface IUpdateActivity {
  unit: string;
  activity: string;
  objectives: string;
  remarks: string;
  status?: string;
  activityId: string;
}
