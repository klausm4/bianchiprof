
<?php

/**
 * This example shows making an SMTP connection with authentication.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);


//Server settings
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
$mail->isSMTP();
$mail->CharSet = 'UTF-8';                                          //Send using SMTP
$mail->Host       = 'mail.bianchiprof.com';                     //Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
$mail->Username   = 'admin@bianchiprof.com';                     //SMTP username
$mail->Password   = 'lahm5bu7';                               //SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
$mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

//Recipients
$mail->setFrom('admin@bianchiprof.com', 'Bianchiprof.com');
$mail->addAddress($_POST['mainMail']);     //Add a recipient
$mail->addAddress($_POST['copyMail']);
// $mail->addAddress('admin@bianchiprof.com');     //Add a recipient
// $mail->addAddress('ellen@example.com');               //Name is optional
// $mail->addReplyTo('info@example.com', 'Information');
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

//Attachments
// $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

//Content

$mail->isHTML(true);                                  //Set email format to HTML
$mail->Subject = 'Сообщение с сайта';
$mail->Body    = 'Ім"я: ' . $_POST['userName'] . $_POST['userNameModal'] . '<br/>' . 'Телефон: ' . $_POST['telephone'] . $_POST['telephoneModal'] . '<br/>' . 'Напрямок: ' . $_POST['direction'] . $_POST['directionModal'] . '<br/>' . 'Місто: '  . $_POST['city'] . $_POST['cityModal'];
// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$mail->send();

// if (!$mail->send()) {
//     $message = 'error';
// } else {
//     $message = 'dataSent';
// }
// $response = ['message' => $message];
// header("Content-type: application/json; charset=utf-8");
// echo json_encode($response);
?>