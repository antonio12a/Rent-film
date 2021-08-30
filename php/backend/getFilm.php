<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: getFilm.php può aggiungere i film al carrello, ai preferiti e ai noleggiati, inoltre stampa i dati dei film
*/ 
include("db.php");
session_start();
ensure_logged_in();
header("Content-type: application/json");
switch($_POST["action"]){
    case "getFilm":
        returnFilm();
        break;
    case "noleggia":
        noleggiaFilm();
        break;
    case "aggiungiCarrello":
        aggiungiCarrello();
        break;
    case "aggiungiPreferiti":
        aggiungiPreferiti();
        break;
}
//aggiunge il film ai preferiti
function aggiungiFilmPreferiti(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $idFilm = $_POST["film"];
        $idFilm = $db->quote($idFilm);
        
       
        $query = "INSERT INTO wish_list (username, film_id) VALUES ($username, $idFilm);";
        $rows = $db->query($query);
        return true;
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
        return false;
    }
   
}
//verifica se il fim da aggiungere è presente
function aggiungiPreferiti(){
    if(!checkPreferiti()){
        if(aggiungiFilmPreferiti()){
            print "{\"aggiunto\": \"true\"}\n";
        }
        else{
            print "{\"errore\": \"generico\"}\n";
        }
    }
    else{
        print "{\"errore\": \"già presente\"}\n";
    }
}

function checkPreferiti(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $idFilm = $_POST["film"];
        $idFilm = $db->quote($idFilm);
        
       //echo($film);
        $query = "SELECT film_id FROM wish_list WHERE film_id = $idFilm AND $username = username;";
        $rows = $db->query($query);
        if($rows){
            foreach($rows as $row){
                return true;
            }
            return false;
            
        }
        else{
            return false;
        }
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
//verifica se il fim è presente nel carrello
function aggiungiCarrello(){
    if(!checkCarrello()){
        if(aggiungiFilmCarrello()){
            print "{\"aggiunto\": \"true\"}\n";
        }
        else{
            print "{\"errore\": \"generico\"}\n";
        }
    }
    else{
        print "{\"errore\": \"già presente\"}\n";
    }
}
// aggiunge il film al carrello
function aggiungiFilmCarrello(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $idFilm = $_POST["film"];
        $idFilm = $db->quote($idFilm);
        
       
        $query = "INSERT INTO carrello (username, film_id) VALUES ($username, $idFilm);";
        $rows = $db->query($query);
        return true;
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
        return false;
    }
   
}
function checkCarrello(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $idFilm = $_POST["film"];
        $idFilm = $db->quote($idFilm);
        
        $query = "SELECT film_id FROM carrello WHERE film_id = $idFilm AND $username = username;";
        $rows = $db->query($query);
        if($rows){
            foreach($rows as $row){
                return true;
            }
            return false;
            
        }
        else{
            return false;
        }
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
//stampa i dati del film
function returnFilm(){
    try {
        $db = connectDb();
        $film = $_POST["film"];
        $film = $db->quote($film);
        $query = " SELECT * FROM film WHERE id = $film ";
        $rows = $db->query($query);
        foreach($rows as $row){
            print" {\"titolo\": \"".$row["titolo"]."\", \"genere\": \"".$row["genere"]."\", \"prezzo\": \"".$row["prezzo"]."\", \"trama\": \"".$row["trama"]."\", \"anno\": \"".$row["anno"]."\", \"id\": \"".$row["id"]."\", \"durata\": \"".$row["durata"]."\"}\n";
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
//stampa il titolo del film
function getTitoloFilm(){
    try {
        $db = connectDb();
        $film = $_POST["film"];
        $film = $db->quote($film);
        $query = "SELECT titolo FROM film WHERE id = $film ";
        $rows = $db->query($query);
        foreach($rows as $row){
             return $row["titolo"];
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}

//effettua l'operazione di noleggio facendo le opportune verifiche
function noleggiaFilm(){
    $titolo = getTitoloFilm();
    if(!checkFilmOrdini()){
        $prezzoFilm = (int)getPrezzoFilm();
        $saldoUser = (int)getSaldoUser();
        
        if($saldoUser < $prezzoFilm){
            print "{\"errore\": \"prezzo alto\", \"titolo\": \"".$titolo."\"}\n";
        }
        else{ 
            if(pagamento($prezzoFilm) && aggiungiFilmOrdini()){
                print "{\"pagamento\": \"".getTitoloFilm()."\"}\n";
            }
            else{
                print "{\"errore\": \"generico\", \"titolo\": \"".getTitoloFilm()."\"}\n";
            }
        }
    }
    else{
        print "{\"errore\": \"già presente\", \"titolo\": \"".$titolo."\"}\n";
    }
}

// verifica se il film è già stato noleggiato
function checkFilmOrdini(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $idFilm = $_POST["film"];
        $idFilm = $db->quote($idFilm);
        
        $query = "SELECT film_id FROM acquisti WHERE film_id = $idFilm AND $username = username;";
        $rows = $db->query($query);
        foreach($rows as $row){
            return true;
        }
        return false;
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }

}
function aggiungiFilmOrdini(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $idFilm = $_POST["film"];
        $idFilm = $db->quote($idFilm);
        $timestamp = time();
        $data = $db->quote(date('Y/m/d', $timestamp));
        
        $query = "INSERT INTO acquisti (username, film_id, data) VALUES ($username, $idFilm, $data);";
        $rows = $db->query($query);
        if($rows){
            return true;
        }
        else{
            return false;
        }
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }

}
// effettua l'operazione di pagamento
function pagamento($prezzoFilm){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $prezzoFilm = (int) $prezzoFilm;
        $prezzoFilm = $db->quote($prezzoFilm);
        
        
        $query = "UPDATE utenti SET saldo = saldo - $prezzoFilm WHERE username = $username";
        $rows = $db->query($query);
        if($rows){
            return true;
        }
        else{
            return false;
        }
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
    
}
//stampa il saldo dell'utente
function getSaldoUser(){
    try {
        $db = connectDb();
        $username = $_SESSION["username"];
        $username = $db->quote($username);
        $query = "SELECT saldo FROM utenti WHERE username = $username";
        $rows = $db->query($query);
        foreach($rows as $row){
            return $row["saldo"];
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}
// stampa il prezzo del film
function getPrezzoFilm(){
    try {
        $db = connectDb();
        $film = $_POST["film"];
        $film = $db->quote($film);
        $query = " SELECT prezzo FROM film WHERE id = $film ";
        $rows = $db->query($query);
        foreach($rows as $row){
            return $row["prezzo"];
        }
        
        
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }

}