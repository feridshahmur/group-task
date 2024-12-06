import axios from "axios";

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Formanın təkrar göndərilməsini əngəlləyirik

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    // Serverdən bütün tələbə məlumatlarını alırıq (GET sorğusu)
    const response = await axios.get('http://localhost:8000/teachers');
    const users = response.data;

    let userFound = false;  // Tapılan istifadəçi olub-olmamasını yoxlayırıq

    // İstifadəçi məlumatlarını yoxlayırıq
    users.forEach(user => {
      if (user.email === email && user.password === password) {
        userFound = true; // İstifadəçi tapılıb
        window.location.replace('teacher-dashboard.html'); 
        user.islogged === true
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