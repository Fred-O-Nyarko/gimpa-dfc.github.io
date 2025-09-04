export interface University {
  name: string;
  shortName: string;
  faculty: string;
  program: string;
  level: string;
}

export interface TimeSlot {
  time: string;
  venue: string;
  courseCode: string;
  courseName: string;
  group: string;
  lecturer: string;
  period?: 'morning' | 'afternoon' | 'evening';
}

export interface Schedule {
  friday: TimeSlot[];
  saturday: TimeSlot[];
}

export interface TimetableData {
  university: University;
  schedule: Schedule;
}