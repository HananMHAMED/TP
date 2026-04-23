<?php
class db_handler{
    private $db;
    private $sth;
    private $sql = "";
    private $data;
    private $params = [];

    public function __construct($env){
        $this->db = new PDO(
                            "pgsql:host=" . $env['DB_HOST'] . ";dbname=" . $env['DB_DB'],
                            $env['DB_USER'],
                            $env['DB_PASSWORD']
                            ); 
    }

    // Prend en entrée une table et une liste de filtre, où chaque élément est un couple (type de filtre, filtre)
    // Exemple: get_sql_request(patho, [("mer", "Poumon"), ("type", "me")])
    private function get_sql_request($table, $filter_list){

        $this->sql = "SELECT * FROM " . $table . " WHERE 1=1 ";
        $this->params = [];

        if (!empty($filter_list)) {
            foreach ($filter_list as $index => $filter){
                $param_name = ":filter" . $index;
                $this->sql = $this->sql . " AND " . $filter[0] . " = " . $param_name;
                $this->params[$param_name] = $filter[1];
            }
        }
    }

    private function fetch_db(){
        $this->sth = $this->db->prepare($this->sql);
        $this->sth->execute($this->params ?? []);
        $this->data = $this->sth->fetchAll();
    }
    
    public function get_data($table = null, $filter_list = [], $sql = ""){
        if ($table !== null && $sql === ""){
            $this->get_sql_request($table, $filter_list);
        } else {
            $this->sql = $sql;
            $this->params = $filter_list;
        }
        $this->fetch_db();
        return $this->data;
    }

}