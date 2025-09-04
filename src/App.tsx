import React, { useState, useEffect } from 'react';
import { Timetable } from './components/Timetable';
import { AdminPanel } from './components/AdminPanel';
import { TimetableData } from './types/timetable';
import timetableJson from './data/timetable.json';
import './style.css';

function App() {
  const [timetableData, setTimetableData] = useState<TimetableData>(timetableJson);

  const handleTimetableUpdate = (newData: TimetableData) => {
    setTimetableData(newData);
    // In a real app, this would save to a backend
    localStorage.setItem('gimpa-timetable', JSON.stringify(newData));
  };

  useEffect(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('gimpa-timetable');
    if (saved) {
      try {
        setTimetableData(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved timetable:', error);
      }
    }
  }, []);

  return (
    <div className="app">
      <Timetable data={timetableData} />
      <AdminPanel 
        timetableData={timetableData} 
        onUpdate={handleTimetableUpdate} 
      />
    </div>
  );
}

export default App;