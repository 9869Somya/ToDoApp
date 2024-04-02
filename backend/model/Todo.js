const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("ToDos", TodoSchema);
