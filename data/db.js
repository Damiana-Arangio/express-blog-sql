
/************
    IMPORT
************/
const mysql = require('mysql2');            // Import del pacchetto mysql2
const dotenv = require('dotenv')            // Import del pacchetto dotenv per leggere le variaibli dal file .env
       
/**************************************
    CONNESSIONE CON IL SERVER MYSQL
***************************************/

/* Configurazione del pacchetto dotenv per leggere la password MySQL */
dotenv.config();

/* Configurazione dei parametri per la connessione */
const connection = mysql.createConnection(
    {
    host: 'localhost',                  // Indirizzo del Server MySQL
    user: 'root',                       // Nome utente MySQL
    password: process.env.DB_PASSWORD,  // Password MySQL dal file .env
    database: 'db_blog'                 // Nome del Database 
    }
)

/* Connessione al Database */
connection.connect( err => 
    {
        if(err) throw err;                                      // Solleva eccezione in caso di errore
    console.log('Connessione al database db_blog riuscita!')    // Conferma la connessione
    } 
)

/***************
    EXPORT
****************/
module.exports = connection;        // Export della connessione