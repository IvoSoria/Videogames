const router = require("express").Router();

// Importar todos los routers;
const routerVideogames = require("./routerVideogames");
const routerGenres = require("./routerGenres");

// Configurar los routers
router.use("/videogames", routerVideogames);
router.use("/genres", routerGenres);

module.exports = router;

