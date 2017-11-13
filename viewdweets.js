//our variables
var data;
var newTotal = 0;  //starting daily total = 0;
var dailyLimit = 25;

//set up our beautiful website
function setup(){
	createCanvas(700,200);
	resetButton = createButton("RESET"); //ability to reset to new day is currently on website; ideally would run every 24h from IoT device via cron job
	resetButton.mousePressed(resetTotal); 
	requestData();
}

//get current total from dweet
function requestData(){
	loadJSON("https://dweet.io/get/dweets/for/money-tracker", gotData);
}

//sometimes dweet has a weird empty entry; if so, get the next one
function gotData(data){

	if (data.with[0].content.total) newTotal = data.with[0].content.total;
	else newTotal = data.with[1].content.total;

	console.log(newTotal);
}

//display the current totalal
function draw(){
	background(255,255,255);

	//add some angry red words if you've overspent
	if (newTotal>dailyLimit){
		fill(255,0,0);
		textSize(100);
		text("YOU FAILED", 50, 400);
	}

	text(newTotal, 500, 100);
	fill(0,0,0);
	textSize(50);
	text("Total spent today: $", 50,100);

}







//POST new total spent 
function resetTotal(){
	
	//update current total by adding new hits
	currentTotal = 0;

	//POST new total 
	dweetio.dweet_for("money-tracker", {total: currentTotal}, function(err, dweet){

		console.log(dweet.thing); // "money-tracker"
		console.log(dweet.content); //total
		console.log(dweet.created); //when dweet created

	})

}
