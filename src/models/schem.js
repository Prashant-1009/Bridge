const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();


const userschema = new mongoose.Schema({

  rollno:
  {
    type: Number,
    required: true,
    unique: true

  },

  clgname:
  {
    type: String,
    required: true
  },

  course:
  {
    type: String,
    required: true
  },

  branch:
  {
    type: String,
    required: true
  },

  passingyear:
  {
    type: String,
    required: true
  },

  mobileno:
  {
    type: Number,
    required: true,
    unique: true,
    validate(value) {
      if (value <= 999999999 || value > 9999999999)
        throw new Error("invalid mobile no");
    }

  },

  email:
  {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    }

  },

  password:
  {
    type: String,
    required: true
  }

})


const user = new mongoose.model("infouser", userschema);

module.exports = user;