/************
    IMPORT
************/
const connection = require('../data/db.js')    // Import della connessione al Database 


/********************
    FUNZIONI ROTTE
*********************/

// --------------------------------------------------- ROTTA INDEX --------------------------------------------------------

// INDEX - mostra tutti i post
function index (req, res) {

    const query_sql = 'SELECT * FROM posts';        // Definizione della query SQL

    // Esecuzione query SQL
    connection.query(query_sql, (err, results) => { 

        // Gestione in caso di errore - codice di stato HTTP 500
        if (err) { 
            return res.status(500).json({
                error: "Errore durante il recupero dei post dal database!"
            });
        }
        // Gestione in caso di successo - invia al client la lista dei post 
        res.json(results); 
    })
}


// --------------------------------------------------- ROTTA SHOW --------------------------------------------------------

// SHOW - mostra un post specifico
function show(req, res) {
    const id = parseInt(req.params.id);                        // Recupero id dall'URL
    const query_sql = 'SELECT * FROM posts WHERE id = ? ';     // Definizione della query SQL 

    // Esecuzione query SQL
    connection.query(query_sql, [id], (err, results) => {

        // Gestione in caso di errore - codice di stato HTTP 500
        if (err) {
            return res.status(500).json({
                error: "Errore durante il recupero del post dal database!"
            });
        }

        // Gestione in caso di post non trovato - codice di stato HTTP 404
        if (results.length === 0) {
            return res.status(404).json({
                error: "Post non trovato!"
            });
        }

        // Gestione in caso di successo - invia al client il post richiesto
        res.json(results[0])
    })
}


// --------------------------------------------------- ROTTA DESTROY --------------------------------------------------------

// DESTROY - Elimina un post
function destroy(req, res) {

    const id  = parseInt (req.params.id);                       // Recupero id dall'URL
    const query_sql = 'DELETE FROM posts WHERE id = ? ';        // Definizione della query SQL 

    // Esecuzione query SQL
    connection.query(query_sql, [id], (err, results) => {

        // Gestione in caso di errore - codice di stato HTTP 500
        if (err) {
            return res.status(500).json({
                error: "Errore durante l'eliminazione del post dal database!"
            });
        }
        // Gestione in caso di successo - codice di stato HTTP 204 (No Content)
        res.sendStatus(204);
    })
}


/************
    EXPORT
************/
module.exports = { index, show, destroy };  // Export funzioni controller