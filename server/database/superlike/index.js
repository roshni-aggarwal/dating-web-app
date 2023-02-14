var mongoose = require("mongoose");

const superLikeSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("Superlike", superLikeSchema);
