const { Pokemon, Types } = require("../db");
const axios = require("axios");

const getPokemons = async () => {
  const apiPokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=40"
  );
  const subRequest = apiPokemons.data.results.map((element) =>
    axios.get(element.url)
  );
  const dataPokemon = await axios.all(subRequest);
  const pokemon = dataPokemon.map((element) => element.data);

  const requestedPokemons = (pokemon) => {
    const data = {
      id: pokemon.id,
      name: pokemon.name,
      life: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
      img: pokemon.sprites.other["official-artwork"].front_default,
      types: pokemon.types.map((el) => el.type.name),
    };
    return data;
  };

  const pokemonInfo = pokemon.map((pokemon) => requestedPokemons(pokemon));
  const pokemonDb = await Pokemon.findAll({
    include: [
      {
        model: Types,
        through: { attributes: [] },
      },
    ],
  });

  return [...pokemonInfo, ...pokemonDb];
};

module.exports = getPokemons;
