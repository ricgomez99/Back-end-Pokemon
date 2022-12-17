const Router = require("express");
const router = Router();
const getTypes = require("../controllers/getTypes");

router.get("/types", async (req, res) => {
  try {
    const types = await getTypes();
    res.send(types);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
