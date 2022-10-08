const mongoose = require("mongoose");

const batchesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

const batches = mongoose.model("batches", batchesSchema);

module.exports = batches;