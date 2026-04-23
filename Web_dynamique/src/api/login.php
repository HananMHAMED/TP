<?php
require_once __DIR__ . '/../verifyUserCredentials.php';
require_once __DIR__ . '/../JwtUtils.php';

use App\Models\Utils\JwtUtils;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $userData = verifyUserCredentials($username, $password);

    if ($userData) {
        $access_token = JwtUtils::newAccessToken(['username' => $userData['username']]);
        http_response_code(200);
        echo json_encode($access_token);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}