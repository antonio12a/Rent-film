<?php

/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: verifyLogin.php gestisce la parte back-end del login
*/
include("db.php");
header("Content-type: application/json");
ensure_logged_in();

//vengono settati degli errori in base ai campi errati da parte dell'utente
if (isset($_POST["username"]) && isset($_POST["password"])){
    $errorPa = false;
    $errorUs = false;
    $errorUsPa = false;
    $name = false;
    $username = validateUs($_POST["username"]);
    $password = validatePa($_POST["password"]);
    $isCorrect = false;
    if($username && $password){
        $submitted_pw_hash = md5($password);
        //vado a verificare nel db
        $exist = existAccount($username);
        $isCorrect = passwordIsCorrect($username, $submitted_pw_hash);
        if($exist){
            if($isCorrect){
                $name = $username;
                session_start();
                $_SESSION["username"] = $username;
                
                //creare sessione e rispondere con json
            }
            else{
                $errorPa = true;
                //mandiamo errore password errata
            }
            
        }
        else{
            //mandiamo nel json l'errore username
            $errorUs = true;
        }
    }
    else{
        //input non valido
        $errorUsPa = true;
    }
    
    if($name){
        print "{ \"username\": \"".session_id()."\"\n}";
    }
    if($errorUs){
        print "{ \"errorUs\": ".$errorUs."\n}";
    }
    if($errorUsPa){
        print "{ \"errorUsPa\": ".$errorUsPa."\n}";
    }
    if($errorPa){
        print "{ \"errorPa\": ".$errorPa."\n}";
    }

}





?>