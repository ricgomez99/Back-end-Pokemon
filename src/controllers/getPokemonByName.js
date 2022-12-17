const { Pokemon, Types } = require("../db");
const axios = require("axios");

const getPokemonByName = async (name) => {
  let pokemonDb = await Pokemon.findOne({
    where: {
      name: name,
    },
    include: [
      {
        model: Types,
        through: { attributes: [] },
      },
    ],
  });
  if (pokemonDb) {
    let pokemon = {
      id: pokemonDb.id,
      name: pokemonDb.name,
      life: pokemonDb.hp,
      attack: pokemonDb.attack,
      defense: pokemonDb.defense,
      speed: pokemonDb.speed,
      height: pokemonDb.height,
      weight: pokemonDb.weight,
      types:
        pokemonDb.types.length < 2
          ? [{ name: pokemonDb.types[0].dataValues.name }]
          : [
              { name: pokemonDb.types[0].dataValues.name },
              { name: pokemonDb.types[1].dataValues.name },
            ],
    };
    return pokemon;
  } else {
    const pokemonApiName = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    const fetchedPokemon = objectApi(pokemonApiName.data);
    return fetchedPokemon;
  }
};

const objectApi = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  life: pokemon.stats[0].base_stat,
  attack: pokemon.stats[1].base_stat,
  defense: pokemon.stats[2].base_stat,
  speed: pokemon.stats[5].base_stat,
  height: pokemon.height,
  weight: pokemon.weight,
  img: pokemon.sprites.other["official-artwork"].front_default,
  types:
    pokemon.types.length < 2
      ? [{ name: pokemon.types[0].type.name }]
      : [
          { name: pokemon.types[0].type.name },
          { name: pokemon.types[1].type.name },
        ],
});

module.exports = getPokemonByName;
