const express = require("express");

var app = express();

const router = express.Router();

module.exports = router;

var mysql = require('mysql');

var search = mysql.createConnection({
	host     : 'rds-mysql-recipes.chgi9aqtb48j.us-east-2.rds.amazonaws.com',
	port     : '3306',
	user     : 'admin',
	password : 'admin123',
	database : 'cookbook'
});

// recipe id num | ingredient id num | ingredient
// SELECT * FROM RecipeIngredient

app.post('/results',(req, res) => {
    search.connect(function(err) {
    if(err) throw err;
        else {
            search.query("SELECT name FROM Recipe",(err, result) => {
                if(err) {
                    console.log(err); 
                    res.json({"error":true});
                }
                else { 
                    console.log(result); 
                    res.json(result); 
                }
            });
        }
    });
});



/*
search.connect(function(err) {
  if (err) throw err;
  // need to get database names exact for query below - returns all recipe names by cusine type
    search.query("SELECT name  FROM Recipe", function (err, result, fields) {
    if (err) throw err;
      console.log(result);
    
    console.log(fields);
  });
});
*/


/*
app.post('/results', function(req, res){
    //var stuff=req.body.name;
        search.query("SELECT course FROM Tables_in_Recipes", stuff.toString(), function (err, result) {

    //seach.query("INSERT INTO `names` (name) VALUES (?)", username.toString(), function(err, result){
        if(err) throw err;
            console.log("1 record inserted");
        });
    //res.send(stuff);
});
*/


