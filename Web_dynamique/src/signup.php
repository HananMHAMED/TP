<?php
require_once 'config.php'; // Charge $twig, $db et session_start() d'un coup !

$error = null;
$success = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $json_file = 'users.json';

    if (!empty($username) && !empty($password)) {
        // 1. Charger les utilisateurs existants
        $users = [];
        if (file_exists($json_file)) {
            $users = json_decode(file_get_contents($json_file), true) ?? [];
        }

        // 2. Vérifier si le nom d'utilisateur est déjà pris
        $exists = false;
        foreach ($users as $user) {
            if ($user['username'] === $username) {
                $exists = true;
                break;
            }
        }

        if ($exists) {
            $error = "Ce nom d'utilisateur est déjà utilisé.";
        } else {
            // 3. Hacher le mot de passe et ajouter l'utilisateur
            $newUser = [
                'username' => $username,
                'password' => password_hash($password, PASSWORD_DEFAULT) // Hachage
            ];
            $users[] = $newUser;

            // 4. Sauvegarder dans le fichier JSON
            if (file_put_contents($json_file, json_encode($users, JSON_PRETTY_PRINT))) {
                $success = "Compte créé avec succès ! <a href='login.php'>Connectez-vous ici</a>";
            } else {
                $error = "Erreur lors de l'enregistrement.";
            }
        }
    } else {
        $error = "Veuillez remplir tous les champs.";
    }
}

// Affichage via Twig
echo $twig->render('signup.html.twig', ['error' => $error, 'success' => $success]);