/************
    IMPORT
************/
const express = require('express')                               // Import Express
const postController = require('../controllers/postController')   // Import Controller dei post

/*************
    ROUTER
*************/
const router = express.Router() // Inizializzazione router express

// Definizione delle rotte CRUD - entità post
router.get('/', postController.index);          // Mostra tutti i post
router.get('/:id', postController.show);        // Mostra un post specifico
router.delete('/:id', postController.destroy);  // Elimina un post

/************
    EXPORT
************/
module.exports = router; // Export del router