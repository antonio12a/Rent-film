/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: profile.js gestisce la pagina che mostra i dati del profilo, il carrello e la wish list
*/

$(document).ready(function(){
    checkSession();
});
//verifica autenticazione utente e in base al cookie stampa la pagina
function checkSession(){
    $(".titolidisp").on({
        mouseover: function(){$(this).css({"color": "violet", 'cursor':'pointer'});},
        mouseout: function(){$(this).css("color", "blue");},
        click: function(){$(window.location).attr('href', 'home.php');}

    });
    $.ajax({
        url: "../php/backend/checkSession.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "verificaSessione"
        },
        success: function(json){
            if(json.username){
                var button = $("#buttonRicarica");
                button.on({
                    click: ricarica
                });
                var buttonLogOut = $("#buttonLogOut");
                buttonLogOut.on({
                    click: logout
                });
                switch(getCookie("opzione")){
                    case "preferiti":
                        getInfoPreferiti();
                        break;
                    case "profilo":
                        getInfoProfilo();
                        break;
                    case "carrello":
                        getInfoCarrello();
                        break;
                }
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

// stampa la pagina che mostra le info utente
function getInfoProfilo(){
    $("#datiDiv").css("display", "block"); 
    $("#saldoDiv").css("display", "block"); 
    $("#ordiniDiv").css("display", "block"); 
    $("#logoutDiv").css("display", "block"); 
    
    getDati();
    getSaldo();
    getOrdini();

}

// chiede i dati dell'utente
function getDati(){
    var username = getCookie("username");
    $.ajax({
        url: "../php/backend/getInfoUser.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "getDati",
          username: username
        },
        
        success: printDati,
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });
}
//stampa i dati dell'utente
function printDati(json){
    $("#nomeIn").text(json.nome);
    $("#cognomeIn").text(json.cognome);
    $("#emailIn").text(json.email);
    $("#buttonLogOut").on({
        mouseover: function(){
            $(this).css('cursor','pointer');
            $(this).css("background-color", "rgb(156, 0, 0)");
        },
        mouseout: function(){
            $(this).css("background-color", "");
        }
    });

}

//chiede il saldo dell'utente
function getSaldo(){
    var username = getCookie("username");
    $.ajax({
        url: "../php/backend/getInfoUser.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "getSaldo",
          username: username
        },
        
        success: printSaldo,
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });

}

//effettua il logout
function logout(){
    $.ajax({
        url: "../php/backend/checkSession.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "logout",
        },
        
        success: function(json){
            if(json.logout == "ok"){
                eraseCookie('username');
                $(window.location).attr('href', '../index.php');
            }
        },
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });
}

//stampa il saldo utente
function printSaldo(json){
    var saldo = json.saldo.toString();
    $("#saldoIn").text(saldo+"€");
    $("#buttonRicarica").on({
        mouseout: function(){
            $(this).css("background-color", "");
        },
        mouseover: function(){
            $(this).css("background-color", "rgb(1, 21, 88)");
            $(this).css('cursor','pointer');
        }
    }
    );
}

//effettua la ricarica del saldo
function ricarica(){
    var username = getCookie("username");
    var importo = $("#labelRicarica").val();
    $.ajax({
        url: "../php/backend/getInfoUser.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "ricarica",
          username: username,
          importo: importo
        },
        
        success: ricaricaEffettuata,
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });
}

//stampa la convalida della ricarica
function ricaricaEffettuata(json){
    if(json.stato == "ok"){
        getSaldo();
        $("#statoRicarica").text("Ricarica avvenuta con successo");

    }
    else{
        ajaxFailed("ERRORE");
    }
}
// chiede gli ordini dell'utente
function getOrdini(){
    var username = getCookie("username");
    $.ajax({
        url: "../php/backend/getInfoUser.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "getOrdini",
          username: username
        },
        
        success: printOrdini,
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });

}

