const response = 'http://localhost:3000/studentRoster';
//$.get('http://localhost:3000/studentRoster').then(data => console.log(data));


let students= null;
 document.getElementById('fetch-students').addEventListener('click', async () => {
    const responseDOM = await fetch(response);
    students = await responseDOM.json();
    const container = document.getElementById('student-container');
   // container.innerHTML = '<H1> Student Information</H1>';-->
   container.innerHTML = '<table>'
    students.forEach(student => {
        var checkBoxLabel = document.createElement('label');
            checkBoxLabel.textContent = " Update/Delete";
        var cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.name = 'myCheckbox';
          cb.value = `${student.id}`;
          cb.id = `${student.id}`;
          cb.addEventListener('click', () => {
              document.getElementById('fullNameInput').value = student.fullName;
              document.getElementById('researchAssignmentInput').value = student.researchAssignment;
              document.getElementById('idInput').value = student.id;
              document.getElementById('idInput').readOnly = true;

          })
        const studentDiv = document.createElement('div');
        studentDiv.innerHTML = `<h3>${student.fullName}</h3>
              <p>Student ID: ${student.id}</p>
              <p>Research Assignment: ${student.researchAssignment}</p>`;
              container.appendChild(cb);
              container.appendChild(checkBoxLabel);
              container.appendChild(studentDiv);
              
    }); 
  });
//let lastCreatedItem = null
  async function onCreateStudentClick(){
    const fullName = document.getElementById('fullNameInput');
    const fullNameInput = fullName.value
    const researchAssignment = document.getElementById('researchAssignmentInput')
    const researchAssignmentInput =researchAssignment.value
    const id = document.getElementById('idInput')
    const idInput =id.value
    const newStudent = {fullName: `${fullNameInput}`, researchAssignment:`${researchAssignmentInput}`, id: `${idInput}`};
    const response = await fetch("http://localhost:3000/studentRoster", {
          method: "POST",
          headers: {"content-type": "application/json"} ,
          body:JSON.stringify(newStudent)

      })
      const newlyCreatedItem = await response.json()
      //lastCreatedItem = newlyCreatedItem
      //console.log("Last Item: ${lastCreatedItem}")
}


 async function onUpdateStudentClick(){
    const fullName = document.getElementById('fullNameInput');
    const fullNameInput = fullName.value
    const researchAssignment = document.getElementById('researchAssignmentInput')
    const researchAssignmentInput =researchAssignment.value
    const id = document.getElementById('idInput')
    const idInput =id.value
      const response =  
        await fetch(`http://localhost:3000/studentRoster/${idInput}`, {
          method: "PUT",
          headers: {"content-type": "application/json"} ,
          body:JSON.stringify({fullName: `${fullNameInput}`,
             researchAssignment: `${researchAssignmentInput}`,
             id:`${idInput}`})

      });
      $('#formContainer').find('input:text').val('');
      document.getElementById('idInput').readOnly = false;
    }
async function onDeleteStudentClick(){
      const fullName = document.getElementById('fullNameInput');
    const fullNameInput = fullName.value
    const researchAssignment = document.getElementById('researchAssignmentInput')
    const researchAssignmentInput =researchAssignment.value
    const id = document.getElementById('idInput')
    const idInput =id.value
      const response =  
        await fetch(`http://localhost:3000/studentRoster/${idInput}`, {
          method: "DELETE",
        });
        $('#formContainer').find('input:text').val('');
        document.getElementById('idInput').readOnly = false;
    }
      