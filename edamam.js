
// prot_gen = 3 and BMI_gen = 4 M
// prot_gen = 2 and BMI_gen = 4 M 
// prot_gen = 2 and BMI_gen = 2 M 

// prot_gen = 2 and BMI_gen = 2 F
// prot_gen = 0 and carb_gen = 4 and BMI_gen = 2 F
// prot_gen = 3 and carb_gen = 3 and BMI_gen = 1 F




const prot_gen = 3;
const carb_gen = 3;
const egg_gen = 2; // cant use
const pea_gen = 2;
const milk_gen = 4; // cant use
const weight_gen = 4;
const BMI_gen = 1;
const gender = 'F';


const app_id = 'c24b40fa';
const app_key = '2be75735b4a7a6d8dd5bdf9453675c06';
const end = 100;
const q = "";
const cal_less = 1200;


var reportUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&from=0&to=${end}&calories=${cal_less}`;
if (prot_gen < 2){
  reportUrl += '&diet=high-protein';
}
else if (carb_gen >= 4){
  reportUrl += '&diet=low-carb';
}
else if (BMI_gen >= 3) {
  reportUrl += '&diet=low-fat';
}
else {
  reportUrl += '&diet=balanced';
}

console.log(reportUrl);


const request = require('request');
const options = { };

//const name = 'eye-color';
//const population = 'european';

//const diet;
//const health;
//const calories;

var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();


request.get(reportUrl, options, function (error, response, data) { 

    console.log("HELLO");

    var arr = {"M": {"protein": [[40,200] , [27,40], [15,27] , [8,16], [0,10]],
      "carb" : [[80,400] , [60,90] , [40,70], [15,40], [0,15]]},
      "F": {"protein": [[30,200] , [20,29], [14,23], [8,14], [0,8]],
      "carb": [[80,400] , [60,80] , [40,60] , [18,30] , [0,20]]}}


    var fin_recipes = [];
    var parsedJSON= JSON.parse(data);

    //looping through each of the recipes returned by the API
    for(var i in parsedJSON.hits){
      var carbs;
      var protein;
      var fat;
      const name = parsedJSON.hits[i].recipe.label;
      const url = parsedJSON.hits[i].recipe.url;
      const servings = parsedJSON.hits[i].recipe.yield;
      const image = parsedJSON.hits[i].recipe.image;
      const calories = parsedJSON.hits[i].recipe.calories/servings;
      const ingredients = parsedJSON.hits[i].recipe.ingredients;
      const shareAs = parsedJSON.hits[i].recipe.shareAs;
      //account for cases where there are 0 carbs

      if (typeof parsedJSON.hits[i].recipe.totalNutrients.CHOCDF == 'undefined'){
        carbs = 0
      }
      else{
        carbs = parsedJSON.hits[i].recipe.totalNutrients.CHOCDF.quantity/servings;
      }
      //console.log("carbs: " + carbs);
      //account for cases where there are 0 protein
      if (typeof parsedJSON.hits[i].recipe.totalNutrients.PROCNT == 'undefined'){
        protein = 0
      }
      else{
        protein = parsedJSON.hits[i].recipe.totalNutrients.PROCNT.quantity/servings;
      }
      //console.log("protein: " + protein);
      if (typeof parsedJSON.hits[i].recipe.totalNutrients.FAT == 'undefined'){
        fat = 0
      }
      else{
        fat = parsedJSON.hits[i].recipe.totalNutrients.FAT.quantity/servings;
      }
      console.log("carb: " + carbs);
      console.log("LOWER BOUND:" + arr[gender]['carb'][carb_gen][0]);
      console.log("UPPER BOUND:" + arr[gender]['carb'][carb_gen][1]);
      console.log("protein: " + protein);
      console.log("LOWER BOUND:" + arr[gender]['protein'][prot_gen][0]);
      console.log("UPPER BOUND:" + arr[gender]['protein'][prot_gen][1]);
      if ( protein < arr[gender]['protein'][prot_gen][0] || protein > arr[gender]['protein'][prot_gen][1] )
      {

        console.log("protein: FAILED");
        // console.log("LOWER BOUND:" arr[gender]['protein'][prot_gen][0]);
        // console.log("UPPER BOUND:" arr[gender]['protein'][prot_gen][1]);
        if (BMI_gen < 3)
        {
          continue;
        }
      } 
      //Check if carb values match
      if ( carbs <= arr[gender]['carb'][carb_gen][0]  || carbs > arr[gender]['carb'][carb_gen][1] )
      {
        console.log("carbs: FAILED");
        continue;
      } 
      //Check if calories values match
        //CODE
      console.log("SUCCESS!!*************************");
      fin_recipes.push({name: name, url: url, shareAs: shareAs, servings: servings, image: image,
        calories: calories, protein: protein, carbs: carbs, fat: fat, ingredients: ingredients })
    }

    body.data = fin_recipes;
    body.emit('update');

});

//How you access the FINAL FILTERED RECIPE LIST
body.on('update', function () {
    //console.log(body.data) 
});