//stampa gli ordini dell'utente
function printOrdini(json){
    if(json.film){
        $("#ordiniDefault").css("display", "none");
        json.film.forEach(function(item){
            var name = item.titolo.replace(/\s/g, '');
            var name = name.replace("?", '');
            var name = name.replace("!", '');
            var name = name.toLowerCase();
            $('<div/>', {
                'class':'containerFilmOrdini',
                'id': name + 'DivOrdini'
            }).appendTo('#ordiniDiv');
            var img = $('<img/>', {
                'src': '../img/film/'+name+'.jpg',
                'class': "imgFilmOrdini"
            }).appendTo('#'+name+'DivOrdini');
            img.on({
                click: function(){
                    setCookie('filmId', item.id );
                    $(window.location).attr('href', 'film.php');
                },
                    mouseover: function(){$(this).css('cursor','pointer');}
                
              });
              $('<div/>', {
                'class':'containerFilmOrdiniR',
                'id': name + 'DivOrdiniR'
            }).appendTo('#'+name+'DivOrdini');
              var titleFilm = $('<p/>', {
                'class': "titleFilmOrdini"
            }).appendTo('#'+name+'DivOrdiniR');
            titleFilm.text(item.titolo);
            var data = $('<p/>', {
                'class': "dataFilmOrdini"
            }).appendTo('#'+name+'DivOrdiniR');
            data.text("Data noleggio   "+item.data)
            
        });

    }
    else{
        
        $("#ordiniDefault").css("display", "block");
        
    }
}

//chiede i film presenti nel carrello dell'utente
function getInfoCarrello(){
    $("#datiDiv").css("display", "none"); 
    $("#saldoDiv").css("display", "none"); 
    $("#ordiniDiv").css("display", "none"); 
    $("#logoutDiv").css("display", "none"); 
    $("#wishListDiv").css("display", "none"); 
    $("#carrelloDiv").css("display", "block"); 
    var username = getCookie("username");
    $.ajax({
        url: "../php/backend/getInfoUser.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "getCarrello",
          username: username
        },
        
        success: printCarrello,
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });

}
//stampa i film presenti nel carrello
function printCarrello(json){
    if(json.film){
        $("#defaultCarrello").css("display", "none");
        var totale = 0;
        var film = new Array(); 
        var i = 0 ;
        json.film.forEach(function(item){ 
            var name = item.titolo.replace(/\s/g, '');
            var name = name.replace("?", '');
            var name = name.replace("!", '');
            var name = name.toLowerCase();
            totale = totale + parseInt(item.prezzo); 
            film[i] = item.id;
            i++;
            $('<div/>', {
                'class':'containerFilmCarrello',
                'id': name + 'DivCarrello'
            }).appendTo('#carrelloDiv');
            var img = $('<img/>', {
                'src': '../img/film/'+name+'.jpg',
                'class': 'imgFilmCarrello'
            }).appendTo('#'+name+'DivCarrello');
            $('<p/>', {
                'class': 'titleFilmCarrello'
            }).text(item.titolo).appendTo('#'+name+'DivCarrello');
            $('<p/>', {
                'class': 'prezzoFilmCarrello'
            }).text(item.prezzo + "€").appendTo('#'+name+'DivCarrello');
            var buttonEl= $('<img/>', {
                'src': '../img/elimina.png',
                'class': 'imgEliminaCarrello'
            }).appendTo('#'+name+'DivCarrello');
            buttonEl.on({
                click: function(){
                    $.ajax({
                        url: "../php/backend/getInfoUser.php",
                        type: "POST",
                        datatype: "json",
                        data: {
                          action: "eliminaDaCarrello",
                          film: item.id,
                          username: getCookie('username')
                        },
                        
                        success: function(json){
                            if(json.eliminato){
                                $(location).attr('href', '');
                            }
                            },
                        error: function(xhr){
                          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                          }
                      });
                },
                mouseover: function(){
                    $(this).css('cursor','pointer');
                    $(this).css("background-color", "rgba(245, 229, 1, 0.5)");
                },
                mouseout: function(){
                    $(this).css("background-color", "");
                }
            })
            img.on({
                mouseover: function(){$(this).css('cursor','pointer');},
                click: function(){
                    setCookie('filmId', item.id );
                    $(window.location).attr('href', 'film.php');
                }

            });
            
        });
        $('<div/>', {
            'class':'totaleFilmCarrello',
            'id': 'totaleDivCarrello'
        }).appendTo('#carrelloDiv');
        $('<p/>', {
            'id': "prezzoFilmTotaleCarrello"
        }).text("Totale " + totale + "€").appendTo('#totaleDivCarrello');
        var buttonNoleggia= $('<input/>', {
            'class': "carrello",
            'type':'submit',
            'value':'PROCEDI AL NOLEGGIO',
            'id': 'noleggioCarrello'

        }).appendTo('#totaleDivCarrello');
        
        $('<div/>', {
            'id': 'notificaDivCarrello'
        }).appendTo('#carrelloDiv');
        buttonNoleggia.on({
            click: function(){
                $(this).css("color", "yellow");
                var username = getCookie('username');
                film.forEach(function(item){
                    $.ajax({
                        url: "../php/backend/getFilm.php",
                        type: "POST",
                        datatype: "json",
                        data: {
                        action: "noleggia",
                        film: item,
                        username: username
                        },
                        
                        success: printResNoleggioCarrello,
                        error: function(xhr){
                            ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                        }
                    });
                });
                
            },
            mouseover: function(){
                $(this).css('cursor','pointer');
                $(this).css("background-color", "rgb(35, 3, 110)");
            },
            mouseout: function(){
                $(this).css("background-color", "");
            }
        });

    }

}
// stampa la convalida del noleggio 
function printResNoleggioCarrello(json){
    $("#notificaDivCarrello").css("display", "block");
    if(json.pagamento){
        $('<p/>', {
            'class': 'notificaTextCarrello'
        }).text("Film "+json.pagamento + " noleggiato con successo").css("color", "green").appendTo('#notificaDivCarrello');
    }
    else{
        switch(json.errore){
            case "prezzo alto":
                $('<p/>', {
                    'class': 'notificaTextCarrello'
                }).text("Film "+ json.titolo + " non noleggiato. Saldo insufficiente.").css("color", "red").appendTo('#notificaDivCarrello');
                break;
            case "già presente":
                $('<p/>', {
                    'class': 'notificaTextCarrello'
                }).text("Film "+ json.titolo + " già noleggiato").css("color", "red").appendTo('#notificaDivCarrello');
                break;
            default:
                $('<p/>', {
                    'class': 'notificaTextCarrello'
                }).text("Film "+ json.titolo + " non noleggiato. Riprovare più tardi").css("color", "red").appendTo('#notificaDivCarrello');
                break;
        }
    }
}

