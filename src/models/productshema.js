const mongoose = require('mongoose');
require('dotenv').config();


const Productschema = new mongoose.Schema({


  product:
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
  },
  price:
  {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0)
        throw new Error("Price can't be negative");
    }

  },
  image:
  {
    type: String,
    required: true

  }

})


const Product = new mongoose.model(process.env.pr, Productschema);

module.exports = Product;