import React from 'react';
import { TimeSlot as TimeSlotType } from '../types/timetable';

interface TimeSlotProps {
  timeSlot: TimeSlotType;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ timeSlot }) => {
  const periodClass = timeSlot.period ? timeSlot.period : '';

  return (
    <article className={`time-slot ${periodClass}`} aria-label={`${timeSlot.courseCode} ${timeSlot.courseName}`}>
      <div className="time-info">
        <time className="time" dateTime={timeSlot.time}>{timeSlot.time}</time>
        <span className="venue" aria-label="Venue">{timeSlot.venue}</span>
      </div>
      <div className="course-details">
        <div className="course-code" aria-label="Course code">{timeSlot.courseCode}</div>
        <h3 className="course-name">{timeSlot.courseName}</h3>
        <div className="group-lecturer">
          <span className="group" aria-label="Group">{timeSlot.group}</span>
          <span className="lecturer" aria-label="Lecturer">{timeSlot.lecturer}</span>
        </div>
      </div>
    </article>
  );
};