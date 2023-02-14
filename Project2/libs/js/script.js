const preloader = document.getElementById('preloader');

// GLOBAL VARIABLES
let allLocations = [];
let allDepartments = [];
let inner2 = "";

function main() {
  location.reload();
}


// // LOAD DEPARTMENT OPTIONS 
// $(document).ready(function () {
//   console.log(allDepartments);
//   allDepartments.forEach(department => {
//     const selector = document.getElementById('newDepartment');
//                   const newOption = document.createElement('option');
//                   newOption.setAttribute('class', department.locationID);
//                   newOption.setAttribute('value', department.id);
//                   newOption.innerText = department.name;
//                   selector.appendChild(newOption);
//                   return 
//   });
// });

// // SUBMIT new employee 
// $(`#createEmployee`).submit(function (event) {
//   event.preventDefault();
//   console.log('XXX');

//   let newFName = $(`#newFname`).val();
//   let newLName = $(`#newLname`).val();
//   let newJobTitle = $(`#newJobTitle`).val();
//   let newEmail = $(`#newEmail`).val();
//   let newDepartment = $(`#newDepartment`).val();
//   // let newLocation = $(`#e-location`).val();
//   let newSubmit = $(`#newSubmit`).val();
//   console.log(newFName);
//   console.log(newLName);

//   $(`.submit-message`).load("libs/php/CREATEEmployee.php", {
//       newFName: newFName,
//       newLName: newLName,
//       newJobTitle: newJobTitle,
//       newEmail: newEmail,
//       newDepartment: newDepartment,
//       // newLocation: newLocation,
//       newSubmit: newSubmit
//   })
//   // $(`#newEmployee`).modal(`hide`);

// })

$('#newSubmit').on('click', function (e) {
  e.preventDefault();

  let newFName = $(`#newFname`).val();
  let newLName = $(`#newLname`).val();
  let newJobTitle = $(`#newJobTitle`).val();
  let newEmail = $(`#newEmail`).val();
  let newDepartment = $(`#newDepartment`).val();
  // let newLocation = $(`#e-location`).val();
  let newSubmit = $(`#newSubmit`).val();

  console.log('clicked');
  console.log(newFName, newLName, newJobTitle, newEmail, newDepartment);
  
  $.ajax({
    url: 'libs/php/CREATEEmployeeXX.php',
    method: 'POST',
    dataType: 'JSON',
    data: {
      newFName: newFName,
      newLName: newLName,
      newJobTitle: newJobTitle,
      newEmail: newEmail,
      newDepartment: newDepartment,
      // newLocation: newLocation,
      newSubmit: newSubmit
    },
    success: function (data) {
      console.log(data)
      if(data.success){
        // $(`.submit-message`).html(`<span class='form-success'>${data.success}</span>`);
        document.getElementById('createEmployee').reset(); 
        $(`.submit-message`).html('');
        $(`#newEmployee`).modal('hide');

      }else {
        $(`.submit-message`).html(`<span class='form-error'>${data.error}</span>`);
      }
    }
  })
})


// function CREATE TABLE
function createTable(emptyArray, employee) {
  emptyArray.push(
    `<tr id="e-refreshID-${employee.id}">
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td class="d-none d-lg-table-cell">${employee.email}</td>
        <td class="d-none d-lg-table-cell">${employee.jobTitle}</td>
        <td class="d-none d-lg-table-cell">${employee.department}</td>
        <td style="text-align: center;">
          <button id="refresh-${employee.id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#X${employee.id}" title="e-Info">
            <i class="fas fa-user-circle"></i>
          </button>
        </td>
        <td style="text-align: center; padding-right: 1em;">
          <button id="${employee.id}" type="button" class="btn btn-danger e-delete" data-toggle="modal" data-target="#modal-delete${employee.id}" title="e-Info">
          <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
      `
  )
  
}


