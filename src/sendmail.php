<?php
// Файлы phpmailer
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['userName'];
$nameModal = $_POST['userNameModal'];
$telephone = $_POST['telephone'];
$telephoneModal = $_POST['telephoneModal'];
$direction = $_POST['direction'];
$directionModal = $_POST['directionModal'];
$city = $_POST['city'];
$cityModal = $_POST['cityModal'];

// Формирование самого письма
$title = "Копія заявки з сайта bianchiprof.com";
$body = "
<h2>Заявка з сайта bianchiprof.com</h2>
<b>Им'я:</b> $name $nameModal<br>
<b>Телефон:</b> $telephone $telephoneModal<br>
<b>Напрямок:</b> $direction $directionModal<br>
<b>Місто:</b>$city $cityModal
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'mail.bianchiprof.com'; // SMTP сервера вашей почты
    $mail->Username   = 'task@bianchiprof.com'; // Логин на почте
    $mail->Password   = 'taskbianchi'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('task@bianchiprof.com', 'Менеджер задач'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('harmash@bianchiprof.com');  
   // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму
// if (!empty($file['name'][0])) {
//     for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
//         $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
//         $filename = $file['name'][$ct];
//         if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
//             $mail->addAttachment($uploadfile, $filename);
//             $rfile[] = "Файл $filename прикреплён";
//         } else {
//             $rfile[] = "Не удалось прикрепить файл $filename";
//         }
//     }   
// }
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);