import { addNewData } from "../services/api";

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

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
      reader.onloadend =  function () {
        userData.profileImage = reader.result;
        sendDataToApi(userData);
      };
      reader.readAsDataURL(imagefile);
    } else {
      sendDataToApi(userData);
    }

    async function sendDataToApi(userData) {
      try {
        const response = await addNewData("students", userData);
        console.log(response.data);
        console.log('Geri qaytarılan məlumat:', response.data);
        alert('Qeydiyyat uğurla tamamlandı!');
        window.location.href = 'login-student.html';
      } catch (error) {
        console.error('Qeydiyyat zamanı xəta baş verdi:', error);
        alert('Qeydiyyat prosesi zamanı xəta baş verdi.');
      }
    }
  });
