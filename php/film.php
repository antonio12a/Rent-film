<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: film.php pagina che mostra i dati di un film
*/
include("top.html");
?>
        </title><link href="../css/film.css" type="text/css" rel="stylesheet"/>
        <script src="../javascript/film.js" type="text/javascript"></script>
</head>

<?php
include("banner.html");
?>

    <div id="idMain">
        <h2 id="titleText"></h2>
        <div id="containerFIlm">
            <div id="containerImg">
                <img id="imgFilm" >
            </div>
            <div id="containerTrama"><h3 id="titleTrama">Trama</h2><p id="tramaText"></p></div>
        </div>
        <div id="containerAnno"><p>ANNO  <span id = "annoText" class="in"></span></p></div>
        <div id="containerPrezzo"><p>PREZZO  <span id = "prezzoText" class="in"></span></p></div>
        <div id="containerGenere"><p>GENERE  <span id = "genereText" class="in" ></span></p></div>
        <div id="containerButton">
            <img alt="Aggiungi ai preferiti" class = "btn" id="buttonPreferiti" src="../img/prefS.png">
            <img alt= "Aggiungi al carrello" class = "btn" id="buttonCarrello" src="../img/carrelloS.png">
            <input class="nol" alt="Noleggia" id="buttonNoleggia" type="submit" value="NOLEGGIA">
        </div>
        <div id = "notificaDiv">
            <p id = "notificaText"></p>
        </div>
    </div>



</body>