// function CONFIRM DELETE MODAL (employee details)
function deleteModal(emptyArray, employee) {
  emptyArray.push(
    `
    <div class="modal fade" id="modal-delete${employee.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="employeeDetailsLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="employeeDetailsLabel">${employee.firstName} ${employee.lastName}</h5>
            <button type="button" class="close btn-cancel-${employee.id}" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> 

          <div class="modal-body emp-del">
            
          <br><br>
            <p class="delete-message"></p>

            <div class="container">

              <form class="col-12" id="delete${employee.id}" action="libs/php/DELETEEmployee.php" method="POST">

                <p>Are you sure you want to delete ${employee.firstName} ${employee.lastName} from database?</p>
                <p>You can NOT undo this after confirmation</p>
                <label for="e-id-delete${employee.id}" class="form-label" hidden>ID</label>
                <input type="text" name="e-id" id="e-id-delete${employee.id}" class="form-control" hidden disabled value="${employee.id}" /><br />

                <div class="col-12">
                <button class="btn btn-danger" type="submit" name="e-submit" id="e-submit-delete${employee.id}" >Confirm Delete</button>
                </div>
                
              </form>

            </div><br><br>
            
          </div>

          <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-cancel-${employee.id}" data-dismiss="modal">Cancel</button>
          </div>


        </div>
      </div>
    </div>
    `
  )

  

  $(document).on('click', `#e-submit-delete${employee.id}`, function (e) {
    console.log('here');
    // SUBMIT employee DELETE details/
    $(`#delete${employee.id}`).submit(function (event) {
      event.preventDefault();
      console.log(`e-f-name-delete${employee.id}`);
      let idToDelete = $(`#e-id-delete${employee.id}`).val();
      let deleteSubmit = $(`#e-submit-delete${employee.id}`).val();
      console.log(idToDelete);
      
      $(`.delete-message`).load("libs/php/DELETEEmployee.php", {
        id: idToDelete,
        deleteSubmit: deleteSubmit,
      });
      $(`#e-refreshID-${employee.id}`).remove();
      $(`#modal-delete${employee.id}`).modal(`hide`);
    });
    
  })

}

// function refresh employee data
function employeeRefresh (employee) {
  $.ajax({
    url: 'libs/php/REFRESHEmployee.php',
    method: 'POST',
    dataType: 'JSON',
    data: {
      id: employee.id
    },
    success: function (data){
      // console.log(data);

      employee = data; // employee object received latest object data from database
      
      $(`#e-refreshID-${employee.id}`).html(`
            <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td class="d-none d-lg-table-cell">${employee.email}</td>
              <td class="d-none d-lg-table-cell">${employee.jobTitle}</td>
              <td class="d-none d-lg-table-cell">${employee.department}</td>
              <td style="text-align: center;">
                <button id="refresh-${employee.id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#X${employee.id}" title="e-Info">
                  <i class="fas fa-user-circle"></i>
                </button>
              </td>
              <td style="text-align: center; padding-right: 1em;">
                <button id="${employee.id}" type="button" class="btn btn-danger e-delete" data-toggle="modal" data-target="#modal-delete${employee.id}" title="e-Info">
                <i class="fas fa-trash-alt"></i>
                </button>
              </td>
      `)
    },
    error: errorHandler
  })
}

