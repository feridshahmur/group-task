// Modal elementlərini seçirik
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Grades düyməsinə basıldıqda modalı açırıq
openModalBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Linkin default davranışını (yəni səhifə yeniləməyi) bloklayırıq
    modal.style.display = 'flex';
});

// Modalı bağlama funksionallığı
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Modal xaricində kliklənildikdə bağlama
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});