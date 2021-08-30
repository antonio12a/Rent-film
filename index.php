<!--
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: index.php pagina di login/registrazione
-->  
<!DOCTYPE html>
<html>
    <head>
    <meta char_set = "UTF-8" >
    <meta name="rent Film" content="Film da noleggiare! Iscriviti subito su rentfilm.it" >
        <link rel="icon" href="img/icona.ico" />
        <link href="css/index.css" type="text/css" rel="stylesheet"/>
        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
        <script src="javascript/index.js" type="text/javascript"></script>
        <script src="javascript/cookies.js" type="text/javascript"></script>
        <title>
            Rent Film
        </title>
        
    </head>
    <body>
        <header>
            <img src="img/logo.png" class="inline" id="logoImg">
        </header>
        <div class ="form">
            <form>
                <div class="text" id = "title">Accedi</div>
                <div id="username">
                    <div><label id="usLab">Username</label></div>
                    
                <input id="usText" type="text" required></div>
                <div class= "error" id = "usErrDiv" ><p id="usErr">w</p></div>
                <div id="password">
                <div><label id="paLab">Password</label></div>
                    <input id="paText" type="password" required>
                </div>
                <div class= "error" id = "paErrDiv"><p id="paErr">w</p></div>
                <input class="btn" type="button" id="accediBtn" value="ACCEDI">
                
                <div id="registrazione">
                <div id="nonRegistrato">-----Non sei ancora registrato?----</div>
                <input  class="btn" type="button" id="registratiBtn" value="REGISTRATI">
                </div>
            </form>
        </div>
        <div class ="formRegistrazione">
            <form>
                <div class="text" id = "title">Registrati</div>
                <div id="container">
                <div class ="left" id = "l"><div class ="left" id="nome">
                    <div><label>Nome</label></div>
                    <input id="nomeIn" type="text" required>
                </div>
                <div class ="left" id="cognome">
                    <div><label>Cognome</label></div>
                    <input id="cognomeIn" type="text" required>
                </div>
                <div class ="left" id="email">
                    <div><label>Email</label></div>
                    <input id="emailIn" type="text" required>
                </div>
                </div>
                <div id = "r" class ="right"><div class ="right" id="username">
                    <div><label>Username</label></div>
                    <input id="usernameIn" type="text" required>
                </div>
                <div class ="right" id="password">
                <div><label>Password</label></div>
                    <input id="passwordIn" type="password" required>
                </div>
                <div><p id="textError"></p></div>
                </div>
                </div>  
                <div id="accesso"><input class="btn" type="button" id = "registratiBtnR" value="REGISTRATI">
                <div id="Registrato">-----Sei già registrato?----</div>
                <input class="btn" type="button" id = "accediBtnR" value = "ACCEDI">
                </div>
            </form>
        </div>
        <footer></footer>
        
    </body>
</html>
