const express = require('express');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 username : {
    type: String,
    required: true
  } ,
  email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
      },
      role: {  //TWO ROLES:USER $ ADMIN
          type: String,
          required: true,
          default:"user"
        },
        joined: {
            type: Date,
            default: Date.now
          }
});

module.exports = User = mongoose.model("User", UserSchema);

