var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../allModels");

const userSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  dob_day: {
    type: Number,
    required: true,
  },
  dob_month: {
    type: Number,
    required: true,
  },
  dob_year: {
    type: Number,
    required: true,
  },
  show_gender: {
    type: Boolean,
  },
  gender_identity: {
    type: String,
    required: true,
  },
  gender_interest: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  matches: [
    {
      user_id: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});

//attachments
userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "process.env.SECRET_KEY");
};

userSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User does not exist !!!");

  // Compare Password
  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) throw new Error("Invalid Credentials !!!");

  return user;
};

// Password Encryption
userSchema.pre("save", function (next) {
  const user = this;

  // password is modified
  if (!user.isModified("password")) return next();

  // generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // assigning hashed password
      user.password = hash;
      return next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
