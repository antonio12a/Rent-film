<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: db.php ha una funzione che permette di interfacciarsi con il db
          e altre che verificano gli input del login / registrazione
*/

  
// verifica la sessione attiva 
function ensure_logged_in(){
    if (!isset($_SESSION["name"])) {
        redirect("http://localhost/progetto/index.php", "You must log in before you can view that page.");
    }
}
// 
function redirect($url, $flash_message = NULL) {
    if ($flash_message) {
        $_SESSION["flash"] = $flash_message;
    }
}

function connectDb(){
    try {
        $connectstr = "mysql:dbname=progetto;host=localhost:3306";
        $db = new PDO($connectstr, "root", "");
        return $db;
    } catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
}

// verifica se la password di un utente è corretta
function passwordIsCorrect($username, $submitted_pw_hash){
    $db = connectDb();
    $us = $db->quote($username);
    $pa = $db->quote($submitted_pw_hash);
    $res = false;
    
    $query = "SELECT * FROM utenti WHERE utenti.username = $us AND utenti.password = $pa";
    $rows = $db->query($query);
    foreach($rows as $row){
        $res = true;
    }
    return $res;

}

// verifica l'assistenza dell' account che ha una determinata email
function existAccountMa($email){
    $db = connectDb();
    $email  = $db->quote($email);
    $res = false;
    $query = "SELECT email
                      FROM utenti WHERE utenti.email = $email";
    $rows = $db->query($query);
    foreach($rows as $row){
        $res = true;
    }
    return $res;
} 

// viene aggiunta l'utente al db
function signUp($nome, $cognome, $email, $username, $password){
    try{
        $db = connectDb();
        $nome = $db->quote($nome);
        $cognome = $db->quote($cognome);
        $email = $db->quote($email);
        $username = $db->quote($username);
        $mdPas = $db->quote(md5($password));
        $query = "INSERT INTO utenti VALUES ( $username,  $mdPas, $nome, $cognome, $email, 0 )"; 
        if($db->query($query)){
            return true;
        }
        else{
            return false;
        }
    }catch (PDOException $ex) {
        die('Database error: ' . $ex->getMessage());
    }
    return false;

}
// verifa se esiste un account con un determinato username
function existAccount($username){
    $db = connectDb();
    $us  = $db->quote($username);
    $query = "SELECT username
                      FROM utenti WHERE utenti.username = $us";
    $rows = $db->query($query);
    $res = false;
    foreach($rows as $row){
        $res = true;
    }
    return $res;
} 

//valida username per attacchi XSS
function validateName($name){
    if(preg_match("/^[a-z ,.'-]+$/i", $name)){
        return htmlspecialchars($name);
    }
    else{
        return false;
    }
}

//valida username per attacchi XSS
function validateMail($email){
    $regex = '/^[^0-9][_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
    if(preg_match($regex, $email)){
        return htmlspecialchars($email);
    }
    else{
        return false;
    }
}


//valida username per attacchi XSS
function validateUs($username){
    if(preg_match('/^[A-Za-z0-9]{6,18}$/', $username)){
        return htmlspecialchars($username);
    }
    else{
        return false;
    }
}
//valida passwrod per attacchi XSS
function validatePa($password){
    if(preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/', $password)){
        return htmlspecialchars($password);
    }
    return false;
    
}

?>