const { Pokemon, Types } = require("../db");

const createPokemon = async (
  name,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  let newPokemon = await Pokemon.create({
    name,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
  });
  const pokeTypes = await Types.findAll({
    where: {
      name: types,
    },
  });

  newPokemon.addType(pokeTypes);
  return newPokemon;
};

module.exports = createPokemon;
