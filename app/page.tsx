'use client';

import React, { useState, useEffect } from 'react';
import { Timetable } from './components/Timetable';
import { AdminPanel } from './components/AdminPanel';
import { TimetableData } from './types/timetable';

export default function Home() {
  const [timetableData, setTimetableData] = useState<TimetableData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTimetable = async () => {
    try {
      const response = await fetch('/api/timetable');
      const data = await response.json();
      setTimetableData(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimetableUpdate = async (newData: TimetableData) => {
    try {
      const response = await fetch('/api/timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      
      if (response.ok) {
        setTimetableData(newData);
      } else {
        console.error('Failed to update timetable');
      }
    } catch (error) {
      console.error('Error updating timetable:', error);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  if (loading) {
    return <div className="app">Loading...</div>;
  }

  if (!timetableData) {
    return <div className="app">Error loading timetable data</div>;
  }

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