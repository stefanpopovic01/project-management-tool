const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required.'],
        minLenght: [2, "Username should have minimum 2 characters."]
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email not in valid format.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [3, "Password must have 3+ characters."]
    },
    name: {
      type: String,
        minLenght: [2, "Name should have minimum 1 character."]
    },
    description: {
        type: String,
        default: ""
    },
    avatar: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    refreshToken: {
        type: String, 
        default: null
    }
}, { timestamps: true } );

userSchema.pre('save', async function (next) {

  if (this.username) {
    this.username = this.username.toLowerCase();
  }
  
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
    
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);