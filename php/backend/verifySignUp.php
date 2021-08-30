<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: verifySignUp.php getsisce la parte back-end della registrazione
*/ 

include("db.php");
header("Content-type: application/json");

if (isset($_POST["nome"]) && isset($_POST["cognome"]) 
&& isset($_POST["email"]) && isset($_POST["username"]) &&
isset($_POST["password"])){
    $username = validateUs($_POST["username"]);
    $email = validateMail($_POST["email"]);
    if($username && $email){
        //chiedo al db se c'è un altro utente registrato con stesso email e username
        if(!existAccount($username)){
            if(!existAccountMa($email)){
                $nome = validateName($_POST["nome"]);
                $cognome = validateName($_POST["cognome"]);
                $password = validatePa($_POST["password"]);
                if($nome){
                    if($cognome){
                        if($password){
                            //procede alla registazione 
                            if(signUp($nome, $cognome, $email, $username, $password)){;
                                session_start();
                                $_SESSION["username"] = $username;
                                print "{ \"username\": \"".session_id()."\"\n}";
                            }
                            else{
                                print "{ \"error\": \"Accesso al db fallito\" }";
                            }
                        }
                        else{
                            print "{ \"error\": \"Il campo password contiene caratteri non accettati\" }";
                        }
                    }
                    else{
                        print "{ \"error\": \"Il campo cognome contiene caratteri non accettati\" }";
                    }
                }
                else{
                    print "{ \"error\": \"Il campo nome contiene caratteri non accettati\" }";
                } 
            }
            else{
                print "{ \"error\": \"Esiste un account già registrato con la stessa email\" }";
            }
        }
        else{
            print "{ \"error\": \"Esiste un account già registrato con lo stesso username\" }";
        }
    }
}

?>
