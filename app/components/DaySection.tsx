import React from 'react';
import { TimeSlot } from './TimeSlot';
import { TimeSlot as TimeSlotType } from '../types/timetable';

interface DaySectionProps {
  day: string;
  timeSlots: TimeSlotType[];
}

export const DaySection: React.FC<DaySectionProps> = ({ day, timeSlots }) => {
  const headingId = `${day}-heading`;

  return (
    <section className="day-section" aria-labelledby={headingId} id={day}>
      <h2 className="day-header" id={headingId}>
        {day.toUpperCase()}
      </h2>
      <ul className="time-slots" role="list">
        {timeSlots.map((slot, index) => (
          <li key={`${day}-${index}`}>
            <TimeSlot timeSlot={slot} />
          </li>
        ))}
      </ul>
    </section>
  );
};