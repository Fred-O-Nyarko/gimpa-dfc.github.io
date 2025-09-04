import React from 'react';
import { Header } from './Header';
import { DaySection } from './DaySection';
import { TimetableData } from '../types/timetable';

interface TimetableProps {
  data: TimetableData;
}

export const Timetable: React.FC<TimetableProps> = ({ data }) => {
  return (
    <div className="timetable-container">
      <Header university={data.university} />

      <main className="timetable-main">
        <DaySection day="friday" timeSlots={data.schedule.friday} />
        <DaySection day="saturday" timeSlots={data.schedule.saturday} />
      </main>

      <footer className="timetable-footer">
        <p>Generated for Academic Year 2025/2026</p>
      </footer>
    </div>
  );
};