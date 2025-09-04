import React from 'react';
import { TimeSlot } from './TimeSlot';
import { TimeSlot as TimeSlotType } from '../types/timetable';

interface DaySectionProps {
  day: string;
  timeSlots: TimeSlotType[];
}

export const DaySection: React.FC<DaySectionProps> = ({ day, timeSlots }) => {
  return (
    <div className="day-section">
      <h2 className="day-header">{day.toUpperCase()}</h2>
      <div className="time-slots">
        {timeSlots.map((slot, index) => (
          <TimeSlot key={index} timeSlot={slot} />
        ))}
      </div>
    </div>
  );
};