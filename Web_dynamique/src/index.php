<?php
require_once 'config.php';
require_once 'PathoController.php';
require_once 'PathoModel.php';
require_once 'JwtUtils.php';

$db_handler = new Db_handler($_ENV);
$patho_model = new PathoModel($db_handler);
$patho_controller = new PathoController($patho_model, $twig);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $route = $_POST['route'] ?? '';
    if ($route === 'api/login' || $route === 'api/login.php') {
        require 'api/login.php';
        exit;
    } 
}
else{
// 1. On récupère la route demandée via le .htaccess
$route = $_GET['route'] ?? '';

// 2. LE ROUTEUR : On aiguille vers le bon fichier
if ($route === 'login.php' || $route === 'login') {
    require 'login.php';
    exit;
} 

if ($route === 'signup.php' || $route === 'signup') {
    require 'signup.php';
    exit;
}

if ($route === 'logout.php' || $route === 'logout') {
    require 'logout.php';
    exit;
}

if ($route === 'api/info.php' || $route === 'api/info') {
    require 'api/info.php';
    exit;
}

// 3. Si aucune route spéciale, on continue avec ton code actuel (Détail ou Liste)
$id_patho = $_GET['id'] ?? null;

if ($id_patho) {
    $patho_controller->showDetail($id_patho);
} else {
    $patho_controller->showList();
}

}