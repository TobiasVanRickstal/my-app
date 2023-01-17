<?php
class Model
{
    private $server =  'localhost';
    private $username =  'root';
    private $password =  ' ';
    private $db =  'smokeapp';
    private $conn;

    public function __construct()
    {
        try {
            $this->conn = new PDO("mysql:host=$this->server;dbname=$this->db", $this->username, $this->password);
        } catch (PDOException  $e)  {
            echo  "Connection failed: " . $e->getMessage();
        }
    }

    public function findAll()
    {
        $data = [];

        $stmt  = $this->conn->prepare("SELECT * FROM 'users' ORDER BY 'id' ASC");
        if($stmt->execute()){
            $data = $stmt->fetchAll();
        }

        return $data;
    }
}