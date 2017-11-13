/*
	REST Api informed by https://github.com/buglabs/dweetio-client/
	To run in command line: node dweeter.js
	Created November 2017 by Jenny and David
*/


//stuff that dweet requires, yay
var dweetClient = require("node-dweetio");
var dweetio = new dweetClient();

//our variables, yay
var currentTotal;
var newHits = 3;

// 

//GET current total spent

// function getTotal(){
// 	dweetio.get_latest_dweet_for("money-tracker", function(err, dweet){
// 		var dweet = dweet[0]; // Dweet is always an array of 1
// 		currentTotal = dweet.content.total;
// 		console.log(dweet);
// 		console.log("current total spent = $" + currentTotal);
// 	})
// }
moneySpent();
console.log("total after money spent: ", currentTotal);


dweetio.get_latest_dweet_for("money-tracker", function(err, dweet){
	var dweet = dweet[0]; // Dweet is always an array of 1
	currentTotal = dweet.content.total;
	console.log("current total spent = $" + currentTotal);
})



//INSERT code where device button is pressed x times. output should be newHits.



//POST new total spent 
function moneySpent(){

	if (currentTotal==null){currentTotal=0};
	
	//update current total by adding new hits
	currentTotal = currentTotal + newHits;

	//POST new total 
	dweetio.dweet_for("money-tracker", {total: currentTotal}, function(err, dweet){

		console.log(dweet.thing); // "money-tracker"
		console.log(dweet.content); //total
		console.log(dweet.created); //when dweet created

	})

}

// getTotal(); 
// console.log("total before money spent: ", currentTotal);



