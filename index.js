require('dotenv').config();
const mongoose = require('mongoose');
const person_model = require('./models/person');

// a function to Create and Save a Record of a Model:
const add_new_person = async()=>{
    const new_person_model = new person_model({
        name : "houcem",
        age : 20,
        fav_food : ["meat","sushi"],
    });
    const new_person_model1 = new person_model({
        name : "luffy",
        age : 20,
        fav_food : ["meat","sushi"],
    });
    const new_person_model2 = new person_model({
        name : "zoro",
        age : 21,
        fav_food : ["saki"],
    });
    const new_person_model3 = new person_model({
        name : "sanji",
        age : 30,
        fav_food : ["spaghetti","pizza"],
    });

    var res= await new_person_model.save();
    var res= await new_person_model1.save();
    var res= await new_person_model2.save();
    var res= await new_person_model3.save();

};


mongoose.connect(process.env.DB_URL,{}).then(async()=>{
  
    console.log("db_connected😎")
//create and save a record of a model
    await add_new_person();


//Use model.find() to Search Your Database
    const name_to_find = 'luffy';
    const peopleWithGivenName = await findd(name_to_find);
    console.log(`People with the name ${peopleWithGivenName}:`)



//Use model.findOne() to Return a Single Matching Document from Your Database
    const food_to_find = ['saki'];
    const person_with_given_food = await findd_food(food_to_find);
    console.log('person with this fav food ${food_to_find}',person_with_given_food);



//Use model.findById() to Search Your Database By _id

    const person_to_find = '65345e1172e0b46b0173079e';
    const found_person = await findd_by_id(person_to_find);
    if (found_person){
        console.log('person found',found_person)
    }else{
        console.log('person not found')
    }



//Perform New Updates on a Document Using model.findOneAndUpdate()

    const name_to_update = "sanji";
    const updated_person = await update_person_age_by_name(name_to_update);
    console.log(updated_person);




//Delete One Document Using model.findByIdAndRemove

    const id_to_delete = '65345e1172e0b46b017307a0';
    const deleted_person_by_id = await delete_person_by_id(id_to_delete);



//Chain Search Query Helpers to Narrow Search Results

    const person_who_love_sakii = await  person_who_love_saki();
    console.log(person_who_love_sakii);


   
}
).catch((err)=>{
    throw err;
}).finally(()=>{
    console.log("all done👌")
})


async  function findd(name_to_find) {
    
   return await person_model.find({name : name_to_find});
    
}


async  function findd_food(food_to_find) {
    
   return await person_model.findOne({fav_food : food_to_find});

}


async  function findd_by_id(person_id) {
    
    return await person_model.findById(person_id);
     
 }

 async  function update_person_age_by_name(person_name) {
    

    return await person_model.findOneAndUpdate({
        name : person_name,
        age : 20,
        new : true,

    });
     
 }

 async  function delete_person_by_id(person_id) {
    
    try{

    
    return await person_model.findByIdAndRemove(person_id);
    }catch(err){
        throw err;
    }
 }

 async  function person_who_love_saki() {
    
    return await person_model.find({fav_food : 'saki'}).sort('name').limit(2).select({age : 0}).exec().catch(err=>{
        throw err;
    })
     
 }
































// mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true});
// const person_to_create = [

//     person_model(  {name : zoro , age : 21 , fav_food : ["saki","sushi"]},),
  
//     {name : luffy , age :20 , fav_food :["meat"]},
//     {name : sanji , age :23, fav_food : ["pizza","sushi"]},
// ];

// person_model.create(person_to_create,(err,created_person)=>{
//     if(err){
//         throw err;
//     }else{
//         console.log('person created',created_person)
//     }

// mongoose.connection.close();
// });
