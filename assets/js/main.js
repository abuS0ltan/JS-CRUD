// public
var courseName=document.getElementById("courseName");
var courseCategory=document.getElementById("courseCategory");
var coursePrice=document.getElementById("coursePrice");
var courseDescription=document.getElementById("courseDescription");
var addbtn = document.getElementById("addbtn");
var delbtn;
var clearBtn=document.getElementById("clearBtn");
var deleteAllBtn=document.getElementById("deleteAllBtn");
var data=document.getElementById("data");
var searchArea=document.getElementById("searchArea");
var curentIndex;
var courseNameAlert=document.getElementById("courseNameAlert");
var courseCategoryAlert=document.getElementById("courseCategoryAlert");
var coursePriceAlert=document.getElementById("coursePriceAlert");
var courseNamePattern=/^[A-Z][a-z0-9A-Z\s]{1,10}$/;
var courseCategoryPattern=/^[A-Z][A-Za-z0-9\s]{1,21}$/;
var coursePricePattern=/^(([1-9][0-9]{0,3})|10000)$/;
//
//cheak if an data in local storge
if(localStorage.getItem("coursesList")==null)
    var courses=[];
else{
    var courses=JSON.parse(localStorage.getItem("coursesList"));
    addToTabel();
}
//
// add course btn
addbtn.onclick = function(){
    if(addbtn.innerHTML=="Add Course")
        addCourse();
    else{
        console.log("yes");
        updateCourse();
        addbtn.innerHTML="Add Course";
    }
    addToTabel();
    clear();
}
var addCourse = function (){
    var course= {
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value
    };
    courses.push(course);
    console.log(courses);
    localStorage.setItem("coursesList",JSON.stringify(courses));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The course has been add',
        showConfirmButton: false,
        timer: 1500
    })
}
function addToTabel() {
    var rusult="";
    for (let i = 0; i < courses.length; i++) {
        rusult=rusult+`<tr>
                <td>${i+1}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}$</td>
                <td>${courses[i].description}</td>
                <td>
                    <button href="" class="btn btn-outline-danger" onclick="delbtn(${i})">Delete</button>
                    <button href="" class="btn btn-outline-info" onclick="upDateBtn(${i})">Update</button>
                </td>
                </tr>
                `
    }
    data.innerHTML=rusult;
}
var clearInput=function () {
    courseName.value="";
    courseCategory.value="";
    coursePrice.value="";
    courseDescription.value="";
}
var clearInputAids =function () {
    addbtn.setAttribute("disabled","disabled");
    courseName.classList.remove("is-invalid");
    courseName.classList.remove("is-valid");
    courseNameAlert.classList.replace("d-block","d-none");
    courseCategory.classList.remove("is-invalid");
    courseCategory.classList.remove("is-valid");
    courseCategoryAlert.classList.replace("d-block","d-none");
    coursePrice.classList.remove("is-invalid");
    coursePrice.classList.remove("is-valid");
    coursePriceAlert.classList.replace("d-block","d-none");
}
var clear = function(){
    clearInput();
    clearInputAids();
}
//
//clearBtn
clearBtn.onclick=function(){
    clear();
}
//
//deleteAllBtn
deleteAllBtn.onclick=function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete all courses!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'All courses have been deleted.',
            'success'
          )
          courses.splice(0,courses.length);//courses=[];
          localStorage.setItem("coursesList",JSON.stringify(courses));// localStorage.removeItem("coursesList");
          addToTabel();
        }

    })

}
//delete spasific item
delbtn = function (index){
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete this course!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'The course has been deleted.',
            'success'
          )
            courses.splice(index,1);
            localStorage.setItem("coursesList",JSON.stringify(courses));
            addToTabel();  
        }

    })   
}
//
//serch
searchArea.onkeyup = function(){
    var rusult="";
    for (let i = 0; i < courses.length; i++) {
        if(courses[i].name.toLowerCase().includes(searchArea.value.toLowerCase()))
        rusult=rusult+`<tr>
                <td>${i+1}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].description}</td>
                <td>
                    <button href="" class="btn btn-outline-danger" onclick="delbtn(${i})">Delete</button>
                    <button href="" class="btn btn-outline-info" onclick="upDateBtn(${i})">Update</button>                
                </td>  
                </tr>
                `
    }
    data.innerHTML=rusult;
}
//
//upDateBtn
function upDateBtn(index){
    displayUpDateData(index);
    curentIndex=index;
}
var displayUpDateData=function(index){
    courseName.value=courses[index].name;
    courseCategory.value=courses[index].category;
    coursePrice.value=courses[index].price;
    courseDescription.value=courses[index].description;   
    addbtn.innerHTML="Update course";
    addbtn.removeAttribute("disabled");
}
var updateCourse = function(){
    var course= {
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value
    };
    courses[curentIndex]=course;
    localStorage.setItem("coursesList",JSON.stringify(courses));
}
//
//validation
courseName.onkeyup=function(){
    addbtn.setAttribute("disabled","disabled");

    if (courseNamePattern.test(courseName.value)) {
        courseName.classList.replace("is-invalid","is-valid");
        courseNameAlert.classList.replace("d-block","d-none");
        runAddbtn();
    }
    else{
        courseName.classList.add("is-invalid");
        courseNameAlert.classList.replace("d-none","d-block");
    }
}
courseCategory.onkeyup=function(){
    addbtn.setAttribute("disabled","disabled");

    if (courseCategoryPattern.test(courseCategory.value)) {
        courseCategory.classList.replace("is-invalid","is-valid");
        courseCategoryAlert.classList.replace("d-block","d-none");
        runAddbtn();
    }
    else{
        courseCategory.classList.add("is-invalid");
        courseCategoryAlert.classList.replace("d-none","d-block");
        
    }
}
coursePrice.onkeyup=function(){
    addbtn.setAttribute("disabled","disabled");

    if (coursePricePattern.test(String(coursePrice.value))) {
        coursePrice.classList.replace("is-invalid","is-valid");
        coursePriceAlert.classList.replace("d-block","d-none");
        runAddbtn();
    }
    else{
        coursePrice.classList.add("is-invalid");
        coursePriceAlert.classList.replace("d-none","d-block");
    }
}
var runAddbtn=function(){
    addbtn.setAttribute("disabled","disabled");
    if(coursePricePattern.test(String(coursePrice.value))&&courseCategoryPattern.test(courseCategory.value)&&courseNamePattern.test(courseName.value)){
        addbtn.removeAttribute("disabled");
    }
}
// for (let index = 0; index < 10; index++) {
//     localStorage.setItem(String(index),prompt("enter the name:"))
// }

