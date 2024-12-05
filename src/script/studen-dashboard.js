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
async function getAllTasks() {
     const res = await getAllData('tasks')
     DrawCards(res.data)
}

function DrawCards(array) {
    taskLists.innerHTML = ''
    array.forEach(element => {
        taskLists.innerHTML +=`
        <div class="flex justify-around items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1 w-[340]">
        <span class="material-icons-outlined mr-2">task</span>
        <p class="w-44">
        ${element.topic.charAt(0) + element.topic.slice(1).toLowerCase()}
        </p>
        <span class="ml-32">100/100</span>
        <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
        </div>
        ` 
    });
}
getAllTasks()




