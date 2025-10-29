/************
    IMPORT
************/


/********************
    FUNZIONI ROTTE
*********************/

// INDEX - mostra tutti i post
function index (req, res) {
    res.send("Lista dei post");
}

// SHOW - mostra un post specifico
function show(req, res) {
    res.send("Dettagli del post: " + req.params.id);
}

// STORE - crea un nuovo post
function store(req, res) {
    res.send("Creato nuovo post");
}

// UPDATE - Aggiorna un post
function update(req, res) {
    res.send("Aggiornato post: " + req.params.id );
}

// DESTROY - Elimina un post
function destroy(req, res) {
    res.send("Eliminato post: " + req.params.id)
}


/************
    EXPORT
************/
module.exports = { index, show, store, update, destroy };  // Export funzioni controller