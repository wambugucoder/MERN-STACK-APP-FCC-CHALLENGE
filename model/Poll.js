const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OptionSchema = new Schema({
    name: {
      type: String,
      required: true
    } ,
    vote: {
        type: Number,
         default:0
      }
  });
const PollSchema = new Schema({
  question: {
    type:String ,
    required: true
  } ,
  choices: [OptionSchema],

 author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    voters: [String],
      
      created: {
        type: Date,
        default: Date.now
      },
       expired: {
           type: Boolean,
           default:false
           
         }
});

module.exports = Poll = mongoose.model("Poll", PollSchema);