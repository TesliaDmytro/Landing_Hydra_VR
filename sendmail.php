<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->IsHTML(true);

$mail->setFrom('info@Hydra.com', 'Letter From');
$mail->addAddress('jamk12345@gmail.com');
$mail->Subject = 'Hydra theme of message';

$body = '<h1>Hydra letter</h1>';

if(trim(!empty($_POST['firstName']))){
	$body.='<p><strong>firstName:</strong> '.$_POST['firstName'].'</p>';
}
if(trim(!empty($_POST['lastName']))){
	$body.='<p><strong>lastName:</strong> '.$_POST['lastName'].'</p>';
}
if(trim(!empty($_POST['email']))){
	$body.='<p><strong>email:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['phoneNumber']))){
	$body.='<p><strong>phoneNumber:</strong> '.$_POST['phoneNumber'].'</p>';
}
if(trim(!empty($_POST['subject']))){
	$body.='<p><strong>subject:</strong> '.$_POST['subject'].'</p>';
}
if(trim(!empty($_POST['text']))){
	$body.='<p><strong>text:</strong> '.$_POST['text'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'ERROR';
} else {
	$message = 'Your Message Sent';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>