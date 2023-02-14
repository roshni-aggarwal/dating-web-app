var mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("Like", likeSchema);
