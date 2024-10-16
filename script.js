// Sample Data
const headAdmin = { username: "headAdmin", password: "headAdminPass" };

const teacherAdmins = {};
const students = {};
const notices = [];
const attendanceReports = {};
const timetables = {};

// Track the last assigned student ID
let lastAssignedStudentId = 0;

// Head Admin Login Functionality
document.getElementById('headAdminLoginBtn').addEventListener('click', () => {
    const name = document.getElementById('headAdminLoginName').value;
    const password = document.getElementById('headAdminLoginPassword').value;

    if (name === headAdmin.username && password === headAdmin.password) {
        document.querySelector('.head-admin-section').style.display = 'block';
        document.querySelector('.teacher-admin-section').style.display = 'none';
        document.querySelector('.info-section').style.display = 'none';
        document.querySelector('.notices-section').style.display = 'none';
        document.querySelector('.attendance-section').style.display = 'none';
        document.querySelector('.timetable-section').style.display = 'none';
        document.getElementById('headAdminLoginMessage').innerText = "Welcome Head Admin!";
        refreshAdminList();
    } else {
        document.getElementById('headAdminLoginMessage').innerText = "Invalid head admin login.";
    }
});

// Teacher Admin Login Functionality
document.getElementById('adminLoginBtn').addEventListener('click', () => {
    const name = document.getElementById('adminLoginName').value;
    const password = document.getElementById('adminLoginPassword').value;

    if (teacherAdmins[name] && teacherAdmins[name].password === password) {
        document.querySelector('.teacher-admin-section').style.display = 'block';
        document.querySelector('.head-admin-section').style.display = 'none';
        document.querySelector('.info-section').style.display = 'none';
        document.querySelector('.notices-section').style.display = 'none';
        document.querySelector('.attendance-section').style.display = 'none';
        document.querySelector('.timetable-section').style.display = 'none';
        document.getElementById('adminLoginMessage').innerText = "Welcome " + name + "!";
        refreshStudentList(teacherAdmins[name].assignedClass);
    } else {
        document.getElementById('adminLoginMessage').innerText = "Invalid admin login.";
    }
});

// Student Login Functionality
document.getElementById('studentLoginBtn').addEventListener('click', () => {
    const studentId = document.getElementById('studentLoginId').value;
    const password = document.getElementById('studentLoginPassword').value;

    for (const classNum in students) {
        for (const studentName in students[classNum]) {
            const student = students[classNum][studentName];
            if (student.id === studentId && student.password === password) {
                document.querySelector('.info-section').style.display = 'block';
                document.getElementById('studentInfoDisplay').innerText = `${studentName}: ${student.info}, Parent: ${student.parent}`;
                document.querySelector('.attendance-section').style.display = 'block';
                document.querySelector('.timetable-section').style.display = 'block';
                document.querySelector('.notices-section').style.display = 'block';
                document.getElementById('studentLoginMessage').innerText = "Login successful!";
                break;
            }
        }
    }
});

// Add Teacher Admin Functionality
document.getElementById('addAdminBtn').addEventListener('click', () => {
    const newAdminName = document.getElementById('newAdminName').value;
    const newAdminPassword = document.getElementById('newAdminPassword').value;
    const assignedClass = document.getElementById('assignClass').value;

    if (newAdminName && newAdminPassword && assignedClass) {
        teacherAdmins[newAdminName] = {
            password: newAdminPassword,
            assignedClass: assignedClass,
        };

        document.getElementById('adminMessage').innerText = `${newAdminName} added successfully! ID: ${newAdminName}, Password: ${newAdminPassword}`;
        refreshAdminList();

        // Clear input fields
        document.getElementById('newAdminName').value = '';
        document.getElementById('newAdminPassword').value = '';
        document.getElementById('assignClass').value = '';
    } else {
        document.getElementById('adminMessage').innerText = "Please fill all fields.";
    }
});

// Add Student Functionality
document.getElementById('addStudentBtn').addEventListener('click', () => {
    const name = document.getElementById('studentName').value;
    const info = document.getElementById('studentInfo').value;
    const parent = document.getElementById('parentInfo').value;
    const assignedClass = document.querySelector('.teacher-admin-section h2').innerText.split(" ")[0]; // Get current admin class

    if (name && info && parent) {
        lastAssignedStudentId++;
        students[assignedClass] = students[assignedClass] || {};
        students[assignedClass][name] = {
            info,
            parent,
            id: `student${lastAssignedStudentId}`,
            password: `studentpass${lastAssignedStudentId}`
        };

        document.getElementById('studentMessage').innerText = `${name} added successfully! ID: student${lastAssignedStudentId}, Password: studentpass${lastAssignedStudentId}`;
        refreshStudentList(assignedClass);

        // Clear input fields
        document.getElementById('studentName').value = '';
        document.getElementById('studentInfo').value = '';
        document.getElementById('parentInfo').value = '';
    } else {
        document.getElementById('studentMessage').innerText = "Please fill all fields.";
    }
});

