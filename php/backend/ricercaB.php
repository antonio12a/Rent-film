<?php

/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: ricercaB.php gestisce la parte back-end della ricerca dei film
*/
include("db.php");
header("Content-type: application/json");
ensure_logged_in();
if(isset($_POST["action"])){
    if($_POST["action"] == "ricerca"){
        getFilm($_POST["stringa"]);
    }
}
//restituisce i film che hanno genere o titolo che contengo la stringa $stringa
function getFilm($stringa) {
    try {
        $db = connectDb();
        $stringa = strtolower($stringa);
        $stringa = htmlspecialchars($stringa);
        $stringa = $db -> quote($stringa);
        
        $stringa = str_replace("'", "%", $stringa);
        $query = "SELECT DISTINCT film.titolo, film.id FROM film WHERE LOWER(film.titolo) LIKE '$stringa' OR LOWER(film.genere) LIKE '$stringa'";
        $rows = $db->query($query);
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }

    
    returnJSON ($rows);
}
//stampa in formato json i film
function returnJSON($rows){
    $i = 1;
    $len = $rows->rowCount();
    if($len == 0){
       print "{ \"vuoto\": \"vuoto\" }";
    }
    else{
        print "{\"film\": [\n";
        foreach($rows as $row){
            print " {\"titolo\": \" ".$row["titolo"]." \", \"id\": \" ".$row["id"]." \"}";
            if($i < $len){
                print ",";
            }
            print "\n";
            $i++;
        }
        
        print " ]\n}";
    }
}
?>