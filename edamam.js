



const request = require('request');
const options = { };

//const name = 'eye-color';
//const population = 'european';
const app_id = '27200788';
const app_key = 'f5ce0c94cd19f837b8c1eb45ba63456a';
const end = 3;
const q = "chicken";
//const diet;
//const health;
//const calories;
const reportUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&from=0&to=${end}`;
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();


request.get(reportUrl, options, function (error, response, data) { 
    var fin_recipes = [];
    var parsedJSON= JSON.parse(data);

    //looping through each of the recipes returned by the API
    for(var i in parsedJSON.hits){
      var carbs;
      var protein;
      const name = parsedJSON.hits[i].recipe.label;
      const url = parsedJSON.hits[i].recipe.url;
      const servings = parsedJSON.hits[i].recipe.yield;
      const image = parsedJSON.hits[i].recipe.image;
      const calories = parsedJSON.hits[i].recipe.calories;
      const ingredients = parsedJSON.hits[i].recipe.ingredients;
      //account for cases where there are 0 carbs
      if (typeof parsedJSON.hits[i].recipe.totalNutrients.CHOCDF == 'undefined'){
        carbs = 0
      }
      else{
        carbs = parsedJSON.hits[i].recipe.totalNutrients.CHOCDF.quantity;
      }
      //account for cases where there are 0 protein
      if (typeof parsedJSON.hits[i].recipe.totalNutrients.PROCNT == 'undefined'){
        protein = 0
      }
      else{
        protein = parsedJSON.hits[i].recipe.totalNutrients.PROCNT.quantity;
      }
      //Check if protein values match
        //CODE
      //Check if carb values match
        //CODE
      //Check if calories values match
        //CODE

      fin_recipes.push({name: name, url: url, servings: servings, image: image,
        calories: calories, protein: protein, carbs: carbs, ingredients: ingredients });


      
    }

    body.data = fin_recipes;
    body.emit('update');

});

//How you access the FINAL FILTERED RECIPE LIST
body.on('update', function () {
    console.log(body.data) 
});




