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
        credentials: 'include', // Include session cookies
      });
      
      if (response.ok) {
        setTimetableData(newData);
      } else if (response.status === 401) {
        alert('Session expired. Please login again.');
        throw new Error('Authentication required');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update timetable');
      }
    } catch (error) {
      console.error('Error updating timetable:', error);
      throw error; // Re-throw so AdminPanel can handle it
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