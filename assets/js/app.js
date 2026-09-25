const studentForm = document.getElementById("studentForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const addStudentBtn = document.getElementById("addStudentBtn");
const updateStudentBtn = document.getElementById("updateStudentBtn");
const studentsContainer = document.getElementById("studentsContainer");
const spinner = document.getElementById("spinner");




const baseUrl = "https://posts-crud-c2796-default-rtdb.firebaseio.com";
const studentsUrl = `${baseUrl}/students.json`;


let studentArr=[];

function hideSpinner(){
    spinner.classList.add("d-none")

}
function showSpinner(){
    spinner.classList.remove("d-none")

}

function OnCreatestd(eve){
    eve.preventDefault();
    let obj={
        fname:fname.value,
        lname:lname.value,
        email:email.value,
        contact:contact.value
    }
        showSpinner();
    let xhr = new XMLHttpRequest();
    xhr.open("POST",studentsUrl);
    xhr.setRequestHeader("content-type","application/json");
    xhr.setRequestHeader("TOKEN","JWT FROM LS");
    xhr.send(JSON.stringify(obj));
    xhr.onload=function(){
        if(xhr.status === 200 && xhr.status <=299){
            let res=JSON.parse(xhr.response);
            hideSpinner();
            let tr=document.createElement("tr");
            tr.id=res.name;
            tr.innerHTML=`<td>${1}</td>
                            <td>${obj.fname}</td>
                            <td>${obj.lname}</td>
                            <td>${obj.email}</td>
                            <td>${obj.contact}</td>
                            
                      <td><button onclick="onEdit(this)" class="btn btn-outline-info btn-sm">Edit</button></td>
                      <td><button onclick="onDelete(this)" class="btn btn-outline-danger btn-sm">Delete</button></td>`
                            studentsContainer.prepend(tr);
                            studentForm.reset();

                            let td=[...document.querySelectorAll("#studentsContainer tr td:first-child")];
                             td.forEach((td,i) => {
                                td.innerHTML=i+1
                            });
                            Swal.fire({
                title:"list  Created  successfully",
                timer:"2000",
                icon:"success"
            });
            }else{
                    cl("error")
                }
    }
}


studentForm.addEventListener("submit",OnCreatestd)

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
