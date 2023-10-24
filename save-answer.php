<?php

 // Получение данных из запроса POST и сохранение в переменные

 $answer = $_POST['answer'];
 
  // Сохраняем ответ в базе данных
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "puzzle";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
  }

  // Создание SQL-запроса для вставки данных в таблицу
  $sql = "INSERT INTO answers (answer) VALUES ('$answer')";

  // Выполнение SQL-запроса
  if ($conn->query($sql) === TRUE) {
    $response = array('status' => 'success', 'message' => 'Ответ успешно сохранен в базе данных!');
    echo json_encode($response);
  } else {
    $response = array('status' => 'error', 'message' => 'Ошибка сохранения ответа в базе данных: ' . $conn->error);
    echo json_encode($response);
  }

$conn->close();

?>

