 // Mobile menu functionality
 const mobileMenuButton = document.querySelector('.mobile-menu-button');
 const sidebar = document.querySelector('.sidebar');
 const overlay = document.querySelector('.overlay');

 function toggleMobileMenu() {
     sidebar.classList.toggle('translate-x-0');
     overlay.classList.toggle('hidden');
     setTimeout(() => overlay.classList.toggle('opacity-0'), 0);
     document.body.style.overflow = sidebar.classList.contains('translate-x-0') ? 'hidden' : '';
 }

 mobileMenuButton.addEventListener('click', toggleMobileMenu);
 overlay.addEventListener('click', toggleMobileMenu);

 // Close mobile menu on window resize if open
 window.addEventListener('resize', () => {
     if (window.innerWidth >= 1024 && sidebar.classList.contains('translate-x-0')) {
         toggleMobileMenu();
     }
 });

 // Notification animation
 const notificationIcon = document.querySelector('.material-icons-outlined:nth-child(2)');
 setInterval(() => {
     notificationIcon.classList.add('scale-110');
     setTimeout(() => notificationIcon.classList.remove('scale-110'), 200);
 }, 5000);