// Refresh Students List
function refreshStudentList(classNum) {
    const studentsListAdmin = document.getElementById('studentsListAdmin');
    studentsListAdmin.innerHTML = '';
    for (const studentName in students[classNum]) {
        studentsListAdmin.innerHTML += `<li>${studentName} (ID: ${students[classNum][studentName].id})</li>`;
    }
}

// Refresh Admin List
function refreshAdminList() {
    const adminList = document.getElementById('adminList');
    adminList.innerHTML = '';
    for (const admin in teacherAdmins) {
        adminList.innerHTML += `<li>${admin}</li>`;
    }
}

// Add Notice Functionality
document.getElementById('addNoticeBtn').addEventListener('click', () => {
    const noticeText = document.getElementById('noticeText').value;
    if (noticeText) {
        notices.push(noticeText);
        document.getElementById('noticeMessage').innerText = "Notice added successfully!";
        document.getElementById('noticeText').value = '';
        refreshNotices();
    } else {
        document.getElementById('noticeMessage').innerText = "Please enter a notice.";
    }
});

// Refresh Notices
function refreshNotices() {
    const noticesListAdmin = document.getElementById('noticesListAdmin');
    noticesListAdmin.innerHTML = '';
    
    notices.forEach((notice, index) => {
        noticesListAdmin.innerHTML += `<li>${notice} <button onclick="deleteNotice(${index})">Delete</button></li>`;
    });
}

// Delete Notice Functionality
function deleteNotice(index) {
    if (index > -1) {
        notices.splice(index, 1);
        refreshNotices();
        document.getElementById('noticeMessage').innerText = "Notice deleted successfully!";
    }
}

// Submit Attendance Functionality
document.getElementById('submitAttendanceBtn').addEventListener('click', () => {
    const date = document.getElementById('attendanceDate').value;
    const studentName = document.getElementById('attendanceStudentName').value;
    const status = document.getElementById('attendanceStatus').value;

    if (date && studentName && status) {
        if (!attendanceReports[date]) attendanceReports[date] = {};
        attendanceReports[date][studentName] = status;
        document.getElementById('attendanceMessage').innerText = "Attendance submitted successfully!";
        
        // Clear input fields
        document.getElementById('attendanceDate').value = '';
        document.getElementById('attendanceStudentName').value = '';
        document.getElementById('attendanceStatus').value = '';
    } else {
        document.getElementById('attendanceMessage').innerText = "Please fill all fields.";
    }
});

// Get Attendance Report Functionality
document.getElementById('getAttendanceBtn').addEventListener('click', () => {
    const date = document.getElementById('attendanceReportDate').value;

    if (date && attendanceReports[date]) {
        let report = '';
        for (const studentName in attendanceReports[date]) {
            report += `Student Name: ${studentName}, Status: ${attendanceReports[date][studentName]}<br>`;
        }
        document.getElementById('attendanceReport').innerHTML = report;
    } else {
        document.getElementById('attendanceReport').innerText = "No attendance recorded for this date.";
    }
});

// Set Timetable Functionality
document.getElementById('setTimetableBtn').addEventListener('click', () => {
    const timetableInput = document.getElementById('timetableInput').value;
    const assignedClass = document.querySelector('.teacher-admin-section h2').innerText.split(" ")[0]; // Get current admin class

    if (timetableInput) {
        if (!timetables[assignedClass]) timetables[assignedClass] = [];
        timetables[assignedClass].push(timetableInput);
        document.getElementById('timetableMessage').innerText = "Timetable updated successfully!";
        
        // Clear input field
        document.getElementById('timetableInput').value = '';
    } else {
        document.getElementById('timetableMessage').innerText = "Please enter a timetable.";
    }
});

// Get Timetable Functionality
document.getElementById('getTimetableBtn').addEventListener('click', () => {
    const assignedClass = document.querySelector('.teacher-admin-section h2').innerText.split(" ")[0]; // Get current admin class
    const timetableDisplay = document.getElementById('timetable');

    if (timetables[assignedClass]) {
        let timetableStr = '';
        timetables[assignedClass].forEach((subject) => {
            timetableStr += `${subject}<br>`;
        });
        timetableDisplay.innerHTML = timetableStr;
    } else {
        timetableDisplay.innerText = "No timetable available for this class.";
    }
});

// Get Notices for Student
document.getElementById('getNoticesBtn').addEventListener('click', () => {
    const noticesList = document.getElementById('noticesList');
    noticesList.innerHTML = '';
    notices.forEach((notice) => {
        noticesList.innerHTML += `<li>${notice}</li>`;
    });
});
