import axios from "axios";

function fetchStudentData() {
    axios.get('https://json-server-deploy-delta.vercel.app/students')
        .then(function (response) {
            displayStudentData(response.data[0]);
        })
        .catch(function (error) {
            console.error("Tələbə məlumatları yüklənərkən xəta baş verdi:", error);
        });
}

function displayStudentData(student) {
    document.getElementById('studentId').textContent = student.id;
    document.getElementById('studentFullname').textContent = student.fullName;
    document.getElementById('studentEmail').textContent = student.email;
    document.getElementById('studentUsername').textContent = student.username;
    document.getElementById('studentTeacherId').textContent = student.teacherId;

    const gradesList = document.getElementById('gradesList');
    gradesList.innerHTML = '';

    student.grades.forEach(grade => {
        const li = document.createElement('li');
        li.textContent = `Task ID: ${grade.taskId}, Grade: ${grade.grade}`;
        gradesList.appendChild(li);
    });
}

window.onload = fetchStudentData;
//////
// Edit modalını açmaq üçün funksiyanı yazırıq
const editLink = document.getElementById('editLink');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeEditModalButton = document.querySelector('.close');

editLink.addEventListener('click', () => {
    // Modalı açmaq
    editModal.style.display = 'flex';

    // Formu əvvəlki tələbə məlumatları ilə doldurmaq
    const fullname = document.getElementById('studentFullname').textContent;
    const email = document.getElementById('studentEmail').textContent;

    // Formdakı inputlara dəyərləri yazırıq
    document.getElementById('editFullname').value = fullname;
    document.getElementById('editEmail').value = email;
});

// Modalı bağlamaq üçün funksiyanı yazırıq
closeEditModalButton.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Edit formu göndərildikdə dəyişiklikləri serverə göndəririk
editForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Sayfanın yenilənməsinin qarşısını alırıq

    const updatedFullname = document.getElementById('editFullname').value;
    const updatedEmail = document.getElementById('editEmail').value;

    // API-ə dəyişiklikləri göndəririk
    axios.put('https://json-server-deploy-delta.vercel.app/students/1', {
        fullName: updatedFullname,
        email: updatedEmail
    })
        .then(function (response) {
            // Dəyişiklikləri uğurla göndərdikdən sonra tələbə məlumatlarını yeniləyirik
            displayStudentData(response.data);
            editModal.style.display = 'none'; // Modalı bağlayırıq
        })
        .catch(function (error) {
            console.error("Xəta baş verdi:", error);
        });
});

// function fetchStudentData() {
//     axios.get('https://json-server-deploy-delta.vercel.app/students/1')
//         .then(function (response) {
//             console.log(response.data); // API-dən gələn məlumatları konsolda yoxla
//             displayStudentData(response.data[0]); // Tələbənin məlumatlarını göstər
//         })
//         .catch(function (error) {
//             console.error("Tələbə məlumatları yüklənərkən xəta baş verdi:", error);
//         });
// }
