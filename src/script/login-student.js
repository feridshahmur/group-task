import axios from "axios";

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Formanın təkrar göndərilməsini əngəlləyirik

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    // Serverdən bütün tələbə məlumatlarını alırıq (GET sorğusu)
    const response = await axios.get('http://localhost:8000/students');
    const users = response.data;

    let userFound = false;  // Tapılan istifadəçi olub-olmamasını yoxlayırıq

    // İstifadəçi məlumatlarını yoxlayırıq
    users.forEach(user => {
      if (user.email === email && user.password === password) {
        userFound = true; // İstifadəçi tapılıb
        window.location.replace('index.html'); // Daxil olduqda index.html-ə yönləndiririk
      }
    });

    // Əgər istifadəçi tapılmadısa, bildiriş göstəririk
    if (!userFound) {
      alert("Yanlış email və ya şifrə.");
    }

  } catch (error) {
    console.error('Serverə sorğu göndərərkən xəta baş verdi:', error);
    alert("Xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.");
  }
});
