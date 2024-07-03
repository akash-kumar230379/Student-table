window.onload =  function() {
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = function(){
        Swal.fire({
            title:'New Student',
            showConfirmButton:false,
            html:`
            <form id="student-form">
            <div id="form-group">
            <label>Student Name:</label>
            <input type="text" name="student-name"  required="true" placeholder ="enter student name" id="student-name"/>
            </div>
             <div id="form-group">
            <label> Class:</label>
            <input type="number" name="class"  placeholder ="4" id="class"required="true"/>
            </div>

<div id="form-group">
            <label>Roll:</label>
            <input type="number" name="roll"  placeholder ="12" id="roll"  required="true"/>
            </div>
            <button id="submit-btn"> Sumbit </button>
            </form>`
        });
        //Add student
        var studentForm = document.getElementById('student-form');
        studentForm.onsubmit = function(e){
            e.preventDefault();
            var name = document.getElementById("student-name");
            var studentClass = document.getElementById("class");
            var roll = document.getElementById("roll");
var student = {
    name:name.value,
    class:studentClass.value,
    roll:roll.value
}

var data = localStorage.getItem("student");
if(data == null){
    //store data first time if data is not available
    localStorage.setItem("student", JSON.stringify([student]))

    Swal.fire(
        {
            icon:'success',
            title:'New Data Added !'
        }).then(function(){
            //refresh page
             window.location =   location.href
        })
    
    }
else{
    //second time already have data then this part excuted
 var oldData = JSON.parse(data);
 oldData.push(student);
 var allData = JSON.stringify(oldData);
 localStorage.setItem("student", allData);
 Swal.fire(
    {
        icon:'success',
        title:'New Data Added !'
    }).then(function(){
        //refresh page
         window.location =   location.href
    })
}

        }
    }
    //show data 
    var index = 0;
    var students = localStorage.getItem("student");
if(students != null){
var original =  JSON.parse(students);
for(var i=0; i<original.length; i++){
   
  var  tr = document.createElement("tr");
  //sn
  var snTd = document.createElement("td");
  snTd.innerHTML= (i+1);
//name
var nameTd = document.createElement("td");
nameTd.innerHTML = original[i].name;
//class
var classTd = document.createElement("td");
classTd.innerHTML = original[i].class;
//roll
var rollTd = document.createElement("td");
rollTd.innerHTML =original[i].roll;

//setup action
var actionTd = document.createElement("td");
var actionDiv = document.createElement("div");



var editBtn = document.createElement("button");
editBtn.id = "edit-btn";
editBtn.setAttribute("row-index", i);
editBtn.innerHTML='<i class="ri-edit-box-line"></i>';

var deleteBtn = document.createElement("button");
deleteBtn.id="delete-btn";
deleteBtn.value=i;
deleteBtn.innerHTML='<i class="ri-delete-bin-fill"></i>';



actionDiv.append(editBtn);
actionDiv.append(deleteBtn);
actionTd.append(actionDiv);



//set td inside tr
tr.append(snTd);
tr.append(nameTd);
tr.append(classTd);
tr.append(rollTd);
tr.append(actionTd);

//set tr inside table
var studentTable = document.getElementById("student-table");
studentTable.append(tr);


//converting localstorage string in array of objects
var tmp = JSON.parse(students);
//delete student

deleteBtn.onclick=function(){
    var index = this.value;
  
   tmp.splice(index, 1);
   localStorage.setItem("student",JSON.stringify(tmp));
   window.location=location.href;
   
}

//Edit student
editBtn.onclick =function(){

  var index =  this.getAttribute("row-index");
  var editableStudent = tmp[index];

  Swal.fire({
    title:'Edit Student',
    showConfirmButton:false,
    html:`
    <form id="edit-student-form">
    <div id="form-group">
    <label>Student Name:</label>
    <input type="text"value="${editableStudent.name}" name="student-name"  required="true" placeholder ="enter student name" id="student-name"/>
    </div>
     <div id="form-group">
    <label> Class:</label>
    <input type="number" value = "${editableStudent.class}" name="class"  placeholder ="4" id="class"required="true"/>
    </div>

<div id="form-group">
    <label>Roll:</label>
    <input type="number" value = "${editableStudent.roll}" name="roll"  placeholder ="12" id="roll"  required="true"/>
    </div>
    <button id="save-btn"> Save </button>
    </form>`
});


//save student after editing
var form = document.getElementById("edit-student-form");
form.onsubmit=function(e){
    e.preventDefault();
   var name = document.getElementById("student-name").value;
   var studentClass = document.getElementById("class").value;
   var roll = document.getElementById("roll").value;
   var newStudent = {
    name:name,
    class:studentClass,
    roll:roll
   }
   //replacing old data into new data

   tmp[index] = newStudent;
   localStorage.setItem("student", JSON.stringify(tmp));

   Swal.fire({
    icon:'success',
    title:'Student Record Save!'
   }).then(function(){
    window.location=location.href;
   });
}
}

}


}

}
