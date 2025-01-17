const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AdminSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        latitude:{type:String, required:true},
        longitude:{type:String, required:true},
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Admin", AdminSchema);