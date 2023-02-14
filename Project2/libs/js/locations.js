
// LOCATION (on NAV click)


function locModals() {
  $(`.location-edit-modalX`).removeClass('hidden');
  // $(`.location-modalX`).removeClass('hidden');
}

// NEW location //

$(document).on('click', '#l-newSubmit', function (event) {
  event.preventDefault();
  console.log('Creating Location');
  
  let newLocationName = $(`#newLocationName`).val();
  let submit = $(`#l-newSubmit`).val();
  // console.log(newLocationName);

  $.ajax({
    url: "libs/php/CREATELocation.php",
    method: "POST",
    dataType : "JSON",
    data: {
      newLocation: newLocationName,
      Submit: submit
  },
  success:function (data) {
      console.log('CREATE LOCATION');
      console.log(data);
      if ( data.success){
        // $(`.submit-message`).html(`<span class='form-success'>${data.success}</span>`);
        document.getElementById('createLocation').reset();
        $(`.submit-message`).html('');
        $(`#newLocationModal`).modal('hide');
      } else {
        $(`.submit-message`).html(`<span class='form-error'>${data.error}</span>`);
      }
      
  },
  error: errorHandler


  })
})
// End NEW location //





function locations() {
  console.log(allLocations);
  $(`.submit-message`).html("");

  let newLocation = document.getElementById('X1');
  // newLocation.innerText = 'New Location';
  newLocation.setAttribute('data-target', '#newLocationModal');

  $(`.loc-table`).removeClass(`hidden`);
  $(`.dep-table`).addClass(`hidden`);

  let locTableArray = [];
  let loc_delete_ModalArray = [];
  let loc_edit_ModalArray = [];

  for (const key in allLocations) {
    const location = allLocations[key];

    locTableArray.push(
      `<tr id="l-refreshID-${location.id}">
      <td colspan="2">${location.name}</td>
      <td style="text-align: right">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#L${location.id}" onclick="locModals()" title="l-Info">
          <i class="fas fa-user-circle" ></i>
        </button>
      </td>
      <td>
        <button id="loc-preCheck${location.id}" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-loc-delete${location.id}" title="l-Info">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
      </tr>
      `
    )

    loc_delete_ModalArray.push(
      `
      <div class="modal fade" id="modal-loc-delete${location.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="employeeDetailsLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="locationDetailsLabel">${location.name}</h5>
              <button type="button" class="close btn-cancel-${location.id}" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> 
  
            <div class="modal-body loc-del loc-delete${location.id}"> <br><br>
              <div class="container">
                <p class="modal-content delete-message"></p>
              </div><br><br>
            </div>
  
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-cancel-${location.id}" id="l-change${location.id}" data-dismiss="modal">Cancel</button>
            </div>
  
  
          </div>
        </div>
      </div>
      `
    )

    /////////////////////////////////////////////
    $(document).on('click', `#loc-preCheck${location.id}`, function (e) {
      e.preventDefault();
      console.log(`here we go ${location.id}`);
      $(`.location-delete-modalX`).removeClass('hidden');

      let idToDelete = location.id;

      $.ajax({
        url: "libs/php/DELETELocationCHECK.php",
        method: "POST",
        dataType: "JSON",
        data: {
          id: idToDelete
        },
        success: function (data) {
          console.log(data);
          if(data.success){
            $(`.loc-delete${location.id}`).html(`
            <br><br>
            <div class="container">
              <form class="col-12" id="delete${location.id}">
                  <p>Are you sure you want to delete ${location.name} from database?</p>
                  <p>You can NOT undo this after confirmation</p>
                  <label for="l-id-delete${location.id}" class="form-label" hidden>ID</label>
                  <input type="text" name="d-id" id="l-id-delete${location.id}" class="form-control" hidden disabled value="${location.id}" /><br />
          
                  <div class="col-12">
                  <button class="btn btn-danger" type="submit" name="d-submit" id="l-submit-delete${location.id}" >Confirm Delete</button>
                  </div>
              </form>
            </div>
            <br><br>
            `)

          }else {
            $(`.delete-message`).html(`<span class='form-error'>${data.error}</span>`);
          }
        },
        error: errorHandler
      })
    })
    /////////////////////////////////////////////

    $(document).on('click', `#l-submit-delete${location.id}`, function (e) {
      e.preventDefault();

      let idToDelete = $(`#l-id-delete${location.id}`).val();
      let deleteSubmit = $(`#l-submit-delete${location.id}`).val();

      $.ajax({
          url: "libs/php/DELETELocationCONFIRM.php",
          method: "POST",
          dataType : "JSON",
          data: {
            id: idToDelete,
            Submit: deleteSubmit
          },
          success:function (data) {
            if ( data.success){
              $(`#l-refreshID-${location.id}`).remove();
              $(`#modal-loc-delete${location.id}`).modal(`hide`);
              console.log(data);
            } else {
              $(`.delete-message`).html(`<span class='form-error'>${data.error}</span>`);
            }
          },
          error: errorHandler
      })
    })




    loc_edit_ModalArray.push(
      // <button type="button" class="btn btn-danger" id="btn-delete-${location.id}" >Delete</button>
        `
        <div class="modal fade" id="L${location.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="departmentDetailsLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="departmentDetailsLabel">Location Details</h5>
                <button type="button" class="close btn-cancel-${location.id}" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> 
    
              <div class="modal-body info">
    
                <button type="button" class="btn btn-secondary" id="btn-l-edit-${location.id}" >Edit</button>
                
                <br><br>
                <p class="submitX-message"></p>
    
                <div class="container">
    
                  <form class="col-12" id="form${location.id}">

                    <input type="text" name="l-id" id="l-id${location.id}" class="form-control" hidden disabled value="${location.id}" /><br />
              
                    <label for="l-name${location.id}" class="form-label">Location Name</label>
                    <input type="text" name="l-name" id="l-name${location.id}" class="form-control" disabled value="${location.name}" required/><br />
    
    
                    <div class="col-12">
                    <button class="btn btn-primary hidden" type="submit" name="d-submit" id="l-submit-edit${location.id}" data-target="#editar">Save</button>
                    </div>
                    
                    </form>
    
                </div><br><br>
                
              </div>
    
              <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-cancel-${location.id}" data-dismiss="modal">Cancel</button>
              </div>
    
    
            </div>
          </div>
        </div>
        `
    
    )


      // ALLOWING to EDIT DATA
    $(document).on('click', `#btn-l-edit-${location.id}`, function (event) {
      event.preventDefault();

      $(`#l-name${location.id}`).prop("disabled", false);
      $(`#l-submit-edit${location.id}`).removeClass('hidden');

    });


    $(document).on('click', `#l-submit-edit${location.id}`, function (e) {
      e.preventDefault();
      console.log('Edit location here');

      let idToUpdate = $(`#l-id${location.id}`).val();
      let updateName = $(`#l-name${location.id}`).val();
  //     let updateNewLocation = $(`#l-location${location.id}`).val();
      let updateSubmit = $(`#l-submit-edit${location.id}`).val();
  //     console.log(updateNewLocation);

      $.ajax({
          url: "libs/php/UPDATELocation.php",
          method: "POST",
          dataType : "JSON",
          data: {
            id: idToUpdate,
            updateName: updateName,
            submit: updateSubmit
          },
          success:function (data) {
              console.log('UPDATE LOCATION');
              console.log(data);
              if ( data.success){
                // $(`.submitX-message`).html(`<span class='form-success'>${data.success}</span>`);
                
                // UPDATE HTML here
                locationRefresh(location);
                reloadData();
                $(`#L${location.id}`).modal('hide');
              } else {
                $(`.submitX-message`).html(`<span class='form-error'>${data.error}</span>`);
              }
          },
          error: errorHandler
      })
    })
    
  }
  
  $('.table-data-3').html(`${locTableArray}`);
  $('.location-delete-modalX').html(`${loc_delete_ModalArray}`);
  $('.location-edit-modalX').html(`${loc_edit_ModalArray}`);
  $('#SAL').html(``);

}


// function refresh department data
function locationRefresh (location) {
  // console.log(location);
  $.ajax({
    url: 'libs/php/REFRESHLocation.php',
    method: 'POST',
    dataType: 'JSON',
    data: {
      id: location.id
    },
    success: function (data){
      // console.log(data);

      location = data; // location object received latest object data from database
      
      $(`#l-refreshID-${location.id}`).html(`
      <td colspan="2">${location.name}</td>
      <td style="text-align: right">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#L${location.id}" onclick="locModals()" title="l-Info">
          <i class="fas fa-user-circle" ></i>
        </button>
      </td>
      <td>
        <button id="${location.id}" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-loc-delete${location.id}" title="l-Info">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
      `)
    },
    error: errorHandler
  })
}

  
