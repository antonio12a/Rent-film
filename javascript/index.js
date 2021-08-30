/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: index.js gestisce il form di login e logout della pagina di index
*/  
$(document).ready(function(){
    $.ajax({
        url: "php/backend/checkSession.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "verificaSessione"
        },
        success: function(json){
          if(json.username){
            setCookie('username', json.username);
            $(window.location).attr('href', 'php/home.php');
          }
        },
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });

    $("#registratiBtn").click(changeToReg); 
    $("#accediBtn").click(validateLogin);
    $("#accediBtnR").click(changeToLog);
    $("#registratiBtnR").click(validateReg);
    $(".btn").mouseover(function(){
        $(this).css("background-color", "rgb(2, 2, 109)");
        $(this).css('cursor','pointer');
    });
    $(".btn").mouseout(function(){
        $(this).css("background-color", "rgb(29, 29, 252)");
    })
    });

    // nasconde il div del login e mostra il div della registrazione
    function changeToReg(){
        cleanLogin();
        $(".form").css("display", "none");
        $(".formRegistrazione").css("display", "block");
    }
    // nasconde il div della registrazione e mostra il div del login
    function changeToLog(){
        cleanReg();
        $(".formRegistrazione").css("display", "none");
            $(".form").css("display", "block");
    }
    // rimuove gli input dell'utente dal div del login
    function cleanLogin(){
        setUsDefault();
        setPaDefault();
        $("#usText").val("");
        $("#paText").val("");
    }
    // rimuove gli input dell'utente dal div della registrazione
    function cleanReg(){
        setErrorReg("");
        $("#nomeIn").css("border", "1px solid rgb(22, 0, 224)");
        $("#cognomeIn").css("border", "1px solid rgb(22, 0, 224)");
        $("#emailIn").css("border", "1px solid rgb(22, 0, 224)");
        $("#usernameIn").css("border", "1px solid rgb(22, 0, 224)");
        $("#passwordIn").css("border", "1px solid rgb(22, 0, 224)");
        $("#nomeIn").val("");
        $("#cognomeIn").val("");
        $("#emailIn").val("");
        $("#usernameIn").val("");
        $("#passwordIn").val("");

    }
