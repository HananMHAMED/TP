<?php
// On ne fait PLUS session_start() ici, car index.php l'a déjà fait via config.php
require_once 'config.php';

// 1. On vide la variable de session
$_SESSION = array();

// 2. On détruit le cookie de session (optionnel mais propre)
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// 3. On détruit la session sur le serveur
session_destroy();

// 4. On redirige. 
// Note : Comme on est dans index.php, on redirige vers la racine.
header("Location: index.php");
exit;