<?php
/*
**  AUTORE: Antonio Santoro
**  SITO: Rent Film
**  DESCRIZIONE: Sito che permette agli utenti registrati di poter noleggiare film
**  FILE: home.php pagina che contiene l' home page
*/
include("backend/db.php");
include("top.html");
?>

    <link href="../css/home.css" type="text/css" rel="stylesheet"/>
    <script src="../javascript/home.js" type="text/javascript"></script>
    
    </head>
<?php
    include("banner.html");
?>
        <!-- Main che contiene i film e le categorie-->
        <div id="containerMain">
        <?php 
            $db = connectDb();
            $rows = $db->query("SELECT DISTINCT genere FROM film");
            foreach ($rows as $row) { 
                $genere = $row["genere"];
                $genere=str_replace("\s", "", $genere);
                $genere = strtolower($genere);
                $genereQ = $db->quote($row["genere"]);
                ?> 
                <div class = "titleGenere" id = "<?= $genere?>Title">
                    <p id = "<?= $genere?>Text" class = "textGenere"><?=$row["genere"]?></p>
                </div>
                <div class = "containerGenere" id = "<?= $genere?>Div">
                </div> 
                <?php } ?>
        </div>
<?php
    include("footer.html");
?>    
