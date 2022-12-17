const { Types } = require("../db");
const axios = require("axios");

//Trae los types de la api y los guarda en la base de datos
const getTypes = async () => {
  // const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
  // const fetchData = apiTypes.data.results;
  // let fetchType = fetchData.map((type) => ({
  //   id: type.id,
  //   name: type.name,
  // }));
  // fetchType.forEach((type) => {
  //   Types.create({
  //     name: type.name,
  //   });
  // });

  const typeToDb = await Types.findAll();

  return [...typeToDb];
};

module.exports = getTypes;
