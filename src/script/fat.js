// Menu toggle funksiyası
document.getElementById("menu-btn").addEventListener("click", function () {
    const navLinks = document.getElementById("nav-links");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none"; // Qapalı vəziyyət
    } else {
        navLinks.style.display = "flex"; // Açıq vəziyyət
    }
});
