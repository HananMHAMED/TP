<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../JwtUtils.php';

use App\Models\Utils\JwtUtils;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$db_handler = new Db_handler($_ENV);

try {
    $access_token = JwtUtils::getAccessTokenFromRequest();
    $access_token_validity = JwtUtils::checkAccessToken($access_token);
} catch (RuntimeException $e) {
    http_response_code(401);
    echo json_encode(['error' => 'Authorization header is not valid']);
    exit;
}

if ($access_token_validity === JwtUtils::STATUS_VALID) {
    $action = $_GET['action'] ?? null;

    switch ($action) {

        case 'pathos':
            $meridien = $_GET["filterMeridien"] ?? null;
            $type     = $_GET["filterType"] ?? null;

            $filter_list = [];
            if ($meridien !== null && $meridien !== '') {
                $filter_list[] = ['mer', $meridien];
            }
            if ($type !== null && $type !== '') {
                $filter_list[] = ['type', $type];
            }

            $data = $db_handler->get_data(table: "patho", filter_list: $filter_list);
            http_response_code(200);
            echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            break;

        case 'patho_detail':
            $id = $_GET['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'ID manquant']);
                exit;
            }

            $data = $db_handler->get_data(null, [':id' => $id], "
                SELECT patho.type, patho.desc, meridien.nom AS nom_meridien
                FROM patho
                INNER JOIN meridien ON patho.mer = meridien.code
                WHERE patho.idp = :id");
            http_response_code(200);
            echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            break;

        case 'meridiens':
            $data = $db_handler->get_data(table: "meridien");
            http_response_code(200);
            echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            break;

        default:
            http_response_code(400);
            echo json_encode(['error' => 'Action inconnue. Actions disponibles : pathos, patho_detail, meridiens'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            break;
    }
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid or expired token']);
}
