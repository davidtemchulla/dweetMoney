var dweetClient = require("node-dweetio");
var dweetio = new dweetClient();
var newTotal = 20;


dweetio.dweet_for("money-tracker", {total: newTotal}, function(err, dweet){

	console.log(dweet.thing); // "money-tracker"
	console.log(dweet.content); //total
	console.log(dweet.created); //when dweet created

})