//valida l'input per il login e apre una sessione 
function validateLogin(){
    var username = escapeHtml($("#usText").val());
    if(valUsername(username)){
        setUsDefault();
        var password = escapeHtml($("#paText").val());
        if(valPassword(password)){
            setPaDefault();
            openSession(username, password);
        }
        else{
            setPaError("Password deve contenere minimo otto caratteri max 16, almeno una lettera, un numero e un carattere speciale");
        }
    }
    else{
        setUsError("L'username deve contenere minimo 6 e massimo 18 caratteri");
    }
}
//tramite ajax avvia la sessione
function openSession(username, password){
    $.ajax({
        url: "php/backend/verifyLogin.php",
        type: "POST",
        datatype: "json",
        data: {
            username: username,
            password: password
        },
        success:goToHomePage,
        error: function(xhr){
            ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
    });
}

function goToHomePageReg(json){
    if(json.username){
        $(window.location).attr('href', 'php/home.php');
        setCookie('username', json.username);
    }
    else{
        setErrorReg(json.error);
    }

}
// in caso di login o registrazione reindirizza la pagina all'home page
function goToHomePage(json){
    if(json.username){
        $(window.location).attr('href', 'php/home.php');
        setCookie('username', json.username);

    }
    else{
        if(json.errorUs){
            setUsError("Username non trovato");
            
        }
        if(json.errorUsPa){
            setPaError("Username o password contengono caratteri non validi");
        }
        if(json.errorPa){
            setPaError("Password errata");

        }
    }

}

//valida gli input della registrazione e avvia una sessione o stampa eventuali errori
function signUp(nome, cognome, email, username, password){
    $.ajax({
        url: "php/backend/verifySignUp.php",
        type: "POST",
        datatype: "json",
        data: {
            nome: nome,
            cognome: cognome,
            email: email,
            username: username,
            password: password
        },
        success:goToHomePageReg,
        error: function(xhr){
            ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
    });

}
function validateReg(){
    var nome = escapeHtml($("#nomeIn").val());
    var cognome = escapeHtml($("#cognomeIn").val());
    var email = escapeHtml($("#emailIn").val());
    var password = escapeHtml($("#passwordIn").val());
    var username = escapeHtml($("#usernameIn").val());
    if(valNomeCogn(nome)){
        setErrorReg("");
        $("#nomeIn").css("border", "1px solid rgb(22, 0, 224)");
        if(valNomeCogn(cognome)){
            setErrorReg("");
            $("#cognomeIn").css("border", "1px solid rgb(22, 0, 224)");
            if(valEmail(email)){
                setErrorReg("");
                $("#emailIn").css("border", "1px solid rgb(22, 0, 224)");
                if(valUsername(username)){
                    setErrorReg("");
                    $("#usernameIn").css("border", "1px solid rgb(22, 0, 224)");
                    if(valPassword(password)){
                        setErrorReg("");
                        $("#passwordIn").css("border", "1px solid rgb(22, 0, 224)");
                        signUp(nome, cognome, email, username, password);
                    }
                    else{
                        $("#passwordIn").css("border", "1px solid red");
                        setErrorReg("Password deve contenere minimo otto caratteri max 16, almeno una lettera, un numero e un carattere speciale");
                    }
                }
                else{
                    $("#usernameIn").css("border", "1px solid red");
                    setErrorReg("L'username deve contenere minimo 6 e massimo 18 caratteri");
                }
            }
            else{
                $("#emailIn").css("border", "1px solid red");
                setErrorReg("L'email non è corretta");
            }
        }
        else{
            $("#cognomeIn").css("border", "1px solid red");
            setErrorReg("Il cognome deve contenere caratteri");
        }
    }
    else{
        $("#nomeIn").css("border", "1px solid red");
        setErrorReg("Il nome deve contenere caratteri");
    }
}
// stampa un errore riguardante la registrazione
function setErrorReg(value){
    $("#textError").text(value);
}
// valida il nome e il cognome in input
function valNomeCogn(value){
    const Pattern = new RegExp(/^[a-z ,.'-]+$/i);
    if(Pattern.test(value)){
        return true;
    }
    else{
        return false;
    }
}
// valida l'email in input
function valEmail(value){
    const Pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if(Pattern.test(value)){
        return true;
    }
    else{
        return false;
    }

}
/* funzione che modifica i caratteri particolari per attacci XSS*/
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
  }
// valida la password in input
function valPassword(value){

    
    //Minimo otto caratteri max 16, almeno una lettera, un numero e un carattere speciale
    const passPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/);
    
    if(passPattern.test(value)){
        return true;
    }
    else{
        return false;
    }

}
//valida l'username in input
function valUsername(value){
    //deve contenere da 6 a 18 caratteri
    const userPattern = new RegExp(/^[A-Za-z0-9]{6,18}$/);
        if(userPattern.test(value)){
            return true;
        }
        else{
            return false;
        }
        
}
//stampa un errore in caso di utente errato
function setUsError(error){
    $("#usText").css("border", "1px solid red");
    $("#usErrDiv").css("display", "block");
    $("#usErr").text(error);
}
//elimina un eventuale errore utente
function setUsDefault(){
    $("#usErrDiv").css("display", "none");
    $("#usText").css("border", "1px solid rgb(22, 0, 224)");
}
//elimina un eventuale errore password
function setPaDefault(){
    $("#paErrDiv").css("display", "none");
    $("#paText").css("border", "1px solid rgb(22, 0, 224)");
    $("#paErr").text("");
}
//stampa un errore in caso di password errata
function setPaError(error){
    $("#paErrDiv").css("display", "block");
    $("#paText").css("border", "1px solid red");
    $("#paErr").text(error);
}
//in caso di errore durante una chiamata ajax stampa la risposta
function ajaxFailed(json){
    $('body').html(json);
}