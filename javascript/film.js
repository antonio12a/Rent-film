/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: film.js gestisce la pagina che visualizza le info del film
*/  
$(document).ready(function(){
    checkSession();
});

//verifica il cookie filmId e la sessione utente
function checkSession(){
    if(!getCookie('filmId')){
        $(window.location).attr('href', 'home.php');
    }

    $.ajax({
        url: "../php/backend/checkSession.php",
        type: "POST",
        datatype: "json",
        data: {
        action: "verificaSessione"
        },
        success: function(json){
            if(json.username){
            chiediFilm();
        }
        else{
            $(window.location).attr('href', '../index.php');
        }
        },
        error: function(xhr){
        ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}
// chiede le info del film
function chiediFilm(){
    var filmName = getCookie('filmId');
    $.ajax({
        url: "../php/backend/getFilm.php",
        type: "POST",
        datatype: "json",
        data: {
        action: "getFilm",
        film: filmName
        },
        success: printFilm,
        error: function(xhr){
        ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}
//stampa le info del film
function printFilm(json){
    var titolo = json.titolo.toUpperCase();
    $("#titleText").text(titolo);
    $("#tramaText").text(json.trama);
    $("#annoText").text(json.anno);
    $("#durataText").text(json.durata+"'");
    $("#prezzoText").text(json.prezzo+"€");
    $("#genereText").text(json.genere);
    var name = json.titolo.replace(/\s/g, '').replace("?", '').replace("!", '').toLowerCase();
    $("#imgFilm").attr("src",'../img/film/'+name+'.jpg');
    $("#buttonNoleggia").on({
        click: noleggia
    });
    $("#buttonCarrello").on({
        click: aggiungiCarrello
    });
    $("#buttonPreferiti").on({
        click: aggiungiPreferiti
    });

    $(".btn").on({
        mouseover: function(){
            $(this).css("background-color", "rgba(4, 43, 170, 0.418)");
            $(this).css('cursor','pointer');
        }, 
        mouseout: function(){
            $(this).css("background-color", "");
        },
    });

    $(".nol").on({
        mouseover: function(){
            $(this).css('cursor','pointer');
            $(this).css("background-color", "rgb(1, 21, 88)");
        }, 
        click: function(){
            $(this).css("color", "yellow");
        },
        mouseout: function(){
            $(this).css("background-color", "blue");
        }
        
    });



    $("#buttonPreferiti").click(function(){$(this).attr("src", "../img/prefN.png")});
    $("#buttonCarrello").click(function(){$(this).attr("src", "../img/carrelloN.png")});


}

//aggiunge il film ai preferiti
function aggiungiPreferiti(){
    var username = getCookie("username");
    var film = getCookie("filmId");
    $.ajax({
        url: "../php/backend/getFilm.php",
        type: "POST",
        datatype: "json",
        data: {
        action: "aggiungiPreferiti",
        film: film,
        username: username
        },
        success: printResPreferiti,
        error: function(xhr){
        ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}

// stampa la convalida dell'aggiunta del film ai preferiti
function printResPreferiti(json){
    if(json.aggiunto){  
        $("#notificaText").css("color", "green");
        $("#notificaText").text("Film aggiunto ai preferiti");
    }  
    else{
        $("#notificaText").css("color", "red");
        switch(json.errore){
            case 'già presente':
                $("#notificaText").text("L' articolo è già presente nei preferiti");
                break;
            default:
                $("#notificaText").text("Si è verificato un errore generico riprovare più tardi");
                break;
        }
    }    
   

}

// aggiunge il film al carrello
function aggiungiCarrello(){
    var username = getCookie("username");
    var film = getCookie("filmId");
    $.ajax({
        url: "../php/backend/getFilm.php",
        type: "POST",
        datatype: "json",
        data: {
        action: "aggiungiCarrello",
        film: film,
        username: username
        },
        success: printResCarrello,
        error: function(xhr){
        ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}

// stampa la convalida dell'aggiunta del film al carrello
function printResCarrello(json){
    if(json.aggiunto){  
        $("#notificaText").css("color", "green");
        $("#notificaText").text("Film aggiunto al carrello");
    }  
    else{
        $("#notificaText").css("color", "red");
        switch(json.errore){
            case 'già presente':
                $("#notificaText").text("L' articolo è già presente nel carrello");
                break;
            default:
                $("#notificaText").text("Si è verificato un errore generico riprovare più tardi");
                break;
        }
    }    
   

}

//tramite ajax noleggia il film
function noleggia(){
    var username = getCookie("username");
    var film = getCookie("filmId");
    $.ajax({
        url: "../php/backend/getFilm.php",
        type: "POST",
        datatype: "json",
        data: {
        action: "noleggia",
        film: film,
        username: username
        },
        success: printResPagamento,
        error: function(xhr){
        ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });

}

// stampa la convalida del noleggio del film
function printResPagamento(json){
    if(json.pagamento){  
        $("#notificaText").css("color", "green");
        $("#notificaText").text("Noleggio avvenuto con successo");
    }  
    else{
        $("#notificaText").css("color", "red");
        switch(json.errore){
            case 'prezzo alto':
                $("#notificaText").text("Il tuo saldo non è sufficiente per noleggiare l'articolo");
                break;
            case 'già presente':
                $("#notificaText").text("Hai già noleggiato quest'articolo");
                break;
            default:
                $("#notificaText").text("Si è verificato un errore generico riprovare più tardi");
                break;
        }
    }    
   

}
//in caso di errore su una chiamata ajax stampa la risposta
function ajaxFailed(json){
    $('body').html(json);
}