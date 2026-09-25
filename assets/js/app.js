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


function onDelete(ele){
    const deleteId = ele.closest("tr").id;
    console.log(deleteId);
}

function onEdit(ele){
    let EDIT_ID = ele.closest('tr').id;
    let EDIT_URL = `${baseUrl}/studentsUrl/${EDIT_ID}.json`
    localStorage.setItem('EDIT_ID', EDIT_ID)
    let xhr = new XMLHttpRequest();
    xhr.open("GET", EDIT_URL)
    xhr.send(null)
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response)
            fname.value = res.fname;
            lname.value = res.lname;
            email.value = res.email;
            contact.value = res.contact;

            addStudentBtn.classList.add('d-none')
            updateStudentBtn.classList.remove('d-none')

        }
       
    }
}

//update

function onUpdate(){
    let update_Id = localStorage.getItem('EDIT_ID')
    let UPDATE_URL = `${baseUrl}/studentsUrl/${update_Id}.json`;

    let updateObj={
        fname : fname.value,
        lname: lname.value,
        email:email.value,
        contact:contact.value,
        id:update_Id
    };
    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", UPDATE_URL);

    xhr.send(JSON.stringify(updateObj));
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response)
            let tds = document.getElementById(update_Id).children
            tds[1].innerHTML = res.fname,
            tds[2].innerHTML = res.lname,
            tds[3].innerHTML = res.email,
            tds[4].innerHTML = res.contact,
            studentForm.reset()
            addStudentBtn.classList.remove('d-none')
            updateStudentBtn.classList.add('d-none')
            localStorage.removeItem('EDIT_ID')

        }
    }
}

updateStudentBtn.addEventListener('click', onUpdate)
