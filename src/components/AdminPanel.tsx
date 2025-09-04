import React, { useState } from 'react';
import { Settings, Save, X, Plus, Trash2 } from 'lucide-react';
import { TimetableData, TimeSlot } from '../types/timetable';

interface AdminPanelProps {
  timetableData: TimetableData;
  onUpdate: (data: TimetableData) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ timetableData, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editData, setEditData] = useState<TimetableData>(timetableData);

  const ADMIN_PASSWORD = 'gimpa2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setEditData(timetableData);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsOpen(false);
    setIsAuthenticated(false);
    setPassword('');
    alert('Timetable updated successfully!');
  };

  const addTimeSlot = (day: 'friday' | 'saturday') => {
    const newSlot: TimeSlot = {
      time: '',
      venue: '',
      courseCode: '',
      courseName: '',
      group: '',
      lecturer: '',
      period: day === 'saturday' ? 'morning' : undefined
    };
    
    setEditData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: [...prev.schedule[day], newSlot]
      }
    }));
  };

  const removeTimeSlot = (day: 'friday' | 'saturday', index: number) => {
    setEditData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: prev.schedule[day].filter((_, i) => i !== index)
      }
    }));
  };

  const updateTimeSlot = (day: 'friday' | 'saturday', index: number, field: keyof TimeSlot, value: string) => {
    setEditData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: prev.schedule[day].map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const updateUniversity = (field: keyof TimetableData['university'], value: string) => {
    setEditData(prev => ({
      ...prev,
      university: {
        ...prev.university,
        [field]: value
      }
    }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="admin-toggle"
        title="Admin Panel"
      >
        <Settings size={20} />
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-overlay">
        <div className="admin-modal">
          <div className="admin-header">
            <h3>Admin Login</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
              autoFocus
            />
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay">
      <div className="admin-modal large">
        <div className="admin-header">
          <h3>Timetable Admin Panel</h3>
          <div className="admin-actions">
            <button onClick={handleSave} className="save-btn">
              <Save size={16} />
              Save Changes
            </button>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="admin-content">
          <div className="university-section">
            <h4>University Information</h4>
            <div className="form-grid">
              <input
                type="text"
                placeholder="University Name"
                value={editData.university.name}
                onChange={(e) => updateUniversity('name', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Short Name"
                value={editData.university.shortName}
                onChange={(e) => updateUniversity('shortName', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Faculty"
                value={editData.university.faculty}
                onChange={(e) => updateUniversity('faculty', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Program"
                value={editData.university.program}
                onChange={(e) => updateUniversity('program', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="schedule-section">
            <div className="day-admin">
              <div className="day-admin-header">
                <h4>Friday Schedule</h4>
                <button onClick={() => addTimeSlot('friday')} className="add-btn">
                  <Plus size={16} />
                  Add Slot
                </button>
              </div>
              {editData.schedule.friday.map((slot, index) => (
                <div key={index} className="slot-editor">
                  <div className="slot-form">
                    <input
                      type="text"
                      placeholder="Time"
                      value={slot.time}
                      onChange={(e) => updateTimeSlot('friday', index, 'time', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Venue"
                      value={slot.venue}
                      onChange={(e) => updateTimeSlot('friday', index, 'venue', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Course Code"
                      value={slot.courseCode}
                      onChange={(e) => updateTimeSlot('friday', index, 'courseCode', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={slot.courseName}
                      onChange={(e) => updateTimeSlot('friday', index, 'courseName', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Group"
                      value={slot.group}
                      onChange={(e) => updateTimeSlot('friday', index, 'group', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Lecturer"
                      value={slot.lecturer}
                      onChange={(e) => updateTimeSlot('friday', index, 'lecturer', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <button
                    onClick={() => removeTimeSlot('friday', index)}
                    className="remove-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="day-admin">
              <div className="day-admin-header">
                <h4>Saturday Schedule</h4>
                <button onClick={() => addTimeSlot('saturday')} className="add-btn">
                  <Plus size={16} />
                  Add Slot
                </button>
              </div>
              {editData.schedule.saturday.map((slot, index) => (
                <div key={index} className="slot-editor">
                  <div className="slot-form">
                    <input
                      type="text"
                      placeholder="Time"
                      value={slot.time}
                      onChange={(e) => updateTimeSlot('saturday', index, 'time', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Venue"
                      value={slot.venue}
                      onChange={(e) => updateTimeSlot('saturday', index, 'venue', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Course Code"
                      value={slot.courseCode}
                      onChange={(e) => updateTimeSlot('saturday', index, 'courseCode', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={slot.courseName}
                      onChange={(e) => updateTimeSlot('saturday', index, 'courseName', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Group"
                      value={slot.group}
                      onChange={(e) => updateTimeSlot('saturday', index, 'group', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Lecturer"
                      value={slot.lecturer}
                      onChange={(e) => updateTimeSlot('saturday', index, 'lecturer', e.target.value)}
                      className="form-input"
                    />
                    <select
                      value={slot.period || ''}
                      onChange={(e) => updateTimeSlot('saturday', index, 'period', e.target.value)}
                      className="form-input"
                    >
                      <option value="">Select Period</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeTimeSlot('saturday', index)}
                    className="remove-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};