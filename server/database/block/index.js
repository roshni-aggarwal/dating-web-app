var mongoose = require("mongoose");

const blockSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("Block", blockSchema);
