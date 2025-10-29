/************
    IMPORT
************/
const connection = require('../data/db.js')    // Import della connessione al Database 


/********************
    FUNZIONI ROTTE
*********************/

// --------------------------------------------------- ROTTA INDEX --------------------------------------------------------

/* INDEX - mostra tutti i post */
function index (req, res) {

    const query_sql = 'SELECT * FROM posts';        // Definizione della query SQL

    // Esecuzione query SQL
    connection.query(query_sql, (err, results) => { 

        // Gestione in caso di fallimento - codice di stato HTTP 500
        if (err) { 
            return res.status(500).json({
                error: "Errore durante il recupero dei post dal database!"
            });
        }
        // Gestione in caso di successo - lista dei post 
        res.json(results); 
    })
}


// --------------------------------------------------- ROTTA SHOW --------------------------------------------------------

// SHOW - mostra un post specifico
function show(req, res) {
    res.send("Dettagli del post: " + req.params.id);
}


// --------------------------------------------------- ROTTA DESTROY --------------------------------------------------------

// DESTROY - Elimina un post
function destroy(req, res) {

    const id  = parseInt (req.params.id);                        // Recupero id dall'URL
    const query_sql = 'DELETE FROM posts WHERE id = ? ';        // Definizione della query SQL 

    // Esecuzione query SQL
    connection.query(query_sql, [id], (err, results) => {

        // Gestione in caso di fallimento - codice di stato HTTP 500
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