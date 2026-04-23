<?php
// On démarre la session pour tout le monde
session_start();

//Pour le JWT
require_once 'verifyUserCredentials.php';

// Autoload des classes (Twig, etc.)
spl_autoload_register(function ($classname) {
    $filename = ltrim(str_replace('\\', '/', $classname)) .'.php';
    if (file_exists($filename)) require_once $filename;
});

// Configuration Twig
$loader = new \Twig\Loader\FilesystemLoader('templates/');
$twig = new \Twig\Environment($loader);
$twig->addGlobal('user', $_SESSION['user'] ?? null);

