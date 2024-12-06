//imports
import BASE_URL from "../constants/api.js";
import { endpoints } from "../constants/api.js";
import { getAllData,getDataById,deleteDataById,addNewData,editDataById } from "../services/api/index.js";
import axios, { Axios } from "axios";

//responsive and other shits
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

function toggleMobileMenu() {
    sidebar.classList.toggle('translate-x-0');
    sidebar.classList.toggle('z-40')
    // overlay.classList.toggle('hidden');
    // setTimeout(() => overlay.classList.toggle('opacity-0'), 0);
    // document.body.style.overflow = sidebar.classList.contains('translate-x-0') ? 'hidden' : '';
}

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);

    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && sidebar.classList.contains('translate-x-0')) {
        toggleMobileMenu();
    }
});

        
const notificationIcon = document.querySelector('.material-icons-outlined:nth-child(2)');
    setInterval(() => {
    notificationIcon.classList.add('scale-110');
    setTimeout(() => notificationIcon.classList.remove('scale-110'), 200);
}, 5000);

// task section

const taskLists = document.querySelector('.all-tasks')
const taskList = document.querySelector('.tasks')
async function getAllTasksandStudents() {
    const task = await getAllData('tasks')
    const student = await getAllData('students')
    drawCards(task.data,student.data)
    drawAllTasks(task.data,student.data)
}

function drawCards(array1,array2){
    taskLists.innerHTML=''
    array1.forEach(task => {
        const assignments = task.assignments
        if (assignments && assignments.length>0) {
            assignments.forEach(a=>{
                const student = array2.find(s=> s.id === a.studentId)
                if (student) {
                    const gradeObj = student.grades.find(grade => grade.taskId === task.id)
                    const grade = gradeObj.grade
                    if (grade<=9) {
                        taskLists.innerHTML+=`
                        <div class="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" data-id="${task.id}">
                        <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1>
                        <span class="material-icons-outlined mr-2">task</span>
                        <p class="w-48 trubance">${task.topic}</p>
                        <span class="ml-10 text-green-700">${grade}/100</span>
                        <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                        </div>
                        </div>
                        `
                    }else{
                        taskLists.innerHTML+=`
                        <div class="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" data-id="${task.id}">
                        <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1 ">
                        <span class="material-icons-outlined mr-2">task</span>
                        <p class="w-48 trubance">${task.topic}</p>
                    <span class="ml-8 text-green-700">${grade}/100</span>
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                    </div>
                    </div>
                    `
                }
    
                
            }
        })
    }else{
        taskLists.innerHTML+=`
        <div class="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-x" data-id="${task.id}">
        <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
        <span class="material-icons-outlined mr-2">task</span>
        <p class="w-48 trubance">${task.topic}</p>
        <span class="ml-10 text-red-700">0/100</span>
        <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
        </div>
        </div>
        `
    }
});
}

function drawAllTasks(array1,array2){
    taskList.innerHTML=""
    array1.forEach(task => {
        const assignments = task.assignments
        if (assignments && assignments.length > 0) {
            assignments.forEach(a=>{
                const student = array2.find(s=> s.id === a.studentId)
                if (student) {
                    const gradeObj = student.grades.find(grade => grade.taskId === task.id)
                    const grade = gradeObj.grade
                    taskList.innerHTML+=`
                    <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up static z-1 task-list data-task-id = "${task.id}" " style="animation-delay: 0.1s">
                    <div class="flex justify-between content-center items-center">
                    <h1 class="text-2xl">${task.topic}</h1>
                    <span class = "text-green-700">${grade}/100</span>
                    </div>
                    <p class="mt-6">${task.description.slice(0,31)}</p>
                    <div class="flex justify-between content-center items-center mt-28">
                    <p class="text-xs">${task.deadline}</p>
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                    </div>
                    </div>
                    `
                    
                }
            })
        }else{
            taskList.innerHTML+=`
            <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up static z-1 task-list data-task-id="${task.id}" " style="animation-delay: 0.1s">
                    <div class="flex justify-between content-center items-center">
                    <h1 class="text-2xl">${task.topic}</h1>
                    <span class="text-red-700">0/100</span>
                    </div>
                    <p class="mt-6">${task.description}</p>
                    <div class="flex justify-between content-center items-center mt-28">
                    <p class="text-xs">${task.deadline}</p>
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                    </div>
                    </div>                    `
                }
            });
}

getAllTasksandStudents()





