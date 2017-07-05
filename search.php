<?php include_once 'database.php'; ?>

<?php

	// create a variable

	$checkContact = $_POST['checkContact'];
	$checkApDate = $_POST['checkApDate'];

	$result = mysqli_query($connect, "SELECT * FROM appointments WHERE contact = '".$checkContact."' and apDate = '".$checkApDate."'");
	if(mysqli_num_rows($result)>0){
		while($row = mysqli_fetch_assoc($result)){
			echo '<table class="table table-striped table-condensed"><tbody><tr><td>'.$row["name"].'</td><td>'.$row["email"].'</td><td>'.$row["contact"].'</td><td>'.$row["ptime"].'</td><td>'.$row["apDate"].'</td><td>'.$row["appointmentfor"].'</td></tr></tbody></table>';
		}
	}
	else{
		echo "No results Found";
	}

?>