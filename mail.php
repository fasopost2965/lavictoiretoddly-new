<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email_content = "New Form Submission:\n\n";

    foreach ($_POST as $key => $value) {
        if (is_array($value)) {
            $value = implode(", ", $value);
        }
        $label = ucwords(str_replace(["-", "_"], " ", $key));
        $email_content .= "$label: $value\n";
    }

    // Handle uploaded files
    if (!empty($_FILES)) {
        foreach ($_FILES as $field => $file) {
            if ($file['error'] === UPLOAD_ERR_OK) {
                $email_content .= "File Uploaded - $field: " . $file['name'] . "\n";
            }
        }
    }

    // Set recipient and subject
    $to = "contact@groupelavictoire.com";
    $subject = "Nouvelle Pre-inscription (Ecole La Victoire)";
    $headers = "From: Website Form <no-reply@" . $_SERVER['SERVER_NAME'] . ">\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "✅ Merci ! Votre demande a bien été envoyée. Nous vous contacterons sous peu.";
    } else {
        http_response_code(500);
        echo "❌ Désolé, nous n'avons pas pu envoyer votre message. Veuillez réessayer plus tard.";
    }
} else {
    http_response_code(403);
    echo "Action interdite : Requête invalide.";
}
