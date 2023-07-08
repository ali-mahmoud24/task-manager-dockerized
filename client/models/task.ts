export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

interface Task {
  _id: string;
  title: string;
  status: string;
  timeSpent: Time;
}

export default Task;
