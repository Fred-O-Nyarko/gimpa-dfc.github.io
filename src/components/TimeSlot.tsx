import React from 'react';
import { TimeSlot as TimeSlotType } from '../types/timetable';

interface TimeSlotProps {
  timeSlot: TimeSlotType;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ timeSlot }) => {
  const periodClass = timeSlot.period ? timeSlot.period : '';
  
  return (
    <div className={`time-slot ${periodClass}`}>
      <div className="time-info">
        <span className="time">{timeSlot.time}</span>
        <span className="venue">{timeSlot.venue}</span>
      </div>
      <div className="course-details">
        <div className="course-code">{timeSlot.courseCode}</div>
        <div className="course-name">{timeSlot.courseName}</div>
        <div className="group-lecturer">
          <span className="group">{timeSlot.group}</span>
          <span className="lecturer">{timeSlot.lecturer}</span>
        </div>
      </div>
    </div>
  );
};