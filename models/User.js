const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password:String,
  datteCreation:{
      type:Date,
      default:Date.now()
  }
});

module.exports=User=mongoose.model('user',userSchema)
