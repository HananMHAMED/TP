<?php
require_once 'config.php';

$error = null;

if (isset($_SESSION['user'])) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Utilisation de notre nouvelle fonction
    $userData = verifyUserCredentials($username, $password);

    if ($userData) {
        
        $_SESSION['user'] = $userData['username'];
        
        header('Location: index.php');
        exit;
    } else {
        $error = "Identifiants incorrects ou base introuvable.";
    }
}

echo $twig->render('login.html.twig', ['error' => $error]);