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


function onDelete(ele) {
    const deleteId = ele.closest("tr").id;
    const deleteUrl = `${baseUrl}/students/${deleteId}.json`;
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this student?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", deleteUrl);
            xhr.send(null);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status <= 299) {
                    ele.closest("tr").remove();
                    let tds = document.querySelectorAll("#deleteId td:first-child");
                    tds.forEach((td, idx) => td.innerHTML = idx + 1);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } else {
                    console.log("Error while deleting studenet", xhr.status);
                }
            }

            xhr.onerror = () => {
                console.log("Network Error...");
            }

        }
    });
}
