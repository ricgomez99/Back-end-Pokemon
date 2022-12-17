const { Router } = require("express");
const getPokemons = require("../controllers/getPokemons");
const createPokemon = require("../controllers/createPokemon");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonByName = require("../controllers/getPokemonByName");
const router = Router();

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const pokemonName = await getPokemonByName(name);
      res.status(200).send(pokemonName);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    try {
      const pokemons = await getPokemons();
      res.status(200).send(pokemons);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
});

router.get("/pokemons/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await getPokemonById(id);
    res.status(200).send(pokemon);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/pokemons", async (req, res) => {
  try {
    let { name, life, attack, defense, speed, height, weight, types } =
      req.body;
    const pokemon = await createPokemon(
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );
    res.status(201).send({ create: "ok", pokemon: pokemon });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
