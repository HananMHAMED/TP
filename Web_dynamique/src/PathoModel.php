<?php

class PathoModel {
    private $db_handler;

    public function __construct($db_handler) {
        $this->db_handler = $db_handler;
    }

    public function getPathoDetail($id_patho) {

        // Requête pour les infos de la pathologie
        $sql_detail = "
        SELECT 
            patho.type,
            patho.desc,
            meridien.nom AS nom_meridien 
        FROM patho 
        INNER JOIN meridien ON patho.mer = meridien.code 
        WHERE patho.idp = :id";

        return $this->db_handler->get_data(
            sql: $sql_detail,
            filter_list: [':id' => $id_patho]
        );
    }

    public function getPathoSymptomes($id_patho) {

        // Requête pour les symptômes
        $sql_symp = "SELECT S.desc AS symptome_desc 
                     FROM symptome S 
                     JOIN patho P ON S.ids = P.idp 
                     WHERE P.idp = :id";

        return $this->db_handler->get_data(
            sql: $sql_symp,
            filter_list: [':id' => $id_patho]
        );
    }

    public function searchPatho($search) {

        // Recherche par mot-clé
        $sql_search = 'SELECT * FROM patho WHERE "desc" ILIKE :search';
        $params_search = [':search' => '%' . $search . '%'];

        return $this->db_handler->get_data(
            sql: $sql_search,
            filter_list: $params_search
        );
    }

    public function getFilteredPathos($filter_list = []) {

        // si pas de mot-clé on continue avec les filtres existants
        return $this->db_handler->get_data(
            table: "patho",
            filter_list: $filter_list
        );
    }

    public function getAllMeridiens() {

        // récupérer les informations sur les méridiens
        return $this->db_handler->get_data(table: "meridien");
    }

    public function getMerFilters() {

        // Récupérer les différentes noms de méridiens
        return $this->db_handler->get_data(
            sql: "SELECT mer FROM patho GROUP BY mer"
        );
    }

    public function getTypeFilters() {

        // Récupérer les différents noms de types
        return $this->db_handler->get_data(
            sql: "SELECT type FROM patho GROUP BY type"
        );
    }
}