-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 30, 2021 alle 18:26
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `progetto`
-- Autore: Antonio Santoro

-- --------------------------------------------------------

--
-- Struttura della tabella `acquisti`
--

CREATE TABLE `acquisti` (
  `username` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `film_id` int(20) NOT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `username` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `film_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Struttura della tabella `film`
--

CREATE TABLE `film` (
  `titolo` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `genere` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `trama` text COLLATE utf8mb4_bin NOT NULL,
  `id` int(11) NOT NULL,
  `prezzo` int(11) DEFAULT NULL,
  `durata` int(11) DEFAULT NULL,
  `anno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dump dei dati per la tabella `film`
--

INSERT INTO `film` (`titolo`, `genere`, `trama`, `id`, `prezzo`, `durata`, `anno`) VALUES
('Ricomincio da tre', 'Commedia', 'Gaetano, napoletano timido, arriva a Firenze con un candidato al suicidio, si fa sedurre da una disinibita infermiera, scappa, ritorna. Si ritrova con un figlio che potrebbe essere non suo. Raro esempio di un film che ha messo d\'accordo critica e pubblico. Quello di Troisi è uno degli esordi più folgoranti nel campo della nuova commedia italiana degli anni \'80. Vicino, come attore, a Eduardo più che a Peppino De Filippo o a Totò, Troisi combina felicemente nel suo agro umorismo ironia e tenerezza, condendolo con una fantasia nevronapoletana e invenzioni seicentesche. Il Seicento è un secolo partenopeo.', 1, 4, 109, 1981),
('È per il tuo bene', 'Commedia', 'Tre famiglie entrano in crisi quando le rispettive figlie si fidanzano. I tre padri temono che le loro figlie abbiano tutte scelto un fidanzato sbagliato. Disperati e sicuri di agire per il bene delle proprie figlie si uniscono per disfarsi il prima possibile dei tre pretendenti. Così facendo rischieranno di rovinare i loro stessi matrimoni mettendo a dura prova la pazienza delle loro mogli.', 2, 6, 90, 2020),
('Questione di karma', 'Commedia', 'Giacomo (Fabio De Luigi) è l\'erede di una dinastia di industriali segnato dalla morte del padre avvenuta quando era piccolo. L\'incontro con un esoterista gli farà cambiare prospettiva: questi infatti afferma di aver individuato la reincarnazione di suo padre: un tal Mario Pitagora (Elio Germano), un uomo materialista, pieno di debiti e tutt\'altro che spirituale.', 3, 3, 130, 2017),
('Torno indietro e cambio vita', 'Commedia', 'Marco ha una vita perfetta. Ma un giorno, sua moglie Giulia gli confessa che ha un altro uomo. Per fortuna a consolarlo c\'è Claudio, al quale confida di voler tornare indietro e cambiare la propria vita! Detto fatto: i due amici si ritrovano di punto in bianco nel 1990, cresciuti ma per gli altri ancora dei ragazzi. Marco ha così la possibilità di cambiare davvero il corso del suo destino.', 4, 6, 80, 2015),
('Ti presento Sofia', 'Commedia', 'Gabriele, ex rocker, ora negoziante di strumenti musicali, divorziato, è un papà premuroso e concentrato esclusivamente sulla figlia di 10 anni. Quando gli amici gli presentano nuove donne...', 5, 5, 98, 2018),
('Anna', 'Thriller', 'È la storia di Anna (Sasha Luss), una giovane dalla straordinaria bellezza con un violento passato alle spalle. La ragazza nasconde un grande segreto dietro il suo volto d\'angelo: è un temibile killer del KGB. Dopo l\'addestramento, viene affidata a Olga (Helen Mirren), che di volta in volta le affida compiti e mansioni con un solo fine, l\'omicidio.', 6, 7, 110, 2020),
('7500', 'Thriller', 'Quando dei terroristi provano a prendere il controllo di un volo Berlino-Parigi, un giovane e mite copilota americano lotta per salvare la vita dei passeggeri e dell\'equipaggio, riuscendo ad instaurare un rapporto con uno dei dirottatori.', 7, 8, 92, 2020),
('Drone', 'Thriller', 'Neil (Sean Bean) è un pilota di droni privato che trascorre i suoi giorni di lavoro a svolgere missioni segrete, senza che sua moglie o suo figlio sappiano della sua reale professione. Quando un enigmatico uomo d\'affari pakistano lo rintraccia, credendolo responsabile della morte della sua famiglia, la vita di Neil rischia di essere compromessa per sempre.', 8, 4, 80, 2017),
('Red', 'Thriller', 'Avery Ludlow (Brian Cox) è un vedovo anziano che vive solo con il suo cane, Red. Quando tre ragazzini, senza un motivo, uccidono l\'animale, Avery si lancia in cerca di vendetta. Una vendetta per la quale ogni mezzo si mostrerà valido.', 9, 7, 70, 2008),
('Vendicami', 'Thriller', 'Una donna, un uomo, due bambini. Lei di origine francese, lui cinese. All\'improvviso la morte che entra in casa per mano di sicari che compiono una strage.', 10, 2, 83, 2009),
('Rapimento e ricatto', 'Azione', 'Il Primo Ministro belga viene rapito con i suoi familiari e ricattato: se vuole rivederli vivi dovrà uccidere il Presidente degli Stati Uniti. Si troverà a dover scegliere tra la sua famiglia e il suo dovere di cittadino. Con Koen De Bouw', 11, 6, 84, 2016),
('Giochi di potere', 'Azione', 'Michael è un giovane idealista appena assunto nel team dell\'ONU addetto al programma Oil For Food, nato per permettere all\'Iraq post-bellico di vendere petrolio sul mercato mondiale in cambio di beni di prima necessità. Dietro gli scopi umanitari si cela, però, una vasta rete di corruzione che coinvolge i più alti vertici dell\'ONU. Svelare questi retroscena sarebbe uno scandalo mondiale.', 12, 6, 102, 2017),
('Made in France', 'Azione', 'Un giornalista s\'infiltra spontaneamente in una nascente cellula terroristica. Di giorno in giorno l\'uomo rischia sempre di più di essere smascherato e la sua incolumità, soprattutto quando il gruppo inizia a mettere a punto il piano per un attentato; la polizia poi si mette in contatto con il giornalista, dandogli l\'unica possibilità per uscirne vivo.', 13, 5, 102, 2016),
('Bordering', 'Azione', 'Un soldato libanese entra per sbaglio in una base di comunicazione israeliana top secret. Consapevole di essere nel posto sbagliato al momento sbagliato, il libanese sorprende i due nemici, li immobilizza e prova ad andarsene, ma la porta della base, che si è chiusa dietro di lui ha un meccanismo a tempo per cui rimarrà chiusa per le prossime sei ore. Una commedia sulla guerra e gli uomini.', 14, 3, 89, 2016),
('Olè', 'Comico', 'Il film racconta la storia di una gita scolastica attraverso la Spagna. Ad accompagnare gli studenti del liceo milanese “Giuseppe Verdi” sono due professori: Archimede Formigoni docente di matematica e Salvatore Rondinella detto Sasà, professore di lettere.', 15, 5, 89, 2006),
('Fantozzi contro tutti', 'Comico', 'Tra le disavventure di Fantozzi, l\'ufficio va a fuoco, la moglie lo cornifica, una corsa ciclistica fra dipendenti della stessa società si conclude disastrosamente', 16, 6, 89, 1980),
('Il cosmo sul comò', 'Comico', 'Tre amici decidono di partire per le vacanze, ciascuno con la propria famiglia, ma un incidente d’auto rovina i piani. ', 17, 7, 90, 2008),
('Ma tu di che segno 6?', 'Comico', 'Un cast stellare della commedia italiana alle prese con gli influssi astrali. La quarta parola più cliccata sui motori di ricerca, dopo Papa Bergoglio, il Meteo e YouTube è proprio Oroscopo. Attraverso cinque storie si indagano gli effetti esilaranti dell\'astrologia sulla vita di tutti i giorni. Si prevedono un sacco di risate!', 18, 7, 83, 2014),
('Metti la nonna in freezer', 'Comico', 'Un cast stellare della commedia italiana alle prese con gli influssi astrali. La quarta parola più cliccata sui motori di ricerca, dopo Papa Bergoglio, il Meteo e YouTube è proprio Oroscopo. Attraverso cinque storie si indagano gli effetti esilaranti dell\'astrologia sulla vita di tutti i giorni. Si prevedono un sacco di risate', 19, 7, 92, 2018),
('Arrivano i prof', 'Comico', 'Mentre tutti festeggiano le promozioni all’esame di maturità, al liceo Manzoni c’è grande preoccupazione: solo il 12% degli studenti è riuscito a conseguire il diploma. Il Manzoni ha un primato: è il peggior liceo d’Italia. Non sapendo più che soluzioni adottare, il Preside decide di reclutare i peggiori insegnanti nella speranza che dove hanno fallito i migliori.', 20, 5, 92, 2018),
('Outing - fidanzati per sbaglio', 'Commedia', 'Federico e Riccardo sono due giovani pugliesi. Uno è un playboy, l\'altro un aspirante stilista di moda a Milano. I due pur di ottenere un finanziamento per attività nel campo della moda riservato alle coppie di fatto si fingeranno una coppia omosessuale.', 21, 4, 73, 2013),
('Impepata di nozze', 'Commedia', 'Michele, professore precario quarantenne, rimane senza incarico e si ritrova, nonostante sia stato lasciato sull\'altare e soffra ancora, ad aiutare la sorella nella sua agenzia di wedding planner. La sua idea sulle donne e sul matrimonio cambieranno quando in agenzia si presenta Yulya con il suo futuro marito. Da quel momento Michele farà di tutto pur di conquistare la ragazza...', 22, 7, 74, 2012),
('Nati stanchi', 'Commedia', 'Salvo e Valentino sono due giovani siciliani che articolano la loro vita tra la piazza del paese e l\'attività in cui concentrano il massimo impegno: partecipare concorsi cercando di sostenere le prove nel peggior modo possibile. Insomma il concorso visto soltanto come occasione per interrompere la routine quotidiana e per sfuggire qualche giorno alla stretta morsa delle eterne fidanzate.', 23, 7, 69, 2014),
('Qualunquemente', 'Commedia', 'Cetto La Qualunque torna in patria. I suoi vecchi amici lo informano che le sue proprietà sono minacciate da una inarrestabile ondata di legalità che sta invadendo la loro cittadina. Le imminenti elezioni potrebbero avere come esito la nomina a sindaco di Giovanni De Santis, un paladino dei diritti. Così Cetto decide di salire in politica per difendere la sua città.', 24, 7, 78, 2016),
('Benedetta follia', 'Commedia', 'Guglielmo, uomo di specchiate virtù cristiane, è proprietario di un negozio di articoli religiosi e alta moda per vescovi e cardinali. Sua moglie Lidia, devota consorte da 25 anni, decide di mollarlo proprio il giorno del loro anniversario di matrimonio, stravolgendo il suo mondo e tutte le sue certezze.', 25, 4, 90, 2018),
('Un fantastico via vai', 'Commedia', 'Arnaldo, Anita e le due gemelle Martina e Federica, ecco la famiglia Nardi. Una tranquilla e normalissima famiglia medio borghese. Lui impiegato, lei insegnante e le figlie studentesse con l’esame di terza media alle porte. Arnaldo ha 45 anni, la tipica età in cui tiri le somme e fai i bilanci per rispondere alla fatidica domanda: sono felice? ', 26, 6, 89, 2013);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `username` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `nome` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `cognome` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `saldo` int(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='raccolta di utenti';

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`username`, `password`, `nome`, `cognome`, `email`, `saldo`) VALUES
('mariorossi01', '156c706359eac32eda61b8d73a790c32', 'Mario', 'Rossi', 'rossimario@gmail.com', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `wish_list`
--

CREATE TABLE `wish_list` (
  `film_id` int(20) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `acquisti`
--
ALTER TABLE `acquisti`
  ADD KEY `film_id` (`film_id`),
  ADD KEY `username` (`username`);

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD KEY `username` (`username`),
  ADD KEY `film_id` (`film_id`);

--
-- Indici per le tabelle `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indici per le tabelle `wish_list`
--
ALTER TABLE `wish_list`
  ADD KEY `usern` (`username`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `wish_list`
--
ALTER TABLE `wish_list`
  ADD CONSTRAINT `usern` FOREIGN KEY (`username`) REFERENCES `utenti` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
