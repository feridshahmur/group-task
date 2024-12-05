import axios from "axios";
import { getAllData } from "../services/api";

 // Mobile menu functionality
 const mobileMenuButton = document.querySelector('.mobile-menu-button');
 const sidebar = document.querySelector('.sidebar');
 const overlay = document.querySelector('.overlay');

 function toggleMobileMenu() {
     sidebar.classList.toggle('translate-x-0');
     sidebar.classList.toggle('z-40');
    //  overlay.classList.toggle('hidden');
    //  setTimeout(() => overlay.classList.toggle('opacity-0'), 0);
    //  document.body.style.overflow = sidebar.classList.contains('translate-x-0') ? 'hidden' : '';
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




//  teacher dashboard

let rpMain = document.querySelector(".tc-dsh-main");

rpMain.addEventListener("click",function(){
    window.location.replace("index.html")
})

//Add student side bar

let studSide = document.querySelector(".stud-add");

let studTasks = document.querySelector(".stud-tasks-cards")

async function createTaskCards(){
    let res = await getAllData("tasks");
    res.data.forEach(task => {
        let tabElem = document.createElement("div");
        tabElem.className = "bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up flex flex-col gap-3";
        tabElem.style = "animation-delay: 0.1s";
        tabElem.innerHTML = `
                    <h3 class="text-xl font-bold text-indigo-800">${task.title}</h3>
                    <p>${task.description}</p>
                    <div class = "flex flex-col mt-8">
                    <span>Topic: ${task.topic}</span>
                    <span class="grade-point">Deadline: ${task.deadline}</span>
                    </div>
                    <div class = "flex gap-2 justify-end mt-2">
                        <button class = "delete btn-stud-task px-4 py-1 min-w-[40px] text-center text-white bg-blue-800 border border-blue-800 rounded-lg active:text-blue-800 hover:bg-transparent hover:text-blue-800 focus:outline-none focus:ring">Edit</button>
                    <button class = "edit btn-stud-task px-4 py-1 min-w-[40px] text-center text-white bg-blue-800 border border-blue-800 rounded-lg active:text-blue-800 hover:bg-transparent hover:text-blue-800 focus:outline-none focus:ring">Delete</button>
                    </div>
                    `
        studTasks.appendChild(tabElem)
     });
}
createTaskCards();
async function createStudentTable(){
    let res = await getAllData("students");
    res.data.forEach(student => {
        let tabElem = document.createElement("div");
        tabElem.className = "bg-white rounded-xl shadow-lg mt-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

        tabElem.innerHTML = `
              <div class = "flex justify-between">
                <h4 class = "stud-name">${student.fullName}</h4>
                <button class = " btn-stud-task px-6 py-2 min-w-[50px] text-center text-white bg-indigo-800 border border-indigo-800 rounded active:text-indigo-800 hover:bg-transparent hover:text-indigo-800 focus:outline-none focus:ring" data-id = "${student.id}">Tasks</button>
              </div>
        `
        studSide.appendChild(tabElem)
     });

     let btnTask = document.querySelectorAll(".btn-stud-task");

     btnTask.forEach(btn => {
        btn.addEventListener("click",function(){

        })
     });





}
createStudentTable();



