const { Pokemon, Types } = require("../db");
const axios = require("axios");

const getPokemonById = async (id) => {
  if (id.length > 2) {
    let pokemonDetail = await Pokemon.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Types,
          through: { attributes: [] },
        },
      ],
    });
    let pokemon = {
      id: pokemonDetail.id,
      name: pokemonDetail.name,
      life: pokemonDetail.hp,
      attack: pokemonDetail.attack,
      defense: pokemonDetail.defense,
      speed: pokemonDetail.speed,
      height: pokemonDetail.height,
      weight: pokemonDetail.weight,
      types:
        pokemonDetail.types.length < 2
          ? [{ name: pokemonDetail.types[0].dataValues.name }]
          : [
              { name: pokemonDetail.types[0].dataValues.name },
              { name: pokemonDetail.types[1].dataValues.name },
            ],
    };
    return pokemon;
  } else {
    const pokemonInApi = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id.toString()}`
    );
    const fetchedPokemon = objectApi(pokemonInApi.data);

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

module.exports = getPokemonById;
