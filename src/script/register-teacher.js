import axios from "axios"; // Axios importunu unutmuyun

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Formanın təkrar göndərilməsinin qarşısını alırıq

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const imagefile = document.getElementById("imagefile").files[0];
    const fullnameRegex = /^[A-Za-z\s]+$/;

    if (!fullnameRegex.test(fullname)) {
      alert("Ad və Soyad yalnız hərflər və boşluqlardan ibarət olmalıdır.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Xahiş edirik, düzgün bir email daxil edin.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Şifrə ən azı 8 simvoldan ibarət olmalı, böyük və kiçik hərf, həmçinin rəqəm daxil edilməlidir."
      );
      return;
    }

    let userData = {
      name: fullname,
      email: email,
      password: password,
      profileImage: null,
      islogged: false,
    };

    if (imagefile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        userData.profileImage = reader.result; // Profile şəkilini base64 formatında alırıq
        sendDataToApi(userData); // Verilənləri API-yə göndəririk
      };
      reader.readAsDataURL(imagefile);
    } else {
      sendDataToApi(userData); // Şəkil yoxdursa, sadəcə məlumatları göndəririk
    }

    // Verilənləri API-ə göndərmək üçün funksiyanı yazırıq
    async function sendDataToApi(userData) {
      try {
        // API-yə POST sorğusu göndəririk
        const response = await axios.post('http://localhost:8000/teachers', userData);

        console.log(response.data);
        console.log('Geri qaytarılan məlumat:', response.data);
        alert('Qeydiyyat uğurla tamamlandı!');
        
        // Uğurlu qeydiyyat sonrası login səhifəsinə yönləndiririk
        window.location.href = 'login-teacher.html';
      } catch (error) {
        console.error('Qeydiyyat zamanı xəta baş verdi:', error);
        alert('Qeydiyyat prosesi zamanı xəta baş verdi.');
      }
    }
  });
