//our variables
var data;
var newTotal = 0;  //starting daily total = 0;
var dailyLimit = 25;


//set up our beautiful website
function setup(){
	createCanvas(700,200);
	// resetButton = createButton("RESET"); //ability to reset to new day is currently on website; ideally would run every 24h from IoT device via cron job
	// resetButton.mousePressed(resetTotal); 
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





//POST reset total to 0
//ideally this happens via the device every 24 hours (cron job?)
function resetTotal(){
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'https://dweet.io/dweet/for/money-tracker', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(
				{ "total": 0}
			))

	requestData();
}


