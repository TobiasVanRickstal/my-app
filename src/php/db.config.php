<?php
$message = "wrong answer";
echo "<script type='text/javascript'>alert('$message');</script>";

$server =  'localhost';
$username =  'root';
$password =  '';
$db =  'imd';

$conn = mysqli_connect($server, $username, $password, $db);

$conn->close();
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM `docent`";
$result = $conn->query($sql);

$data =  [];


if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
    echo $row['naam'];
  }
} else {
  echo "0 results";
}
$conn->close();

echo $data[0]['naam'];
echo json_encode($data);
return json_encode($data);
?>
<!-- COMMAND   LINE TO RUN PHP   SERVER -->
<!-- php -S localhost:8000 -->