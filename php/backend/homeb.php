
<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: homeb.php gestisce la parte back-end della home page
*/
include("db.php");
ensure_logged_in();
$NUM_FILM_RIGA = 5;
header("Content-type: application/json");
switch($_POST["action"]){
    case "richiestaGeneri":
        getGeneri();
        break;
    case "richiestaFilm":
        getFilmGenere($_POST["genere"], $_POST["numPage"]);
        break;
    case "richiestaUltima":
        getUltima($_POST["genere"]);
        break;

}
//restituisce al client il numero di pagine dei film di un determinato genere
function getUltima($genere){
    try {
        $db = connectDb();
        $genere = strtolower($genere);
        $genere = htmlspecialchars($genere);
        $genere = $db->quote($genere);
        $query = "SELECT COUNT(*) AS count FROM film WHERE LOWER(genere) = $genere";
        
        $rows = $db->query($query);
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
    foreach($rows as $row){
        print " {\n \"ultima\": ".$row["count"]."\n}";
    }
}

//restituisce al client i tutti i generei dei film
function getGeneri(){
    try {
        $db = connectDb();
        $query = 'SELECT DISTINCT genere
                      FROM film';

        $rows = $db->query($query);
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
    returnJSONGeneri ($rows);
}

//stampa in json i generi
function returnJSONGeneri($rows){
    $len = $rows->rowCount();
    print"{\n\"generi\": [\n";
    $i = 0;
    foreach($rows as $row){
        print" {\"genere\": \" ".$row["genere"]."\"}\n";
        if($i < $len - 1){
            print(",");
        }
        print("\n");
        $i++;
    }
    print" ]\n}";
    
}
// restituisce i film di una determinata pagina di un determinato genere
function getFilmGenere($genere, $pagina ) {
        try {
            $db = connectDb();
            $gen = strtolower($genere);
            $gen = htmlspecialchars($gen);
            $gen = $db -> quote($gen);
            $query = "SELECT DISTINCT film.titolo, film.id FROM film WHERE LOWER(film.genere) = $gen";
            $rows = $db->query($query);
        } catch (PDOException $ex) {
            die('Database error: ' . $ex->getMessage());
        }

        //creazione del file json con i dati ottenuti dall'esecuzione della query
        returnJSON ($genere, $pagina, $rows);
}
//stampa in formato json i film 
function returnJSON($genere, $pagina, $rows){
    print "{\n\"genere\": "."\"".$genere."\"".",\n";
    $nPagina = (int)$pagina;
    print "\"film\": [\n";
    $i = 1;
    $num = 1;
    global $NUM_FILM_RIGA;
    $len = $rows->rowCount();
    foreach($rows as $row){
        if($i <= ($nPagina * $NUM_FILM_RIGA) && $i > ($NUM_FILM_RIGA * ( $nPagina- 1))){
            if(($i % $NUM_FILM_RIGA) == 1){
                $num = 1;
            }
            print " {\"titolo\": \" ".$row["titolo"]." \",\"numero\": \" ".$num." \", \"id\": \" ".$row["id"]." \"}";
            if($num < $NUM_FILM_RIGA && $i < $len){
                print ",";
            }
            print "\n";
        }
        $i++;
        $num++;
    }
    print " ]\n}";
    
    }


    ?>