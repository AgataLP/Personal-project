


function depModals() {
  $(`.department-edit-modalX`).removeClass('hidden');
}


//// function REFRESH department data ////
function departmentRefresh (department) {
  // console.log(department);
  $.ajax({
    url: 'libs/php/REFRESHDepartment.php',
    method: 'POST',
    dataType: 'JSON',
    data: {
      id: department.id
    },
    success: function (data){
      // console.log(data);

      department = data; // department object received latest object data from database
      
      $(`#d-refreshID-${department.id}`).html(`
      <td>${department.name}</td>
      <td>${department.locationName}</td>
      <td style="text-align: right">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#D${department.id}" onclick="depModals()" title="d-Info">
      <i class="fas fa-user-circle" ></i>
      </button>
      </td>
      <td>
      <button id="dep-preCheck${department.id}" type="button" class="btn btn-danger dep-checkDelete${department.id}" data-toggle="modal" data-target="#modal-dep-delete${department.id}"  title="d-Info">
        <i class="fas fa-trash-alt"></i>
      </button>
      </td>
      `)
    },
    error: errorHandler
  })
}
//// END function REFRESH department data ////


//// DEPARTMENT (on NAV click) ////
function departments() {
  $(`.submit-message`).html("");
  let newLocation = document.getElementById('X1');
  newLocation.setAttribute('data-target', '#newDepartmentModal');

  console.log(allDepartments);
  
  $(`.dep-table`).removeClass(`hidden`);
  $(`.loc-table`).addClass(`hidden`);

  let depTableArray = [];
  let dep_delete_ModalArray = [];
  let dep_edit_ModalArray = [];

  for (const key in allDepartments) {
    const element = allDepartments[key];

    depTableArray.push(
      `<tr id="d-refreshID-${element.id}">
      <td>${element.name}</td>
      <td>${element.locationName}</td>
      <td style="text-align: right">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#D${element.id}" onclick="depModals()" title="d-Info">
      <i class="fas fa-user-circle" ></i>
      </button>
      </td>
      <td>
      <button id="dep-preCheck${element.id}" type="button" class="btn btn-danger dep-checkDelete${element.id}" data-toggle="modal" data-target="#modal-dep-delete${element.id}"  title="d-Info">
        <i class="fas fa-trash-alt"></i>
      </button>
      </td>
      </tr>
      `
    )

    dep_delete_ModalArray.push(
      `
      <div class="modal fade" id="modal-dep-delete${element.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="employeeDetailsLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="departmentDetailsLabel">${element.name}</h5>
              <button type="button" class="close btn-cancel-${element.id}" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> 
  
            <div class="modal-body loc-del dep-delete${element.id}"> <br><br>
              <p class="modal-content delete-message"></p>
            </div>
  
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-cancel-${element.id}" data-dismiss="modal">Cancel</button>
            </div>
  
          </div>
        </div>
      </div>
      `
    )

    
    ///// DELETE CHECK prior to confirmation ////
    $(document).on('click', `#dep-preCheck${element.id}`, function (e) {
      e.preventDefault();
      // $(`.department-delete-modalX`).removeClass('hidden');
      // $(`.department-delete-modalX`).modal('hide');

      let idToDelete = element.id;
      console.log(idToDelete);
      $.ajax({
        url: "libs/php/DELETEDepartmentCHECK.php",
        method: "POST",
        dataType : "JSON",
        data: {
          id: idToDelete,
        },
        success:function (data) {
            if ( data.success){
              $(`.dep-delete${element.id}`).html(`
              <br><br>
              <div class="container">
                <form class="col-12" id="delete${element.id}">
                    <p>Are you sure you want to delete ${element.name} from database?</p>
                    <p>You can NOT undo this after confirmation</p>
                    <label for="d-id-delete${element.id}" class="form-label" hidden>ID</label>
                    <input type="text" name="d-id" id="d-id-delete${element.id}" class="form-control" hidden disabled value="${element.id}" /><br />
          
                    <div class="col-12">
                    <button class="btn btn-danger" type="submit" name="d-submit" id="d-submit-delete${element.id}" >XXConfirm Delete</button>
                    </div>
                </form>
              </div>
              <br><br>
              `)
              
            } else {
              $(`.delete-message`).html(`<span class='form-error'>${data.error}</span>`);
            }
        },
        error: errorHandler
      })

    })
    ///// END DELETE CHECK prior to confirmation ////

      


    $(document).on('click', `#d-submit-delete${element.id}`, function (e) {
      e.preventDefault();
      console.log(element);

      let idToDelete = $(`#d-id-delete${element.id}`).val();
      let deleteSubmit = $(`#d-submit-delete${element.id}`).val();
      console.log(idToDelete);

      $.ajax({
          url: "libs/php/DELETEDepartmentCONFIRM.php",
          method: "POST",
          dataType : "JSON",
          data: {
            id: idToDelete,
            Submit: deleteSubmit
          },
          success:function (data) {
              if ( data.success){
                $(`#d-refreshID-${element.id}`).remove();
                console.log($(`#modal-dep-delete${element.id}`));
                $(`#modal-dep-delete${element.id}`).modal(`hide`);
                console.log(data);
              } else {
                $(`.delete-message`).html(`<span class='form-error'>${data.error}</span>`);
              }
          },
          error: errorHandler
      })
    })




    dep_edit_ModalArray.push(
      // <button type="button" class="btn btn-danger" id="btn-delete-${element.id}" >Delete</button>
        `
        <div class="modal fade" id="D${element.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="departmentDetailsLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="departmentDetailsLabel">Department Details</h5>
                <button type="button" class="close btn-cancel-${element.id}" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> 
    
              <div class="modal-body info">
    
                <button type="button" class="btn btn-secondary" id="btn-d-edit-${element.id}" >Edit</button>
                
                <br><br>
                <p class="submit-message"></p>
    
                <div class="container">
    
                  <form class="col-12" id="form${element.id}">
              
                    <input type="text" name="d-id" id="d-id${element.id}" class="form-control" hidden disabled value="${element.id}" /><br />

                    <label for="d-name${element.id}" class="form-label">Department Name</label>
                    <input type="text" name="d-name" id="d-name${element.id}" class="form-control" disabled value="${element.name}" required/><br />
    
                    <label for="d-location${element.id}" class="form-label">Location</label>
                    <select name="location" id="d-location${element.id}" class="form-control" disabled required>
                        <option class="${element.id}" value="${element.locationID}" selected>${element.locationName}</option>  
                    </select><br />
    
                    <div class="col-12">
                    <button class="btn btn-primary hidden" type="submit" name="d-submit" id="d-submit-edit${element.id}" data-target="#editar">Save</button>
                    </div>
                    
                    </form>
    
                </div><br><br>
                
              </div>
    
              <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-cancel-${element.id}" data-dismiss="modal">Cancel</button>
              </div>
    
            </div>
          </div>
        </div>
        `
    
    )


      // ALLOWING to EDIT DATA
    $(document).on('click', `#btn-d-edit-${element.id}`, function (event) {
      event.preventDefault();
      console.log('AKA');
      departmentRefresh(element);

      $(`#d-name${element.id}`).prop("disabled", false);
      $(`#d-location${element.id}`).prop("disabled", false);

      let options = '';
      allLocations.forEach(location => {
        // console.log(location);
        if (location.id == element.locationID) {
          options += (`<option class="${location.id}" value="${location.id}" selected>${location.name}</option>`);

        } else {
          options += (`<option class="${location.id}" value="${location.id}">${location.name}</option>`)
        }
        return
      });
      
      $(`#d-location${element.id}`).prop("disabled", false).html(options);
      $(`#d-submit-edit${element.id}`).removeClass('hidden');

    });


    $(document).on('click', `#d-submit-edit${element.id}`, function (e) {
      e.preventDefault();
      console.log('Edit here');

      let idToUpdate = $(`#d-id${element.id}`).val();
      let updateName = $(`#d-name${element.id}`).val();
      let updateNewLocation = $(`#d-location${element.id}`).val();
      let updateSubmit = $(`#d-submit-edit${element.id}`).val();
      console.log(updateNewLocation);

      $.ajax({
          url: "libs/php/UPDATEDepartment.php",
          method: "POST",
          dataType : "JSON",
          data: {
            id: idToUpdate,
            updateName: updateName,
            location: updateNewLocation,
            submit: updateSubmit
          },
          success:function (data) {
              console.log('UPDATE DEPARTMENT');
              console.log(data);
              if ( data.success){
                // $(`.submit-message`).html(`<span class='form-success'>${data.success}</span>`);
                departmentRefresh(element);
                reloadData();
                $(`#D${element.id}`).modal('hide');
              } else {
                $(`.submit-message`).html(`<span class='form-error'>${data.error}</span>`);
              }
          },
          error: errorHandler
      })
    })
    
  }


  ////////////////////// NEW DEPARTMENT - OPTIONS ///////////////////////////
  let options = '<option value="" selected disabled>Select Location</option>';
  allLocations.forEach(location => {
    options += (`<option value="${location.id}">${location.name}</option>`)
  });

  $(`#newLocationOptions`).prop("disabled", false).html(options);

  $(document).on('click', '#d-newSubmit', function (event) {
    event.preventDefault();
    console.log(allLocations);
    let newDepartment = $(`#newDepartmentName`).val();
    let locationAssigned = $(`#newLocationOptions`).val();
    let submit = $(`#d-newSubmit`).val();
    console.log(locationAssigned);
    console.log(newDepartment);

    $.ajax({
      url: "libs/php/CREATEDepartment.php",
      method: "POST",
      dataType : "JSON",
      data: {
        newDepartment: newDepartment,
        location: locationAssigned,
        Submit: submit
      },
      success:function (data) {
        console.log('NEW DEPARTMENT');
        console.log(data);
        if ( data.success){
          // $(`.submit-message`).html(`<span class='form-success'>${data.success}</span>`);
          document.getElementById('createDepartment').reset();
          $(`.submit-message`).html('');
          $(`#newDepartmentModal`).modal(`hide`);
        } else {
          $(`.submit-message`).html(`<span class='form-error'>${data.error}</span>`);
        }
      },
      error: errorHandler
    })


  })
  //////////////////////END NEW DEPARTMENT - OPTIONS ///////////////////////////
  

  
  $('.table-data-2').html(`${depTableArray}`);
  $('.department-delete-modalX').html(`${dep_delete_ModalArray}`);
  $('.department-edit-modalX').html(`${dep_edit_ModalArray}`);
  $('#SAL').html(``);

}




  
