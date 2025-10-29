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

    // Definizione della query SQL per recuperare i post
    const query_posts = ` 
        SELECT * 
        FROM posts 
    `;

    // Esecuzione query SQL
    connection.query(query_posts, (err, results) => { 

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

    // Definizione della query SQL per recuperare il post
    const query_post = ` 
        SELECT * 
        FROM posts 
        WHERE id = ? 
    `;
    
    // Definizione della query SQL per recuperare i tag collegati al post
    const query_tags = `
        SELECT tags.*
        FROM tags
        JOIN post_tag
            ON tags.id = post_tag.tag_id
         WHERE post_tag.post_id = ?
    `; 

    // Esecuzione query SQL
        // Prima query -> Recupero post
        connection.query(query_post, [id], (err, postResults) => {

            // Gestione in caso di errore - codice di stato HTTP 500
            if (err) {
                return res.status(500).json({
                    error: "Errore durante il recupero del post dal database!"
                });
            }

            // Gestione in caso di post non trovato - codice di stato HTTP 404
            if (postResults.length === 0) {
                return res.status(404).json({
                    error: "Post non trovato!"
                });
            }

            const post = postResults[0];

            // Seconda query -> Recupero tag
            connection.query(query_tags, [id], (err, tagResults) => {

                // Gestione in caso di errore - codice di stato HTTP 500
                if (err) {
                    return res.status(500).json({
                        error: "Errore durante il recupero dei tag!"
                    });
                }

                // Gestione in caso di successo - invia al client il post completo con l'aggiunta dei tag
                post.tags = tagResults;
                res.json(post)  

            })
        })
}


// --------------------------------------------------- ROTTA DESTROY --------------------------------------------------------

// DESTROY - Elimina un post
function destroy(req, res) {

    const id  = parseInt (req.params.id);                       // Recupero id dall'URL

    // Definizione della query SQL per eliminare un post
    const query_post = ` 
        DELETE 
        FROM posts 
        WHERE id = ? 
    `;

    // Esecuzione query SQL
    connection.query(query_post, [id], (err, results) => {

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