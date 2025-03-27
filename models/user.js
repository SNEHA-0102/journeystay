
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//passport-local-mongoose will define the username and password by default
//with hashing and salting  
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});

// Apply plugin to the schema first
userSchema.plugin(passportLocalMongoose);

// Then create and export the model
module.exports = mongoose.model("User", userSchema);