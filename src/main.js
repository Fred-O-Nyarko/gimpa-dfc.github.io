import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="timetable-container">
    <header class="header">
      <div class="university-logo">
        <div class="logo-placeholder">GIMPA</div>
      </div>
      <div class="header-content">
        <h1>Ghana Institute of Management and Public Administration</h1>
        <h2>School of Technology and Social Sciences</h2>
        <h3>MSc Digital Forensics and Cyber Security</h3>
        <div class="academic-info">
          <span class="level">Level 700</span>
          <span class="semester">Academic Timetable</span>
        </div>
      </div>
    </header>

    <main class="timetable-main">
      <div class="day-section">
        <h2 class="day-header">FRIDAY</h2>
        <div class="time-slots">
          <div class="time-slot">
            <div class="time-info">
              <span class="time">5:30pm - 8:30pm</span>
              <span class="venue">PSMTP Auditorium</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT701B</div>
              <div class="course-name">Organisational Study in IS</div>
              <div class="group-lecturer">
                <span class="group">DFC Group A</span>
                <span class="lecturer">Dr. Joseph Budu</span>
              </div>
            </div>
          </div>
          <div class="time-slot">
            <div class="time-info">
              <span class="time">5:30pm - 8:30pm</span>
              <span class="venue">L5 SF3</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT721B</div>
              <div class="course-name">Cybercrime and Risk Management</div>
              <div class="group-lecturer">
                <span class="group">DFC Group B</span>
                <span class="lecturer">Mr. Kenneth Adu Amanfo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="day-section">
        <h2 class="day-header">SATURDAY</h2>
        <div class="time-slots">
          <div class="time-slot morning">
            <div class="time-info">
              <span class="time">8:30am - 11:30am</span>
              <span class="venue">L2 SF3</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT722B</div>
              <div class="course-name">Digital Forensics</div>
              <div class="group-lecturer">
                <span class="group">DFC Group B</span>
                <span class="lecturer">Prof. Winfred Yaokumah</span>
              </div>
            </div>
          </div>
          <div class="time-slot morning">
            <div class="time-info">
              <span class="time">8:30am - 11:30am</span>
              <span class="venue">L2 SF3</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT723B</div>
              <div class="course-name">Advanced Data Communication and Computer Networks</div>
              <div class="group-lecturer">
                <span class="group">DFC Group A</span>
                <span class="lecturer">Dr. Eric Kuada</span>
              </div>
            </div>
          </div>
          
          <div class="time-slot afternoon">
            <div class="time-info">
              <span class="time">12:30pm - 3:30pm</span>
              <span class="venue">L2 SF3</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT722B</div>
              <div class="course-name">Digital Forensics</div>
              <div class="group-lecturer">
                <span class="group">DFC Group A</span>
                <span class="lecturer">Prof. Winfred Yaokumah</span>
              </div>
            </div>
          </div>
          <div class="time-slot afternoon">
            <div class="time-info">
              <span class="time">12:30pm - 3:30pm</span>
              <span class="venue">L2 SF3</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT701B</div>
              <div class="course-name">Organisational Study in IS</div>
              <div class="group-lecturer">
                <span class="group">DFC Group B</span>
                <span class="lecturer">Dr. Joseph Budu</span>
              </div>
            </div>
          </div>

          <div class="time-slot evening">
            <div class="time-info">
              <span class="time">4:30pm - 7:30pm</span>
              <span class="venue">L2 SF3</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT723B</div>
              <div class="course-name">Advanced Data Communication and Computer Networks</div>
              <div class="group-lecturer">
                <span class="group">DFC Group B</span>
                <span class="lecturer">Dr. Eric Kuada</span>
              </div>
            </div>
          </div>
          <div class="time-slot evening">
            <div class="time-info">
              <span class="time">4:30pm - 7:30pm</span>
              <span class="venue">L2 SF3</span>
            </div>
            <div class="course-details">
              <div class="course-code">SOT721B</div>
              <div class="course-name">Cybercrime and Risk Management</div>
              <div class="group-lecturer">
                <span class="group">DFC Group A</span>
                <span class="lecturer">Mr. Kenneth Adu Amanfo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="timetable-footer">
      <p>Generated for Academic Year 2024/2025</p>
    </footer>
  </div>
`