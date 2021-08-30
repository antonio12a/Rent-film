/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: handlerBanner.js getsisce il banner comune a tutte le pagine
*/  

$(document).ready(function(){
var logo = $("#logoImg");
  logo.on({
    click: function(){$(window.location).attr('href', 'home.php');},
    mouseover: function(){$(this).css('cursor','pointer');}
  });
  var ricerca = $("#searchImg");
  ricerca.on({
    click: function(){setCookie("ricerca",$("#searchIn").val());
    $(window.location).attr('href', 'ricerca.php');},
    mouseover: function(){$(this).css('cursor','pointer');}
  });
  var carrello = $("#carrelloImg");
  carrello.on({
    click: function(){setCookie("opzione","carrello");
    $(window.location).attr('href', 'profile.php');},
    mouseover: function(){$(this).css('cursor','pointer');}
  });
  var wish = $("#wishImg");
  wish.on({
    click: function(){
      setCookie("opzione","preferiti");
      $(window.location).attr('href', 'profile.php');
    },
    mouseover: function(){$(this).css('cursor','pointer');}
  });
  var profilo = $("#profiloImg");
  profilo.on({
    click: function(){
      setCookie("opzione","profilo");
      $(window.location).attr('href', 'profile.php');
    },
    mouseover: function(){$(this).css('cursor','pointer');}
  });
  var searchDiv = $("#search");
  searchDiv.on({
    mousemove: function(){
      backgroundWhite($(this));
    },
    mouseout: function(){
      $(this).css("background-color", "");
    }
  });

  var carrello = $("#carrello");
  carrello.on({
    mousemove: function(){
      backgroundWhite($(this));
    },
    mouseout: function(){
      $(this).css("background-color", "");
    }
  });

  var wish = $("#wish");
  wish.on({
    mousemove: function(){
      backgroundWhite($(this));
    },
    mouseout: function(){
      $(this).css("background-color", "");
    }
  });

  var profilo = $("#profilo");
  profilo.on({
    mousemove: function(){
      backgroundWhite($(this));
    },
    mouseout: function(){
      $(this).css("background-color", "");
    }
  });

  


});function backgroundWhite(elem){
      elem.css("background-color", "rgba(255,255,255, 0.5)");
  }
