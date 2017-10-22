
const app_id = '27200788';
const app_key = 'f5ce0c94cd19f837b8c1eb45ba63456a';
const end = 3;
const q = "chicken";
const diet = ["balanced", "high-protein", "high-fiber", "low-fat", "low-carb", "low-sodium"];
const health = ["peanut-free", "dairy-free", "egg-free", "low-sugar"];
//const calories;
const reportUrl = `https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}&from=0&to=${end}`;
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();


require('fs').readFile('Genome.json', 'utf8', function (err, data) {
    if (err)throw err;
       
    var obj = JSON.parse(data);
	console.log(obj);
});