// function EDIT MODAL (employee details)
function editModal(emptyArray, employee) {

  // Load latest employee details inside modal from database
  $(document).on('click', `#refresh-${employee.id}`, function (e) {
    //   // e.preventDefault();
      console.log('hola');
      console.log(employee.id);
      employeeRefresh(employee);
    
    });

  emptyArray.push(
  // <button type="button" class="btn btn-danger" id="btn-delete-${employee.id}" >Delete</button>
    `
    <div class="modal fade" id="X${employee.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="employeeDetailsLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="employeeDetailsLabel">Employee Details</h5>
            <button type="button" class="close btn-cancel-${employee.id}" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> 

          <div class="modal-body info">

            <button type="button" class="btn btn-secondary" id="btn-e-edit-${employee.id}" >Edit</button>
            
            <br><br>
            <p class="submit-message"></p>

            <div class="container">

              <form class="col-12" id="form${employee.id}">

                <input type="text" name="e-id" id="e-id-${employee.id}" class="form-control" hidden disabled value="${employee.id}" /><br />
          
                <label for="e-f-name-${employee.id}" class="form-label">First Name</label>
                <input type="text" name="e-f-name" id="e-f-name-${employee.id}" class="form-control" disabled value="${employee.firstName}" required/><br />

                <label for="e-l-name-${employee.id}" class="form-label">Last Name</label>
                <input type="text" name="e-l-name" id="e-l-name-${employee.id}" class="form-control" disabled value="${employee.lastName}" required/><br />
                
                <label for="e-email-${employee.id}" class="form-label">Email</label>
                <input type="text" name="e-email" id="e-email-${employee.id}" class="form-control e-mail" disabled value="${employee.email}" required/><br />
                
                <label for="e-department-${employee.id}" class="form-label">Department</label>
                <select name="department" id="e-department-${employee.id}" class="form-control" disabled required>
                    <option class="${employee.locationID}" value="${employee.departmentID}" selected>${employee.department}</option>  
                </select><br />

                <label for="e-location-${employee.id}" class="form-label">Location</label>
                <input type="text" name="e-location" id="e-location-${employee.id}" class="form-control" disabled value="${employee.location}" /><br />

                <div class="col-12">
                <button class="btn btn-primary hidden" type="submit" name="e-submit" id="e-submit-${employee.id}" data-target="#editar">Save</button>
                </div>
                
                </form>

            </div><br><br>
            
          </div>

          <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-cancel-${employee.id}" data-dismiss="modal">Cancel</button>
          </div>


        </div>
      </div>
    </div>
    `

  )


  // ALLOWING to EDIT DATA
  $(document).on('click', `#btn-e-edit-${employee.id}`, function (event) {
    event.preventDefault();

    $(`#e-f-name-${employee.id}`).prop("disabled", false);
    $(`#e-l-name-${employee.id}`).prop("disabled", false);
    $(`#e-email-${employee.id}`).prop("disabled", false);

    let options = '';
    allDepartments.forEach(department => {
      if (department.id == employee.departmentID) {
        options += (`<option class="${department.locationID}" value="${department.id}" selected>${department.name}</option>`);

      } else {
        options += (`<option class="${department.locationID}" value="${department.id}">${department.name}</option>`)
      }
      return
    });
    
    $(`#e-department-${employee.id}`).prop("disabled", false).html(options);
    $(`#e-submit-${employee.id}`).removeClass('hidden');


    // LOCATION change base on DEPARTMENT selected
    document.getElementById(`e-department-${employee.id}`).addEventListener("change", locationModalUpdate);

    function locationModalUpdate() {
      let loc = document.getElementById(`e-location-${employee.id}`);
      let dep = document.getElementById(`e-department-${employee.id}`);

      for (let index = 0; index < allDepartments.length; index++) {
        let department = allDepartments[index];
        if (department.id == dep.value) {
          loc.value = department.locationName;
          return
        }
      }
    }


  // SUBMIT employee UPDATED details/
  $(document).ready(function (e) {
    // $(document).on(`click`, `#e-submit-${employee.id}`, function (e) {
    $(`#e-submit-${employee.id}`).click(function (event) {
      // $(`#form${employee.id}`).submit(function (event) {
          event.preventDefault();
          console.log(`e-f-name-${employee.id}`);
          console.log(`HOLA`);
          let idToUpdate = $(`#e-id-${employee.id}`).val();
          let updatedFName = $(`#e-f-name-${employee.id}`).val();
          let updatedLName = $(`#e-l-name-${employee.id}`).val();
          let updatedEmail = $(`#e-email-${employee.id}`).val();
          let updatedDepartment = $(`#e-department-${employee.id}`).val();
          let updatedLocation = $(`#e-location-${employee.id}`).val();
          let updatedSubmit = $(`#e-submit-${employee.id}`).val();
          console.log(idToUpdate);
  
          $.ajax({
                url: "libs/php/UPDATEEmployeeAJAX.php",
                method: "POST",
                dataType : "JSON",
                data: {
                  id: idToUpdate,
                  FName: updatedFName,
                  LName: updatedLName,
                  Email: updatedEmail,
                  Department: updatedDepartment,
                  Location: updatedLocation,
                  Submit: updatedSubmit
                },
                success:function (data) {
                    console.log(data);
                    if ( data.success){
                      // $(`.submit-message`).html(`<span class='form-success'>${data.success}</span>`);
                      // Close modal here -->
                      employeeRefresh(employee);
                      $(`.submit-message`).html('');
                      $(`#X${employee.id}`).modal('hide')
                      
                    } else {
                      $(`.submit-message`).html(`<span class='form-error'>${data.error}</span>`);
                      $(`.e-mail`).addClass("imput-error");
                    }
                },
                error: errorHandler
            })
      });
    })
  });


  // CANCEL EDIT DATA
  $(document).on('click', `.btn-cancel-${employee.id}`, function (event) {
    event.preventDefault();
    console.log(`close btn-cancel-${employee.id} clicked`);
    $(`#e-f-name-${employee.id}`).prop("disabled", true).val(`${employee.firstName}`);
    $(`#e-l-name-${employee.id}`).prop("disabled", true).val(`${employee.lastName}`);
    $(`#e-email-${employee.id}`).prop("disabled", true).val(`${employee.email}`);
    $(`#e-department-${employee.id}`).prop("disabled", true).val(`${employee.department}`);
    $(`#e-department-${employee.id}`).prop("disabled", true).html(`<option>${employee.department}</option>`);
    $(`#e-location-${employee.id}`).prop("disabled", true).val(`${employee.location}`);
    $(`#e-submit-${employee.id}`).addClass("hidden");
    $(`.submit-message`).html("");
    $(`.delete-message`).html("");
    // $(`.department-delete-modalX`).addClass("hidden");
    // $(`.department-edit-modalX`).addClass("hidden");
    // $(`.location-delete-modalX`).addClass("hidden");
    // $(`.location-edit-modalX`).addClass("hidden");
    // location.reload();
  });

}


