const mongoose = require('mongoose')

const person_schema = mongoose.Schema(
    {
        name :{
            type : String,
            require : true,
        },
        age : {
            type : Number,

        },
        fav_food : ["pizza","spaghetti","sushi","saki","meat"],
    },
    {
        collection : "person",
    }
);


const person_model = mongoose.model("person",person_schema);
module.exports = person_model;