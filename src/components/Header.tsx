import React from 'react';
import { University } from '../types/timetable';

interface HeaderProps {
  university: University;
}

export const Header: React.FC<HeaderProps> = ({ university }) => {
  return (
    <header className="header">
      <div className="university-logo">
        <img 
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" 
          alt="GIMPA Logo" 
          className="logo-image"
        />
      </div>
      <div className="header-content">
        <h1>{university.name}</h1>
        <h2>{university.faculty}</h2>
        <h3>{university.program}</h3>
        <div className="academic-info">
          <span className="level">{university.level}</span>
          <span className="semester">Academic Timetable</span>
        </div>
      </div>
    </header>
  );
};