/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: home.js gestisce l'home page
*/  
const NUM_FILM_RIGA = 5;
const pagina_attuale = [];
$(document).ready(function(){
  checkSession();
});

//funzione che stabilisce se l'utente è autenticato
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
        setCookie('username', json.username);
        chiediGeneri();
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

/* tramite ajax richiede la lista dei generi di tutti i film*/
function chiediGeneri(){

$.ajax({
  url: "../php/backend/homeb.php",
  type: "POST",
  datatype: "json",
  data: {
    action: "richiestaGeneri"
  },
  success: printFilm,
  error: function(xhr){
    ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
    }
});
}
//tramite ajax richiede la lista dei film appartente ad un genere e alla pagina
function chiediFilmGenere(genere, numPage){
  $.ajax({
    url: "../php/backend/homeb.php",
    type: "POST",
    datatype: "json",
    data: {
      action: "richiestaFilm",
      genere: genere,
      numPage: numPage
    },
    success: createImg,
    error: function(xhr){
      ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
      }
  });
}
// tramite ajax chiede il numero di pagine con cui sono suddivisi i film
function chiediLastPage(id, genere){
  var res;
  $.ajax({
    url: "../php/backend/homeb.php",
    type: "POST",
    datatype: "json",
    data: {
      action: "richiestaUltima",
      genere: genere,
    },
    async: false,
    success: function(json){
      res = Math.ceil(parseFloat(json.ultima) / parseFloat(NUM_FILM_RIGA));
    },
    error: function(xhr){
      ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
      }
  });
  return res;
}
// stampa le locandine dei film
function createImg(json){
  var genere = json.genere.replace("\s", '');
  var genere = genere.toLowerCase();
  json.film.forEach(function(item){
    var name = item.titolo.replace(/\s/g, '');
    var name = name.replace("?", '');
    var name = name.replace("!", '');
    var name = name.toLowerCase();
    var div = $('<div/>', {
        'class':'containerFilm',
        'id': name+'Div'
    }).appendTo('#ContainerImgFilm'+genere);
    $('<img/>', {
        'src': '../img/film/'+name+'.jpg',
        'class': "imgFilm"
    }).appendTo('#'+name+'Div');
    $(div).on({
        mousemove: ingrandisciImg, 
        mouseout: defaultImg, 
        click: function(){
          setCookie('filmId', item.id);
          $(window.location).attr('href', 'film.php');
          //cambiare pagina e settare un cookie
        } 
    });
  })
}
//imposta le dimensioni di default della locandina
function defaultImg(){
  $(this).css({
    "height" : "300px",
    "width" : "180px" ,
    "z-index": "0"
    
  });
}
function ingrandisciImg(){
  $(this).css('cursor','pointer');
  $(this).css({
    "height" : "500px", 
    "width" : "300px" ,
    "z-index": "+1"

  });
}

// per ogni genere stampa le frecce e le locandine della galleria
function printFilm(json){
  var i = 0;
  json.generi.forEach(function(item){//per ogni genere 
    var genere = item.genere.replace(/\s/g, '');
    var genere = genere.toLowerCase();
    pagina_attuale[i] = new Array();
    pagina_attuale[i][0] = genere;
    pagina_attuale[i][1] = 1;
    pagina_attuale[i][2] = chiediLastPage(i, item.genere.replace(/\s/g, ''));
    
    $('<div/>', {
      'id': "leftDivContainer"+genere,
      'class':'frecciaSxContainer'
      }).appendTo('#'+genere+'Div');
    var leftArrow = $('<div/>', {
      'id': "leftDivImg"+genere,
      'class':'frecciaSx'
    }).appendTo('#'+'leftDivContainer'+genere);
    $('<img/>', {
      'src': '../img/freccia_sx.png',
      'class': "imgFreccia"
    }).appendTo('#'+'leftDivImg'+genere);
    hideArrow($("#leftDivImg"+genere));
    $('<div/>', {
      'id': "ContainerImgFilm"+genere,
      'class':'ContainerImgFilm'
    }).appendTo('#'+genere+'Div');
    var genere = item.genere.replace(/\s/g, '');
    chiediFilmGenere(genere, 1);
    var genere = item.genere.replace(/\s/g, '');
    var genere = genere.toLowerCase();
    $('<div/>', {
      'id': "rightDivContainer"+genere,
      'class':'frecciaDxContainer'
    }).appendTo('#'+genere+'Div');
    var rightArrow = $('<div/>', {
      'id': "rightDivImg"+genere,
      'class':'frecciaDx'
    }).appendTo('#'+'rightDivContainer'+genere);
    $('<img/>', {
      'src': '../img/freccia_dx.png',
      'class': "imgFreccia"
    }).appendTo('#rightDivImg'+genere);

    if(pagina_attuale[i][2] == 1){
      hideArrow($("#rightDivImg"+genere));
    }
    leftArrow.on({
      click: function(){
        callArrow(genere, 'left');
        },
      mousemove: function(){
        $("#leftDivContainer"+genere).css("background-color", "rgba(255, 255, 255, 0.5)");
      },
      mouseover: function(){$(this).css('cursor','pointer');},
      mouseout : function(){
        $("#leftDivContainer"+genere).css("background-color", "");
      }
    });
    rightArrow.on({
      mouseover: function(){$(this).css('cursor','pointer');},
      click: function(){
        callArrow(genere, 'right');
        },
      mousemove: function(){
        $("#rightDivContainer"+genere).css("background-color", "rgba(255, 255, 255, 0.5)");
      },
      mouseout : function(){
        $("#rightDivContainer"+genere).css("background-color", "");
      }
    });
    
    i++;

  });
}
// in caso di ultima pagina o prima pagina nasconde la freccia
function hideArrow(arrow){
    arrow.css({"display":"none"});
  }

//dopo aver cliccato la freccia rimuove le locandine esistenti e stampa le altre
function printPage(nPage, genere){
  $("#ContainerImgFilm"+genere).children().remove();
  chiediFilmGenere(genere, nPage);
}

// gestisce il click sulle frecce

function callArrow(genere, direzione){
  for(var i = 0; i < pagina_attuale.length; i++){
    if(pagina_attuale[i][0] == genere){
      break;
    }
  }

  if(direzione == "left"){
    if(pagina_attuale[i][1] == 1){
      return;
    }
    if((pagina_attuale[i][1] - 1) == 1 ){
      hideArrow($("#leftDivImg"+genere));
    }
    if(pagina_attuale[i][1] == pagina_attuale[i][2]){
        showArrow($("#rightDivImg"+genere));
      }
    pagina_attuale[i][1] = pagina_attuale[i][1] - 1;
    printPage(pagina_attuale[i][1], genere);

  }
  else{//freccia destra
    if(pagina_attuale[i][1] == pagina_attuale[i][2]){
      return;
    }
    if((pagina_attuale[i][1] + 1) == pagina_attuale[i][2]){
      hideArrow($("#rightDivImg"+genere));
    }
    if(pagina_attuale[i][1] == 1){
      showArrow($("#leftDivImg"+genere));
    }
    pagina_attuale[i][1] = pagina_attuale[i][1] + 1;
    printPage(pagina_attuale[i][1], genere);

  }

}
// mostra la freccia
function showArrow(arrow){
  arrow.css({"display":"table-cell"});
}
 
//in caso di errore su una chiamata ajax stampa la risposta
function ajaxFailed(text){
  $("body").html(text);
}
