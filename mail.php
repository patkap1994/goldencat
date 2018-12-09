<?php 

  if(isset($_POST['submit'])) {
    $mail = $_POST['email'];
    $message = $_POST['message'];
  }

  $mailTo = 'patryk.kapkowski@gmail.com';
  $subject = 'Fotobudka';
  $header = 'From: '.$mail;

  mail($mailTo, $subject, $message);
  header('Location: index.html');

?>