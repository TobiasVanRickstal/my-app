<?php

$server =  'localhost';
$username =  'root';
$password =  '';
$db =  'smokeapp';

$conn = mysqli_connect($server, $username, $password, $db);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
$sql = "SELECT * FROM `users`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo $row['name'];
  }
} else {
  echo "0 results";
}
$conn->close();
?>
<!-- COMMAND   LINE TO RUN PHP   SERVER -->
<!-- php -S localhost:8000 -->