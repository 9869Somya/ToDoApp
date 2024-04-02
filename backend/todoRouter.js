const router = require("express").Router();
const Todo = require("./model/Todo");

router.get("/", async (req, res) => {
  try {
    const from = req.query.from;
    const queryObj = {};

    if (from) {
      queryObj.date = {
        $gte: from,
      };
    }
    const todos = await Todo.find(queryObj);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching todos" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const item = new Todo({ name });
    const savedItem = await item.save();
    res.json({ message: "Added Successfully", type: "Success", savedItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
