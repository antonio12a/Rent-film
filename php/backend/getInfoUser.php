<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: getInfoUser.php può aggiungere i film al carrello, ai preferiti e ai noleggiati, inoltre stampa i dati dei film
*/ 
include("db.php");
session_start();
ensure_logged_in();
header("Content-type: application/json");
switch($_POST["action"]){
    case "getDati":
        printDati();
        break;
    case "getSaldo":
        printSaldo();
        break;
    case "getOrdini":
        printOrdini();
        break;
    case "getCarrello":
        printCarrello();
        break;
    case "getPreferiti":
        printPreferiti();
        break;
    case "ricarica":
        ricarica();
        break;
    case "eliminaDaCarrello":
        eliminaDaCarrello();
        break;
    case "eliminaDaPreferiti":
        eliminaDaPreferiti();
        break;

}

function eliminaDaPreferiti(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $filmId = $_POST["film"];
        $filmId = $db->quote($filmId);
        $query = " DELETE FROM wish_list WHERE username = $username AND film_id = $filmId";
        $rows = $db->query($query);
        if($rows){
            print "{\"eliminato\": \"true\"}";
        }
        else{
            print "{\"errore\": \"true\"}";;
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}

//elimina elementi da carrello
function eliminaDaCarrello(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $filmId = $_POST["film"];
        $filmId = $db->quote($filmId);
       //echo($film);
        $query = " DELETE FROM carrello WHERE username = $username AND film_id = $filmId";
        $rows = $db->query($query);
        if($rows){
            print "{\"eliminato\": \"true\"}";
        }
        else{
            print "{\"errore\": \"true\"}";;
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
//stampa i dati utente
function printDati(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $query = " SELECT nome, cognome, email FROM utenti WHERE username = $username ";
        $rows = $db->query($query);
        foreach($rows as $row){
            print" {\"nome\": \"".$row["nome"]."\", \"cognome\": \"".$row["cognome"]."\", \"email\": \"".$row["email"]."\"}\n";
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}

function printSaldo(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $query = " SELECT saldo FROM utenti WHERE username = $username ";
        $rows = $db->query($query);
        foreach($rows as $row){
            print "{\"saldo\": \"".$row["saldo"]."\"}";
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
//effettua una ricarica del saldo
function ricarica(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $importo = $_POST["importo"];
        $importo = $db->quote($importo);
        $query = "UPDATE utenti SET saldo = saldo + $importo WHERE username = $username";
        $rows = $db->query($query);
        if($rows){
            print " {\"stato\": \"ok\"}";
        }
        else{
            print " {\"stato\": \"errore\"}";
        }  
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
//stampa gli ordini effettuati in passato
function printOrdini(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        
        $query = " SELECT film.titolo, acquisti.data, film.id FROM acquisti JOIN utenti JOIN film   WHERE utenti.username = $username AND utenti.username = acquisti.username AND acquisti.film_id = film.id ";
        $rows = $db->query($query);
        returnJSON($rows);     
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
//stampa in formato json i film 
function returnJSON($rows){
    $i = 1;
    $len = $rows->rowCount();
    if($len == 0){
       print " {\"vuoto\": \" vuoto \"}";
    }
    else{
        print "{\n\"film\": [\n";
        foreach($rows as $row){
            print " {\"titolo\": \" ".$row["titolo"]." \",\"data\": \" ".$row["data"]." \",\"id\": \" ".$row["id"]." \"}";
            if($i < $len){
                print ",";
            }
            print "\n";
            $i++;
        }
        
        print " ]\n}";
    }
}

function printCarrello(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $query = " SELECT film.titolo, film.prezzo, film.id FROM carrello JOIN utenti JOIN film  WHERE utenti.username = $username AND utenti.username = carrello.username AND carrello.film_id = film.id ";
        $rows = $db->query($query);
        returnJSONCarrello($rows);     
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
function returnJSONCarrello($rows){
    $i = 1;
    $len = $rows->rowCount();
    if($len == 0){
        print " {\"vuoto\": \" vuoto \"}";
    }
    else{
        print "{\n\"film\": [\n";
    
        foreach($rows as $row){
            print " {\"titolo\": \" ".$row["titolo"]." \", \"prezzo\": \" ".$row["prezzo"]." \", \"id\": \" ".$row["id"]." \"}";
            if($i < $len){
                print ",";
            }
            print "\n";
            $i++;
        }               
    
        print " ]\n}";
    }
}

function printPreferiti(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
       //echo($film);
        $query = " SELECT film.titolo, film.prezzo, film.id FROM wish_list JOIN utenti JOIN film  WHERE utenti.username = $username AND utenti.username = wish_list.username AND wish_list.film_id = film.id ";
        $rows = $db->query($query);
        returnJSONCarrello($rows);     
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}

?>