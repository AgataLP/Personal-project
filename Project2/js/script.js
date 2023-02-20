
$('#menuButton').click(function() {
    $('#open_Menu_Var').toggle();
});

$('#addDept').click(function() {
    $('#dept_Popup_Var').modal('show');
});

$('#closeDept').click(function() {
    $('#dept_Popup_Var').modal('hide');
});

$('#addLoc').click(function() {
    $('#loc_Popup_Var').modal('show');
});

$('#closeLoc').click(function() {
    $('#loc_Popup_Var').modal('hide');
});

$('#addPer').click(function() {
    $('#per_Popup_Var').modal('show');
});

$('#closePer').click(function() {
    $('#per_Popup_Var').modal('hide');
});

$('#closeUpdate').click(function() {
    $('#update_Popup_Var').modal('hide');
});

$('#closeDel').click(function() {
    $('#del_Popup_Var').modal('hide');
});

$('#closeDelDept').click(function() {
    $('#del_Dept_Confirm_Popup_Var').modal('hide');
});

$('#closeDelLoc').click(function() {
    $('#del_LocCon_firm_Popup_Var').modal('hide');
});

var table_Var = '';
var information_Var = '';
function populateDepartments() {
    $.ajax({
        url: "php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
    
        success: function(result_Var) {

            if (result_Var.status.name == "ok") {
                $('#department_Select_Var').html('');
                $('#u_department_Select_Var').html('');
                $('#del_Dept_Select_Var').html('');               

                $.each(result_Var.data, function(index) {

                    $('#department_Select_Var').append($('<option>',{
                        value: result_Var.data[index].id,
                        text: result_Var.data[index].name
                    }));   
                    $('#u_department_Select_Var').append($('<option>',{
                        value: result_Var.data[index].id,
                        text: result_Var.data[index].name
                    }));    
                    $('#del_Dept_Select_Var').append($('<option>',{
                        value: result_Var.data[index].id,
                        text: result_Var.data[index].name
                    }));               
                 }); 


            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    }); 
}
 
function populateLoactions() {
    $.ajax({
        url: "php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
    
        success: function(result_Var) {

            if (result_Var.status.name == "ok") {
                $('#location_Select_Var').html('');
                $('#del_Loc_Select_Var').html(''); 

                $.each(result_Var.data, function(index) {

                    $('#location_Select_Var').append($('<option>',{
                        value: result_Var.data[index].id,
                        text: result_Var.data[index].name
                    })); 
                    $('#del_Loc_Select_Var').append($('<option>',{
                        value: result_Var.data[index].id,
                        text: result_Var.data[index].name
                    }));                     
                 }); 


            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
        
        }
    }); 
}

$(document).ready(function () {

    populateDepartments();
    populateLoactions();
                 
                table_Var = $('#mydatatable').DataTable({
                    "ajax": {
                        "url": "php/getAll.php",
                        "type": "POST"
                    },
                    responsive: true,
                    "scrollX": false, 
                    "bPaginate": false,
                    "bInfo" : false,
                    "scrollY": "60vh", 
                    "order": [[ 2, "asc" ]],                
                    columnDefs: [{
                        "defaultContent": "-",
                        "targets": "_all",
                        "orderable": false, "targets": [7, 8] 
                      }],
                    data: information_Var,
                    columns: [
                        { data:'id', className: 'id', title: 'ID' },
                        { data:'firstName', className: 'fName', title: 'First Name' },
                        { data:'lastName', className: 'lName', title: 'Last Name' },
                        { data:'department', className: 'dept', title: 'Department' },
                        { data:'location', title: 'Location' },
                        { data:'jobTitle', className: 'job', title: 'Job Title' },
                        { data:'email', className: 'email', title: 'Email' },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-secondary editPer"><i class="fas fa-edit"></i></button>`;  
                            }
                        },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-danger deletePer"><i class="fas fa-trash-alt"></i></button>`;
                        }
                    } 
                    ],
                    initComplete: function () {
                        this.api().columns([3,4,5]).every( function () {
                            var column = this;
                            var select = $(`<select class="form-control"><option value="">Filter by..</option></select>`)
                                .appendTo( $(column.footer()).empty() )
                                .on( 'change', function () {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );
             
                                    column
                                        .search( val ? '^'+val+'$' : '', true, false )
                                        .draw();
                                } );
             
                            column.data().unique().sort().each( function ( d, j ) {
                                select.append( '<option value="'+d+'">'+d+'</option>' )
                            } );
                        } );
                        
                        
                    }
                     
                 });

                 table_Var.columns( [0] ).visible( false );

                 
                 table2_Var = $('#mydatatable2').DataTable({
                    "ajax": {
                        "url": "php/getAllDepartments.php",
                        "type": "POST"
                    },
                    responsive: true,
                    "scrollX": false, 
                    "bPaginate": false,
                    "bInfo" : false,
                    "scrollY": "60vh",                
                    columnDefs: [{
                        "defaultContent": "-",
                        "targets": "_all",
                        "orderable": false, "targets": [3] 
                      }],
                    data: information_Var,
                    columns: [
                        { data:'id', className: 'id', title: 'ID' },
                        { data:'name', className: 'name', title: 'Name' },
                        { data:'location', className: 'loc', title: 'Location' },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-danger deleteDept"><i class="fas fa-trash-alt"></i></button>`;
                        }
                    } 
                    ],                              
                 });

                 table2_Var.columns( [0] ).visible( false );

                 
                 table3_Var = $('#mydatatable3').DataTable({
                    "ajax": {
                        "url": "php/getAllLocations.php",
                        "type": "POST"
                    },
                    responsive: true,
                    "scrollX": false, 
                    "bPaginate": false,
                    "bInfo" : false,
                    "scrollY": "60vh",                
                    columnDefs: [{
                        "defaultContent": "-",
                        "targets": "_all",
                        "orderable": false, "targets": [2] 
                      }],
                    data: information_Var,
                    columns: [
                        { data:'id', className: 'id', title: 'ID' },
                        { data:'name', className: 'name', title: 'Name' },
                        {
                            data: "ID",
                            render:function (data, type, row) {
                                    return `<button type="button" class="btn btn-danger deleteLoc"><i class="fas fa-trash-alt"></i></button>`;
                        }
                    } 
                    ],                              
                 });

                 table3_Var.columns( [0] ).visible( false );

});


