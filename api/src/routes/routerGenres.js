const routerGenres = require("express").Router();

const getGenres = require("../controllers/getGenre")

routerGenres.get("/", getGenres);


module.exports = routerGenres