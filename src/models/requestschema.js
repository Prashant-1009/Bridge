const mongoose = require('mongoose');
require('dotenv').config();


const Requestschema = new mongoose.Schema({


  productname:
  {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30

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

  rollno:
  {
    type: Number,
    required: true,

  },
  mobileno:
  {
    type: Number,
    required: true
  }

})


const Request = new mongoose.model(process.env.re, Requestschema);

module.exports = Request;