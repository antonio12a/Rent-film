<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: profile.php pagina che mostra il dati del profilo, il carrello o la wish list
*/
include("top.html");
?>
        </title><link href="../css/profile.css" type="text/css" rel="stylesheet"/>
        <script src="../javascript/profile.js" type="text/javascript"></script>
</head>

<?php
include("banner.html");
?>

<div id="mainDiv">
    <div id="datiDiv">
        <div class="title"><h2>I miei dati</h2></div>
        <div id="containerDati">
            <img src="../img/avatar.png" id="profiloMain">
            <div id = "datiLeft">
                <p class="textLeft">Nome: <span id="nomeIn" class="in"></span></p>
                <span><p class="textLeft">Cognome: <span id="cognomeIn" class="in"></span></p>
                <span><p class="textLeft">E-mail: <span id="emailIn" class="in"></span></p>
            </div>
        </div>
    </div>

    <div id="saldoDiv">
        <div class="title"><h2>Il mio saldo</h2></div>
        <div id = "saldoDati">
            <p class="textLeft">Saldo: <span id="saldoIn" class="in"></span></p>
            <input type="number" id="labelRicarica" name="ricaricaImporto"><input type="submit" id="buttonRicarica" value="RICARICA"><p id= "statoRicarica"></p>
        </div>
    </div>

    <div id="ordiniDiv">
        <div class="title"><h2>I miei ordini</h2></div>
        <div id="defaultOrdini">
            <p id="ordiniDefault">Non hai ancora effettuato nessun noleggio.</br> <span>Scopri subito i <span class="titolidisp" >titoli disponibili</span>.</span></p>
        </div>
    </div>

    <div id="logoutDiv">
        <input type="submit" id="buttonLogOut" value="LOG-OUT">
    </div>


    <div id="carrelloDiv">
        <div class="title"><h2>Il mio carrello</h2></div>
        <div id="defaultCarrello"><p id="defaultText"> Non ci sono film nel carrello. <span>Scopri subito i <span class="titolidisp" >titoli disponibili</span>.</span></p></div>
        
    </div>
    
    <div id="wishListDiv">
        <div class="title"><h2>La mia wish list</h2></div>
        <div id="defaultPreferiti"><p> Non ci sono film nei preferiti. <span>Scopri subito i <span class="titolidisp" >titoli disponibili</span>.</span></p></div>
    </div>

</div>

<?php
    include("footer.html");
?>  
