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
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include', // Include cookies for session management
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setEditData(timetableData);
        setPassword(''); // Clear password from memory
      } else {
        const errorData = await response.json();
        setLoginError(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await onUpdate(editData);
      setIsOpen(false);
      await handleLogout();
      alert('Timetable updated successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    setIsAuthenticated(false);
    setPassword('');
    setLoginError('');
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
            {loginError && (
              <div className="error-message" style={{
                color: '#dc3545',
                marginBottom: '10px',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {loginError}
              </div>
            )}
            <div className="form-field">
              <label htmlFor="admin-password">Admin Password</label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                autoFocus
                disabled={isLoading}
              />
            </div>
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
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
          {/* <div className="university-section">
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
          </div> */}

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
                    <div className="form-field">
                      <label htmlFor={`friday-${index}-time`}>Time</label>
                      <input
                        id={`friday-${index}-time`}
                        type="text"
                        placeholder="Time"
                        value={slot.time}
                        onChange={(e) => updateTimeSlot('friday', index, 'time', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`friday-${index}-venue`}>Venue</label>
                      <input
                        id={`friday-${index}-venue`}
                        type="text"
                        placeholder="Venue"
                        value={slot.venue}
                        onChange={(e) => updateTimeSlot('friday', index, 'venue', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`friday-${index}-courseCode`}>Course Code</label>
                      <input
                        id={`friday-${index}-courseCode`}
                        type="text"
                        placeholder="Course Code"
                        value={slot.courseCode}
                        onChange={(e) => updateTimeSlot('friday', index, 'courseCode', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`friday-${index}-courseName`}>Course Name</label>
                      <input
                        id={`friday-${index}-courseName`}
                        type="text"
                        placeholder="Course Name"
                        value={slot.courseName}
                        onChange={(e) => updateTimeSlot('friday', index, 'courseName', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`friday-${index}-group`}>Group</label>
                      <input
                        id={`friday-${index}-group`}
                        type="text"
                        placeholder="Group"
                        value={slot.group}
                        onChange={(e) => updateTimeSlot('friday', index, 'group', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`friday-${index}-lecturer`}>Lecturer</label>
                      <input
                        id={`friday-${index}-lecturer`}
                        type="text"
                        placeholder="Lecturer"
                        value={slot.lecturer}
                        onChange={(e) => updateTimeSlot('friday', index, 'lecturer', e.target.value)}
                        className="form-input"
                      />
                    </div>
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
                    <div className="form-field">
                      <label htmlFor={`saturday-${index}-time`}>Time</label>
                      <input
                        id={`saturday-${index}-time`}
                        type="text"
                        placeholder="Time"
                        value={slot.time}
                        onChange={(e) => updateTimeSlot('saturday', index, 'time', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`saturday-${index}-venue`}>Venue</label>
                      <input
                        id={`saturday-${index}-venue`}
                        type="text"
                        placeholder="Venue"
                        value={slot.venue}
                        onChange={(e) => updateTimeSlot('saturday', index, 'venue', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`saturday-${index}-courseCode`}>Course Code</label>
                      <input
                        id={`saturday-${index}-courseCode`}
                        type="text"
                        placeholder="Course Code"
                        value={slot.courseCode}
                        onChange={(e) => updateTimeSlot('saturday', index, 'courseCode', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`saturday-${index}-courseName`}>Course Name</label>
                      <input
                        id={`saturday-${index}-courseName`}
                        type="text"
                        placeholder="Course Name"
                        value={slot.courseName}
                        onChange={(e) => updateTimeSlot('saturday', index, 'courseName', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`saturday-${index}-group`}>Group</label>
                      <input
                        id={`saturday-${index}-group`}
                        type="text"
                        placeholder="Group"
                        value={slot.group}
                        onChange={(e) => updateTimeSlot('saturday', index, 'group', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`saturday-${index}-lecturer`}>Lecturer</label>
                      <input
                        id={`saturday-${index}-lecturer`}
                        type="text"
                        placeholder="Lecturer"
                        value={slot.lecturer}
                        onChange={(e) => updateTimeSlot('saturday', index, 'lecturer', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`saturday-${index}-period`}>Period</label>
                      <select
                        id={`saturday-${index}-period`}
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