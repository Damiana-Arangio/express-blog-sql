/************
    IMPORT
************/
const connection = require('../data/db.js')    // Import della connessione al Database 


/********************
    FUNZIONI ROTTE
*********************/

// ------------------------------------------------------------------ ROTTA INDEX ----------------------------------------------------------------------------

/* INDEX - mostra tutti i post */
function index (req, res) {

    const query_sql = 'SELECT * FROM posts';        // Definizione della query SQL 

    connection.query(query_sql, (err, results) => { // Esecuzione query SQL

        // Gestione in caso di fallimento - codice di stato HTTP 500
        if (err) { 
            return res.status(500).json({
                error: "Errore durante il recupero dei post dal database"
            });
        }
        // Gestione in caso di successo - lista dei post 
        res.json(results); 
    })
}


// ------------------------------------------------------------------ ROTTA SHOW ----------------------------------------------------------------------------

// SHOW - mostra un post specifico
function show(req, res) {
    res.send("Dettagli del post: " + req.params.id);
}


// ------------------------------------------------------------------ ROTTA STORE ----------------------------------------------------------------------------

// STORE - crea un nuovo post
function store(req, res) {
    res.send("Creato nuovo post");
}


// ------------------------------------------------------------------ ROTTA UPDATE ----------------------------------------------------------------------------

// UPDATE - Aggiorna un post
function update(req, res) {
    res.send("Aggiornato post: " + req.params.id );
}


// ------------------------------------------------------------------ ROTTA DESTROY  ----------------------------------------------------------------------------

// DESTROY - Elimina un post
function destroy(req, res) {
    res.send("Eliminato post: " + req.params.id)
}


/************
    EXPORT
************/
module.exports = { index, show, store, update, destroy };  // Export funzioni controller