<?php include_once 'database.php'; ?>

<?php

	// create a variable
	$name = $_POST['name'];
	$email = $_POST['email'];
	$contact = $_POST['contact'];
	$ptime = $_POST['ptime'];
	$apDate = $_POST['apDate'];
	$appointmentfor = $_POST['appointmentfor'];

	mysqli_query($connect, "INSERT INTO appointments (name, email, contact, ptime, apDate, appointmentfor) VALUES ('".$name."','".$email."','".$contact."','".$ptime."','".$apDate."','".$appointmentfor."')");

	if(mysqli_affected_rows($connect) > 0){
		echo "<span style='display: block; padding: 10px 15px; color: #2E6A00; border: 2px solid #2E6A00;'>Appointment Added</span>";
	} else {
		echo "<span style='display: block; padding: 10px 15px; color: #D32F00; border: 2px solid #D32F00;'>Appointment NOT Added</span>";
		echo mysqli_error ($connect);
	}

?>