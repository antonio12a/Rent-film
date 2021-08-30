/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: ricerca.js gestisce la pagina che mostra i risultati delle ricerche dei film
*/
$(document).ready(function(){
    checkSession();

});
// verifica l'autenticazione dell'utente
function checkSession(){
    $.ajax({
        url: "../php/backend/checkSession.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "verificaSessione"
        },
        
        success: function(json){
            if(json.username){
                chiediFilm(getCookie('ricerca'));
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

//chiede le info del film richiesto
function chiediFilm(ricerca){
    $.ajax({
        url: "../php/backend/ricercaB.php",
        type: "POST",
        datatype: "json",
        data: {
        action: "ricerca",
        stringa: ricerca
        },
        
        success: printFilm,
        error: function(xhr){
        ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}
//stampa i film 
function printFilm(json){
    if(json.film){
        $('<div/>', {
                'id': 'title'
        }).appendTo('#main');
        var title = $('<p/>', {
            'class': "titleText"
        }).appendTo('#title');
        title.text("Ricerca per \""+ getCookie('ricerca') + "\"");
        json.film.forEach(function(item){
            $('#main').css("height", $('#main').height()+"+"+"350");
            var name = item.titolo.replace(/\s/g, '');
            var name = name.replace("?", '');
            var name = name.replace("!", '');
            var name = name.toLowerCase();
            $('<div/>', {
                'id': "container"+name,
                'class':'containerFilm'
            }).appendTo('#main');
            var img = $('<img/>', {
                'src': '../img/film/'+name+'.jpg',
                'class': "imgFilm"
            }).appendTo('#'+'container'+name);
            var title = $('<p/>', {
                'class': "titleFilm"
            }).appendTo('#'+'container'+name);
            title.text(item.titolo);
            img.on({
                mouseover: function(){$(this).css('cursor','pointer');},
                click: function(){
                  setCookie('filmId', item.id);
                  $(window.location).attr('href', 'film.php');
                } 
              });
            title.on({
                mousemove: function(){
                    $(this).css({"color": "blue", 'cursor':'pointer'});
                },
                mouseout: function(){
                    $(this).css("color", "black");
                },
                click: function(){
                  setCookie('filmId', item.id);
                  $(window.location).attr('href', 'film.php');
                } 
              });
        })
    }
    else{
        var titleDefault = $('<p/>', {
            'id': "textDefault"
        }).appendTo('#main');
        titleDefault.text("La tua ricerca non ha prodotto nessun risultato");
    }
}
//in caso di errore su una chiamata ajax stampa la risposta
function ajaxFailed(json){
    $('body').html(json);
}
