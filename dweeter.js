/*
	REST Api informed by https://github.com/buglabs/dweetio-client/
	To run in command line: node dweeter.js
	Created November 2017 by Jenny and David
*/


//stuff that dweet requires, yay
var dweetClient = require("node-dweetio");
var dweetio = new dweetClient();

//our variables, yay
var currentTotal = 3;
var newHits = 1;

//GET current total spent
dweetio.get_latest_dweet_for("money-tracker", function(err, dweet){
	var dweet = dweet[0]; // Dweet is always an array of 1
	currentTotal = dweet.content.total;
	console.log("current total spent = $" + currentTotal);
})



//INSERT code where device button is pressed x times. output should be newHits.



//POST new total spent 
function moneySpent(){
	
	//update current total by adding new hits
	currentTotal += newHits;

	//POST new total 
	dweetio.dweet_for("money-tracker", {total: currentTotal}, function(err, dweet){

		console.log(dweet.thing); // "money-tracker"
		console.log(dweet.content); //total
		console.log(dweet.created); //when dweet created

	})

}

moneySpent();

