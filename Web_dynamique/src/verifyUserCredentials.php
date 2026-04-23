<?php 

/**
 * Vérifie les identifiants et retourne l'utilisateur ou false
 */
function verifyUserCredentials($username, $password) {
    $filePath = 'users.json';
    
    if (!file_exists($filePath)) {
        return false;
    }

    $users = json_decode(file_get_contents($filePath), true);
    if (!is_array($users)) {
        return false;
    }
    
    foreach ($users as $user) {
        if ($user['username'] === $username && password_verify($password, $user['password'])) {
            return $user; 
        }
    }

    return false;
}

