import axios from 'axios';

document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const imagefile = document.getElementById('imagefile').files[0];
  const teacherSelect = document.getElementById('teacherSelect');
  
  // Get the selected teacher ID from the dropdown
  const selectedTeacher = teacherSelect.value;

  // Check if a teacher is selected
  if (!selectedTeacher) {
    alert('Xahiş edirik, müəllim seçin!');
    return;
  }

  const fullnameRegex = /^[A-Za-z\s]+$/;

  if (!fullnameRegex.test(fullname)) {
    alert('Ad və Soyad yalnız hərflər və boşluqlardan ibarət olmalıdır.');
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert('Xahiş edirik, düzgün bir email daxil edin.');
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      'Şifrə ən azı 8 simvoldan ibarət olmalı, böyük və kiçik hərf, həmçinin rəqəm daxil edilməlidir.'
    );
    return;
  }

  let userData = {
    name: fullname,
    email: email,
    password: password,
    profileImage: null,
    teacherId: selectedTeacher, // Use the selected teacher ID
    islogged: false,
  };

  if (imagefile) {
    const reader = new FileReader();
    reader.onloadend = function () {
      userData.profileImage = reader.result;
      sendDataToApi(userData);
    };
    reader.readAsDataURL(imagefile);
  } else {
    sendDataToApi(userData);
  }

  async function sendDataToApi(userData) {
    try {
      const response = await axios.post('http://localhost:8000/students', userData);
      console.log(response.data);
      alert('Qeydiyyat uğurla tamamlandı!');
      window.location.href = 'login-student.html';
    } catch (error) {
      console.error('Qeydiyyat zamanı xəta baş verdi:', error);
      alert('Qeydiyyat prosesi zamanı xəta baş verdi.');
    }
  }
});

// Fill the teacher dropdown with data from the server
async function loadTeachers() {
  try {
    const response = await axios.get('http://localhost:8000/teachers');
    const teachers = response.data;

    const teacherSelect = document.getElementById('teacherSelect');

    teachers.forEach(teacher => {
      const option = document.createElement('option');
      option.value = teacher.id; // Assuming the teacher object has an 'id' field
      option.textContent = teacher.name;
      teacherSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Müəllimlər məlumatlarını alarkən xəta baş verdi:', error);
  }
}

// Call the function to load teachers on page load
loadTeachers();
