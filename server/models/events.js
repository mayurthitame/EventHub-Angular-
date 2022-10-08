const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    name :{
        type :String,
    },
    descriptor : {
        type :String,
    },
    Teacher : {
        type :String,
    }
});

const events = mongoose.model("events", eventsSchema);


module.exports = events;