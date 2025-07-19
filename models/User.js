const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
     firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
     employeeId: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },    
  },
  {
    timestamps: true,
  }
)

// schema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// schema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// schema.methods.getToken = async function () {
//   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

module.exports = mongoose.model("User", schema);
