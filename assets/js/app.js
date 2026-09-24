const studentForm = document.getElementById("studentForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const addStudentBtn = document.getElementById("addStudentBtn");
const updateStudentBtn = document.getElementById("updateStudentBtn");
const studentsContainer = document.getElementById("studentsContainer");



const baseUrl = "https://posts-crud-c2796-default-rtdb.firebaseio.com";
const studentsUrl = `${baseUrl}/students.json`;