// function ALL DATA + DETAILS MODAL
function allDataAndModals(params) {
  let tableArray = [];
  let modalArray = [];
  params = params['allEmployees'];
  for (const key in params) {
    const employee = params[key];

    createTable(tableArray, employee);
    editModal(modalArray, employee);
    deleteModal(modalArray, employee);

  }
  $(".employee-modalX").html(modalArray)
  $(".table-data").html(tableArray)

  return
  
  

}

// function FILTER TABLE
function filterTable(allData) {
  
  allData = allData.allEmployees;
  
  $("#search-form").on("keyup", function (event) {
    event.preventDefault();
    let newValue = $("#search-name-emp").val();
    
    eArray = [];
    eDetailsArray = [];

    for (let i = 0; i < allData.length; i++) {
      const e = allData[i];
      const regex = new RegExp(newValue, 'gi'); // correct way

      if (e.firstName.match(regex) || e.lastName.match(regex) || e.email.match(regex) || e.department.match(regex) || e.location.match(regex)) {
        createTable(eArray, e);
        editModal(eDetailsArray, e);
        deleteModal(eDetailsArray, e);
      }
    }

    $(".modalX").html(eDetailsArray)
    $(".table-data").html(eArray)

    return

  })
}



// GET ALL DATA//
function reloadData() {
  $.ajax({
    url: "libs/php/XXgetAll.php",
    method: "POST",
    success: function (data) {
  
      console.log('GET ALL');
      console.log(data['data']);
      const allData = data['data'];
      allLocations = data['data']['locations'];
  
      allDataAndModals(allData);
      filterTable(allData);
      // preloader.classList.add('stop-display');
      setTimeout(function(){ preloader.classList.add('stop-display'); }, 1500);
  
    },
    error: errorHandler
  })
  $.ajax({
    url: "libs/php/XXgetAllDepartments.php",
    method: "POST",
    success: function (data) {
      console.log(data);
      allDepartments = data['data'];
  
      // LOAD DEPARTMENT OPTIONS 
      // console.log(allDepartments);
      allDepartments.forEach(department => {
        const selector = document.getElementById('newDepartment');
                      const newOption = document.createElement('option');
                      newOption.setAttribute('class', department.locationID);
                      newOption.setAttribute('value', department.id);
                      newOption.innerText = department.name;
                      selector.appendChild(newOption);
                      return 
      });
    
    },
    error: errorHandler
  });
}
reloadData();




//////////////////////////////
// ERROR HANDLER (API CALL) //
//////////////////////////////
function errorHandler(jqXHR, textStatus, errorThrown) {
  console.log(jqXHR);
  console.log(textStatus);
  console.log(errorThrown);

  let msg = '';
  if (jqXHR.status === 0) {
    msg = 'Not connect.\n Verify Network.';
  } else if (jqXHR.status == 404) {
    msg = 'Requested page not found. [404]';
  } else if (jqXHR.status == 500) {
    msg = 'Internal Server Error [500].';
  } else if (textStatus === 'parsererror') {
    msg = 'Requested JSON parse failed.';
  } else if (textStatus === 'timeout') {
    msg = 'Time out error.';
  } else if (textStatus === 'abort') {
    msg = 'Ajax request aborted.';
  } else {
    msg = 'Uncaught Error.\n' + jqXHR.responseText;
  }
  alert(`${msg} . Please contact email@issues.com for further assistance. ${errorThrown}`);

}





