
const modal = document.getElementById('editModal');
const editLink = document.getElementById('editLink');
const cancelButton = document.querySelector('[onclick="closeEditModal()"]');

editLink.addEventListener('click', function (event) {
    event.preventDefault();
    modal.style.display = 'flex';
});

cancelButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
