const router = require ("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerVideogames = require("./routerVideogames");

const routerGenres = require("./routerGenres");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", routerVideogames);

router.use("/genres", routerGenres);

module.exports = router;

