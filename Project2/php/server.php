<?php
    
    $name = "";
    $locationID = "";

    include("config.php");
    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if (isset($_POST['dName'], $_POST['dLocation'])) {
        $name = $_POST['dName'];
        $locationID = $_POST['dLocation'];

        $query = "INSERT INTO department (name, locationID) VALUES ('$name', '$locationID')";
        mysqli_query($conn, $query);
        }

    if (isset($_POST['locName'])) {
        $locName = $_POST['locName'];

        $query = "INSERT INTO location (name) VALUES ('$locName')";
        mysqli_query($conn, $query);
        }

    if (isset($_POST['fName'], $_POST['lName'], $_POST['jobTitle'], $_POST['email'], $_POST['departmentSelect'])) {
        $firstname = $_POST['fName'];
        $lastname = $_POST['lName'];
        $jobtitle = $_POST['jobTitle'];
        $email = $_POST['email'];
        $departmentID = $_POST['departmentSelect'];

        $query = "INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES ('$firstname', '$lastname', '$jobtitle', '$email', '$departmentID')";
        mysqli_query($conn, $query);
        }

    if (isset($_POST['ufName'], $_POST['ulName'], $_POST['ujobTitle'], $_POST['uemail'], $_POST['udepartmentSelect'], $_POST['uid'])) {
        $ufirstname = $_POST['ufName'];
        $ulastname = $_POST['ulName'];
        $ujobtitle = $_POST['ujobTitle'];
        $uemail = $_POST['uemail'];
        $udepartmentID = $_POST['udepartmentSelect'];
        $uid = $_POST['uid'];

        $query = "UPDATE personnel SET firstName='$ufirstname', lastName='$ulastname', jobTitle='$ujobtitle', email='$uemail', departmentID='$udepartmentID' WHERE personnel.id=$uid";
        mysqli_query($conn, $query);                  
    }

    if (isset($_POST['delDeptSelect'])) {
        $delDeptId = $_POST['delDeptSelect'];
        $query = "SELECT 1 FROM personnel WHERE departmentID = $delDeptId";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result)==0) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }          
        
    }

    if (isset($_POST['delLocSelect'])) {
        $delLocid = $_POST['delLocSelect'];
        $query = "SELECT 1 FROM department WHERE locationID = $delLocid";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result)==0) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }    
        
        
        
    }

?>