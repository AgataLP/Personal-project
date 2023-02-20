<?php include('php/server.php'); ?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>CompanyDirectory</title>
        <meta name="description" content="CompanyDirectory">
        <meta name="author" content="unknow">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/datatables.css"/>
        <link rel="stylesheet" href="css/responsiveDatatables.css"/>
        <link rel="stylesheet" href="css/companyDirectory.css">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/load2.gif">

        <script src="https://kit.fontawesome.com/6edf9b9c75.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="preloader-wrapper">
            <div class="preloader d-flex justify-content-center align-items-center">
                <img src="assets/load2.gif">
            </div>
        </div>
        <nav id="headerBar">  
        <img  width="100" height="100"  src="assets/load2.gif">                  
            <h1 id="company">Company</h1>
            <h1 id="directory">Directory</h1>
        </nav>

       

        <div class="modal fade" id="dept_Popup_Var" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div class="modal-dialog   modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Department</h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <form action="php/server.php" method="post" id="deptForm" class="form-horizontal">
                    <div class="form-group">
                        <label class='col-auto control-label' for='textinput'>Department Name</label>
                        <div class="col-md-7">
                            <input type='text' id='dName' name="departmentname" placeholder="enter department name" class="form-control input-md">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='col-auto control-label' for='selectbasic'>Location</label>
                        <div class="col-md-7">
                            <select id='location_Select_Var' name='location' class="form-control"></select>
                        </div>        
                    </div>    
                    </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeDept" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                        <input type="submit" class="btn btn-primary" name="saveDept" form="deptForm" value="Submit"></input> 
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-success" id="dept_Alert_Var" role="alert" style="display: none">
        New department added successfully!
        </div>

       

        <div class="modal fade" id="loc_Popup_Var" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div class="modal-dialog   modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Location</h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <form action="php/server.php" method="post" id="locForm">
                    <div class="form-group">
                        <label class='col-auto control-label' for='textinput'>Location Name</label>
                        <div class='col-md-7'>
                            <input type='text' id='locName' name="locationname" placeholder="enter location name" class="form-control input-md">
                        </div>
                    </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeLoc" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                        <input type="submit" class="btn btn-primary" name="saveLoc" form="locForm" value="Submit"></input> 
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-success" id="loc_Alert_Var" role="alert" style="display: none">
        New location added successfully!
        </div>

       

        <div class="modal fade" id="per_Popup_Var" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div class="modal-dialog   modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Staff Member</h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <form action="php/server.php" method="post" id="perForm">
                        <div class="form-group">
                            <label class='col-auto control-label' for='textinput'>First Name</label>
                            <div class='col-md-7'>
                                <input type='text' id='fName' name="firstname" placeholder="First Name" class="form-control input-md">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class='col-auto control-label' for='textinput'>Last Name</label>
                            <div class='col-md-7'>
                                <input type='text' id='lName' name="lastname" placeholder="Last Name" class="form-control input-md">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class='col-auto control-label' for='textinput'>Job Title</label>
                            <div class='col-md-7'>
                                <input type='text' id='jobTitle' name="jobtitle" placeholder="Job Title" class="form-control input-md">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class='col-auto control-label' for='textinput'>email</label>
                            <div class='col-md-7'>
                                <input type='text' id='email' name="email" placeholder="Email Address" class="form-control input-md">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class='col-auto control-label' for='selectbasic'>Department</label>
                            <div class='col-md-7'>
                                <select id='department_Select_Var' name='department' class="form-control"></select>     
                            </div>
                        </div>                 
                    </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closePer" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                        <input type="submit" class="btn btn-primary" name="savePer" form="perForm" value="Submit"></input> 
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-success" id="per_Alert_Var" role="alert" style="display: none">
        New staff member added successfully!
        </div>

       

        <div class="modal fade" id="update_Popup_Var" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div class="modal-dialog   modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update Staff Details</h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                    <form action="php/server.php" method="post" id="updateForm" class="form-horizontal">
                        <input type='hidden' id='uid' name='uid'>
                        <div class="form-group">
                            <label class='col-md-4 control-label' for='textinput'>First Name</label>
                            <div class='col-md-8'>
                                <input type='text' id='ufName' name="ufirstname" class="form-control input-md" placeholder="First Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class='col-md-4 control-label' for='textinput'>Last Name</label>
                            <div class="col-md-8">
                                <input type='text' id='ulName' name="ulastname" class="form-control input-md" placeholder="Last Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class='col-md-4 control-label' for='textinput'>Job Title</label>
                            <div class="col-md-8">
                                <input type='text' id='ujobTitle' name="ujobtitle" class="form-control input-md" placeholder="Job Title">
                            </div>    
                        </div>  
                        <div class="form-group">
                            <label class='col-md-4 control-label' for='textinput'>email</label>
                            <div class="col-md-8">
                                <input type='text' id='uemail' name="uemail" class="form-control input-md" placeholder="email">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class='col-md-4 control-label' for='selectbasic'>Department</label>
                            <div class="col-md-8">
                                <select id='u_department_Select_Var' name='udepartment' class="form-control"></select> 
                            </div>
                        </div>  
                    </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeUpdate" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                        <input type="submit" class="btn btn-primary" name="saveUpdate" form="updateForm" value="Submit"></input> 
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-success" id="update_Alert_Var" role="alert" style="display: none">
        Staff details updated!
        </div>
 
        <div class="modal fade" id="del_Popup_Var" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div class="modal-dialog   modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="delTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeDel" class="btn btn-secondary" data-mdb-dismiss="modal">No</button>
                        <input type="submit" class="btn btn-primary" name="saveDel" id="saveDel" value="Yes"></input> 
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-danger" id="del_Alert_Var" role="alert" style="display: none">
        
        </div>

     
        <div class="modal fade" id="del_Dept_Confirm_Popup_Var" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div class="modal-dialog   modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="delDeptTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeDelDept" class="btn btn-secondary" data-mdb-dismiss="modal">No</button>
                        <input type="submit" class="btn btn-primary" name="saveDelDept" id="saveDelDept" value="Yes"></input> 
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-danger" id="del_Dept_Alert_Var" role="alert" style="display: none">
        
        </div>

       
        <div class="modal fade" id="del_Loc_Confirm_Popup_Var" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div class="modal-dialog   modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="delLocTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeDelLoc" class="btn btn-secondary" data-mdb-dismiss="modal">No</button>
                        <input type="submit" class="btn btn-primary" name="saveDelLoc" id="saveDelLoc" value="Yes"></input> 
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-danger" id="del_Loc_Alert_Var" role="alert" style="display: none">
        
        </div>

      
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" href="#tab-table1" data-toggle="tab">Personnel</a>
            </li>
            <li>
                <a class="nav-link" href="#tab-table2" data-toggle="tab">Departments</a>
            </li>
            <li>
                <a class="nav-link" href="#tab-table3" data-toggle="tab">Locations</a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active container-fluid" id="tab-table1">
                <div>
                    <button type="button" id="addPer" class="btn btn-secondary text-right"><i class="fas fa-user"></i>&nbsp&nbsp<i class="fas fa-plus"></i></button>
                </div>
                <table class="table table-striped wrap" id="mydatatable">
                    <thead>
                        <tr>
                            <th class="all">ID</th>
                            <th class="all">First Name</th>
                            <th class="all">Last Name</th>
                            <th class="desktop">Department</th>
                            <th class="desktop">Location</th>
                            <th class="desktop">Job Title</th>
                            <th class="desktop">email</th> 
                            <th class="all"></th>
                            <th class="all"></th>                        
                        </tr>
                    </thead>
                    
                    <tfoot>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Department</th>
                            <th>Job Title</th>
                            <th>email</th>
                            <th>Location</th>
                            <th></th>   
                            <th></th>                        
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="tab-pane container-fluid" id="tab-table2">
                <div>
                    <button type="button" id="addDept" class="btn btn-secondary text-right"><i class="fas fa-users"></i>&nbsp&nbsp<i class="fas fa-plus"></i></button>
                </div>
                <table class="table table-striped wrap" id="mydatatable2">
                    <thead>
                        <tr>
                            <th class="all">ID</th>
                            <th class="all">Name</th>
                            <th class="all">Location</th>
                            <th class="all"></th>                      
                        </tr>
                    </thead>
                    
                    <tfoot>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th></th>                      
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="tab-pane container-fluid" id="tab-table3">
                <div>
                    <button type="button" id="addLoc" class="btn btn-secondary text-right"><i class="fas fa-globe-americas"></i>&nbsp&nbsp<i class="fas fa-plus"></i></button>
                </div>
                <table class="table table-striped wrap" id="mydatatable3">
                    <thead>
                        <tr>
                            <th class="all">ID</th>
                            <th class="all">Name</th>
                            <th class="all"></th>                      
                        </tr>
                    </thead>
                    
                    <tfoot>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th></th>                      
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        

        <div id="scrollButton">
            <button type="button" class="btn btn-secondary text-right"><i class="fas fa-arrow-up"></i></button>
        </div>

        <div id="refreshButton">
            <button type="button" class="btn btn-secondary text-right"><i class="fas fa-sync-alt"></i></button>
        </div>

      
        
        <script type="application/javascript" src="js/jquery-2.2.3.min.js"></script>
        <script type="application/javascript" src="js/bootstrap.min.js"></script>
        <script type="application/javascript" src="js/jquery.dataTables.min.js"></script>
        <script type="application/javascript" src="js/dataTables.bootstrap4.min.js"></script>
        <script type="application/javascript" src="js/dataTables.responsive.min.js"></script>
        <script type="application/javascript" src="js/responsive.bootstrap.min.js"></script>
        <script type="application/javascript" src="js/preloader.js"></script>
        <script type="application/javascript" src="js/script.js"></script>
    </body>
</html>