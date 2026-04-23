<?php

class PathoController {
    private $patho_model;
    private $twig;

    public function __construct($patho_model, $twig) {
        $this->patho_model = $patho_model;
        $this->twig = $twig;
    }

    public function showDetail($id_patho) {

        // --- MODE DÉTAIL ---
        // Requête pour les infos de la pathologie
        $patho_info = $this->patho_model->getPathoDetail($id_patho);

        // Requête pour les symptômes
        $symptomes = $this->patho_model->getPathoSymptomes($id_patho);

        // On affiche le template de détail
        echo $this->twig->render('detail.html.twig', [
            'patho' => $patho_info[0] ?? null, //Pour éviter les soucis d'affichages
            'symptomes' => $symptomes
        ]);
    }

    public function showList() {

        $meridien = $_GET["filterMeridien"] ?? null;
        $type = $_GET["filterType"] ?? null;
        $search = $_GET["search"] ?? null;

        // Création de la liste de filtres
        $filter_list = [];

        if ($meridien !== null && $meridien !== '') {
            $filter_list[] = ['mer', $meridien];
        }

        if ($type !== null && $type !== '') {
            $filter_list[] = ['type', $type];
        }

        if ($search !== null && $search !== '' && isset($_SESSION['user'])) {
            // Recherche par mot-clé
            $data_patho = $this->patho_model->searchPatho($search);

        } else {
            // si pas de mot-clé on continue avec les filtres existants
            $data_patho = $this->patho_model->getFilteredPathos($filter_list);
        }

        // récupérer les informations sur les méridiens
        $data_meridien = $this->patho_model->getAllMeridiens();

        // Récupérer les différentes noms de méridiens
        $data_mer_filter = $this->patho_model->getMerFilters();

        // Récupérer les différents noms de types
        $data_type_filter = $this->patho_model->getTypeFilters();

        echo $this->twig->render(
            'pathos.html.twig', 
            [
                'data_patho' => $data_patho,
                'data_meridien' => $data_meridien,
                'data_mer_filter' => $data_mer_filter,
                'data_type_filter' => $data_type_filter
            ]
        );
    }
}