//chiede i film preferiti dell'utente
function getInfoPreferiti(){
    $("#wishListDiv").css("display", "block"); 
    
    var username = getCookie("username");
    $.ajax({
        url: "../php/backend/getInfoUser.php",
        type: "POST",
        datatype: "json",
        data: {
          action: "getPreferiti",
          username: username
        },
        
        success: printPreferiti,
        error: function(xhr){
          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
          }
      });
}
//stampa i film preferiti dell'utente
function printPreferiti(json){
    if(json.film){
        $("#defaultPreferiti").css("display", "none");
        json.film.forEach(function(item){
            var name = item.titolo.replace(/\s/g, '');
            var name = name.replace("?", '');
            var name = name.replace("!", '');
            var name = name.toLowerCase();
            $('<div/>', {
                'class':'containerFilmPreferiti',
                'id': name + 'DivPref'
            }).appendTo('#wishListDiv');
            var img = $('<img/>', {
                'src': '../img/film/'+name+'.jpg',
                'class': "imgFilmPref"
            }).appendTo('#'+name+'DivPref');
            $('<div/>', {
                'class':'containerFilmPreferitiR',
                'id': name + 'DivPrefR'
            }).appendTo('#'+name+'DivPref');
            var buttonEl= $('<img/>', {
                'src': '../img/elimina.png',
                'class': 'imgEliminaPref'
            }).appendTo('#'+name+'DivPrefR');
            $('<div/>', {
                'class':'textR',
                'id': name + 'textR'
            }).appendTo('#' + name + 'DivPrefR');
            
            $('<p/>', {
                'class':"titoloPref"
            }).text(item.titolo).appendTo('#'+name + 'textR');
            var button= $('<img/>', {
                'class': "aggCarrelloPref",
                'src' : '../img/carrelloS.png'

            }).appendTo('#'+name+'DivPrefR');
            buttonEl.on({
                click: function(){
                    $.ajax({
                        url: "../php/backend/getInfoUser.php",
                        type: "POST",
                        datatype: "json",
                        data: {
                          action: "eliminaDaPreferiti",
                          film: item.id,
                          username: getCookie('username')
                        },
                        
                        success: function(json){
                            if(json.eliminato){
                                $(window.location).attr('href', '');
                            }
                        },
                        error: function(xhr){
                          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                          }
                      });
                },
                mouseover: function(){
                    $(this).css('cursor','pointer');
                    $(this).css("background-color", "rgba(245, 229, 1, 0.5)");
                },
                mouseout: function(){
                    $(this).css("background-color", "");
                }

            });
            img.on({
                mouseover: function(){$(this).css('cursor','pointer');},
                click: function(){
                    setCookie('filmId', item.id );
                    $(window.location).attr('href', 'film.php');
                }
            })
            button.on({
                click: function(){
                    $(this).attr("src", "../img/carrelloN.png" );
                    $.ajax({
                        url: "../php/backend/getFilm.php",
                        type: "POST",
                        datatype: "json",
                        data: {
                          action: "aggiungiCarrello",
                          film: item.id,
                          username: getCookie('username')
                        },
                        
                        success: carrelloAggiunto,
                        error: function(xhr){
                          ajaxFailed('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                          }
                      });
                },
                mouseover: function(){
                    $(this).css('cursor','pointer');
                    $(this).css("background-color", "rgba(4, 43, 170, 0.418)" );
                },
                mouseout: function(){
                    $(this).css("background-color", "" );
                }
            });

            
        });

    }
    $('<div/>', {
        'id': 'notificaDivPref'
    }).appendTo('#wishListDiv');
}
//stampa lo stato dei noleggi e delle aggiunte al carrello
function carrelloAggiunto(json){

    $("#notificaDivPref").css("display", "block");
    if(json.pagamento){
        $('<p/>', {
            'class': 'notificaTextCarrello'
        }).text("Film "+json.pagamento + " noleggiato con successo").css("color", "green").appendTo('#notificaDivCarrello');
    }
    else{
        switch(json.errore){
            case "prezzo alto":
                $('<p/>', {
                    'class': 'notificaTextCarrello'
                }).text("Film "+ json.titolo + " non noleggiato. Saldo insufficiente.").css("color", "red").appendTo('#notificaDivCarrello');
                break;
            case "già presente":
                $('<p/>', {
                    'class': 'notificaTextCarrello'
                }).text("Film "+ json.titolo + " già noleggiato").css("color", "red").appendTo('#notificaDivCarrello');
                break;
            default:
                $('<p/>', {
                    'class': 'notificaTextCarrello'
                }).text("Film "+ json.titolo + " non noleggiato. Riprovare più tardi").css("color", "red").appendTo('#notificaDivCarrello');
                break;
        }
    }
    if(json.aggiunto){  
        $('<p/>', {
            'id': 'notificaPrefText'
        }).text("Film aggiunto al carrello").css("color", "green").appendTo('#notificaDivPref');
    }  
    else{
        switch(json.errore){
            case 'già presente':
                $('<p/>', {
                    'id': 'notificaPrefText'
                }).text("L' articolo è già presente nel carrello").css("color", "red").appendTo('#notificaDivPref');
                break;
            default:
                $('<p/>', {
                    'id': 'notificaPrefText'
                }).text("Si è verificato un errore generico riprovare più tardi").css("color", "green").appendTo('#notificaDivPref');
                break;
        }
    }    
    

}
//in caso di errore su una chiamata ajax stampa la risposta
function ajaxFailed(text){
    $("body").html(text);
  }