$('#scrollButton').click(function() {
    $("div.dataTables_scrollBody").scrollTop(0);
});

$('#refreshButton').click(function() {
    table_Var.ajax.reload(null, false);
    table2_Var.ajax.reload(null, false);
    table3_Var.ajax.reload(null, false);
});

$('.nav-link').click(function() {
    $($.fn.dataTable.tables(true)).DataTable()
      .columns.adjust()
      .responsive.recalc();
});

$('#mydatatable').on('click','.deletePer',function(){ 
    var row = $(this).closest('tr');
    var id = $('#mydatatable').DataTable().row(row).data().id;
    var delName = $('#mydatatable').DataTable().row(row).data().firstName;
    var delLName = $('#mydatatable').DataTable().row(row).data().lastName;
_
    $('#delTitle').html(`Removing ${delName} ${delLName} from Staff`);
    $('#del_Popup_Var').modal('show');
    
    $( "#saveDel" ).click(function() {
        $.ajax({
            url: 'php/deletePersonnel.php',
            type: 'post',
            data: {
                id: id
            },
            success: function(response) {
                $('#del_Alert_Var').html(`${delName} ${delLName} removed from staff.`)
                $('#del_Popup_Var').modal('hide');
                $("#del_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                    $("#del_Alert_Var").alert('hide');
                });
                    table_Var.ajax.reload(null, false);
                }
        
        });
      });   
    });


    $('#mydatatable').on('click','.editPer',function(){
        var row = $(this).closest('tr');
        var id = $('#mydatatable').DataTable().row(row).data().id;

        $.ajax({
            url: 'php/getPersonnel.php',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function(result_Var) {

                if (result_Var.status.name == "ok") {
                    var fName_Var = result_Var.data[0].firstName;
                    var lName_Var = result_Var.data[0].lastName;
                    var job_Var = result_Var.data[0].jobTitle;
                    var email_Var = result_Var.data[0].email;
                    var idNum_Var = parseInt(id, 10);

                    if (Number.isInteger(idNum_Var)) {
                        console.log(id);
                    }
                    
                    $('#ufName').val(fName_Var);
                    $('#ulName').val(lName_Var);
                    $('#ujobTitle').val(job_Var);
                    $('#uemail').val(email_Var);
                    $('#uid').val(idNum_Var);

                    $('#update_Popup_Var').modal('show');
                        
    
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        
        });   
    });

                


    $('#deptForm').on('submit', function (event) {
        event.preventDefault();

        var dName = $("#dName").val();
        var dLocation = $("#location_Select_Var").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                dName: dName,
                dLocation: dLocation
            },
            success: function(data){
                $("#dept_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                    $("#dept_Alert_Var").alert('hide');
                });
                table_Var.ajax.reload(null, false);
                table2_Var.ajax.reload(null, false);
                table3_Var.ajax.reload(null, false);
                populateDepartments();
                $('#openMenu').hide();
                $('#dept_Popup_Var').modal('hide');
            }
        })
    });

    $('#locForm').on('submit', function (event) {
        event.preventDefault();

        var locName = $("#locName").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                locName: locName,
            },
            success: function(data){
                $("#loc_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                    $("#loc_Alert_Var").alert('hide');
                });
                table_Var.ajax.reload(null, false);
                table2_Var.ajax.reload(null, false);
                table3_Var.ajax.reload(null, false);
                populateLoactions();
                $('#openMenu').hide();
                $('#loc_Popup_Var').modal('hide');
            }
        })
    });

    $('#perForm').on('submit', function (event) {
        event.preventDefault();

        var fName = $("#fName").val();
        var lName = $("#lName").val();
        var jobTitle = $("#jobTitle").val();
        var email = $("#email").val();
        var departmentSelect = $("#department_Select_Var").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                fName: fName,
                lName: lName,
                jobTitle: jobTitle,
                email: email,
                departmentSelect: departmentSelect
            },
            success: function(data){
                $("#per_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                    $("#per_Alert_Var").alert('hide');
                });
                table_Var.ajax.reload(null, false);
                $('#openMenu').hide();
                $('#per_Popup_Var').modal('hide');
            }
        })
    });
    
    $('#updateForm').on('submit', function (event) {
        event.preventDefault();

        var ufName = $("#ufName").val();
        var ulName = $("#ulName").val();
        var ujobTitle = $("#ujobTitle").val();
        var uemail = $("#uemail").val();
        var udepartmentSelect = $("#u_department_Select_Var").val();
        var uid = $("#uid").val();
    
        $.ajax({
            type: "POST",
            url: "php/server.php",
            data: {
                ufName: ufName,
                ulName: ulName,
                ujobTitle: ujobTitle,
                uemail: uemail,
                udepartmentSelect: udepartmentSelect,
                uid: uid
            },
            success: function(data){
                $("#update_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                    $("#update_Alert_Var").alert('hide');
                });
                table_Var.ajax.reload(null, false);
                $('#update_Popup_Var').modal('hide');
            }
        })
    });

    

    
    var delDeptSelect = '';

    $('#mydatatable2').on('click','.deleteDept',function(){ 
        var row = $(this).closest('tr');
        delDeptSelect = $('#mydatatable2').DataTable().row(row).data().id;
        var deptName = $('#mydatatable2').DataTable().row(row).data().name;    
                $.ajax({
                    type: "POST",
                    url: "php/server.php",
                    data: {
                         delDeptSelect: delDeptSelect
                    },
                    success: function(data){
                        $('#delDeptTitle').html(`Removing ${deptName} from Departments.`);
                        $('#del_Dept_Confirm_Popup_Var').modal('show');
                        
                        $('#saveDelDept').click(function() {
                            $.ajax({
                                type: "POST",
                                url: "php/deleteDepartment.php",
                                data: {
                                    delDeptSelect: delDeptSelect
                               },
                               success: function(data){
                                   console.log(delDeptSelect);
                                    $('#del_Dept_Alert_Var').html(`${deptName} removed from Departments.`)
                                    $('#del_Dept_Confirm_Popup_Var').modal('hide');
                                    $('#openMenu').hide();
                                    $("#del_Dept_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                                        $("#del_Dept_Alert_Var").alert('hide');
                                    });
                                        table_Var.ajax.reload(null, false);
                                        table2_Var.ajax.reload(null, false);
                                        table3_Var.ajax.reload(null, false);
                                        populateDepartments();
                               },
                            })
                        });
                    },
                    error: function() {
                        $('#del_Dept_Alert_Var').html(`Cannot remove ${deptName} whilst staffed!`)
                        $('#openMenu').hide();
                        $("#del_Dept_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                            $("#del_Dept_Alert_Var").alert('hide');
                        });
                    }
                })       
        });

    
    var delLocSelect = '';

    $('#mydatatable3').on('click','.deleteLoc',function(){ 
        var row = $(this).closest('tr');
        delLocSelect = $('#mydatatable3').DataTable().row(row).data().id;
        var locName = $('#mydatatable3').DataTable().row(row).data().name;    
                $.ajax({
                    type: "POST",
                    url: "php/server.php",
                    data: {
                         delLocSelect: delLocSelect
                    },
                    success: function(data){
                        $('#delLocTitle').html(`Removing ${locName} from Locations.`);
                        $('#del_Loc_Confirm_Popup_Var').modal('show');
                        
                        $('#saveDelLoc').click(function() {
                            $.ajax({
                                type: "POST",
                                url: "php/deleteLocation.php",
                                data: {
                                    delLocSelect: delLocSelect
                               },
                               success: function(data){
                                   console.log(delLocSelect);
                                    $('#del_Loc_Alert_Var').html(`${locName} removed from Locations.`)
                                    $('#del_Loc_Confirm_Popup_Var').modal('hide');
                                    $('#openMenu').hide();
                                    $("#del_Loc_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                                        $("#del_Loc_Alert_Var").alert('hide');
                                    });
                                        table_Var.ajax.reload(null, false);
                                        table2_Var.ajax.reload(null, false);
                                        table3_Var.ajax.reload(null, false);
                                        populateLoactions();
                               },
                            })
                        });
                    },
                    error: function() {
                        $('#del_Loc_Alert_Var').html(`Cannot remove ${locName} whilst staffed!`)
                        $('#openMenu').hide();
                        $("#del_Loc_Alert_Var").fadeTo(3000, 500).slideUp(500, function(){
                            $("#del_Loc_Alert_Var").alert('hide');
                        });
                    }
                })       
        });


