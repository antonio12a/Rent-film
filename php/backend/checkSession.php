<?php 
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: checkSession.php verifica la sessione attiva ed effettua il logout
*/      

include("db.php");
session_start();
header("Content-type: application/json");

switch($_POST["action"]){
    case "verificaSessione":
        if(isset($_SESSION["username"])){
            print "{ \"username\": \"".session_id()."\"\n}";
        }
        else{
            print "{ \"sessione\": \"false\"\n}";
        }
        break;
    case "logout":
        session_regenerate_id(TRUE); 

        session_unset(); 
        session_destroy();
        print "{ \"logout\": \"ok\"\n}";
        break;
}
?>