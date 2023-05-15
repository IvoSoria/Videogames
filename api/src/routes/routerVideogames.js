const routerVideogames = require ("express").Router();

const {
    getVideogames,
    getIdVideogame,
    postVideogame} = require("../controllers/getVideogame");


routerVideogames.get("/", getVideogames);

routerVideogames.get("/:id", getIdVideogame);

routerVideogames.post("/", postVideogame);


module.exports = routerVideogames



