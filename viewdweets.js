//our variables
var data;
var newTotal = 0;  //starting daily total = 0;
var currentLimit = 25; //change this var to set new limit


//set up our beautiful website
function setup(){
	createCanvas(700,700);
	resetButton = createButton("RESET"); //ability to reset to new day is currently on website?
	resetButton.position(490);
	resetButton.mousePressed(()=>{newTotal = 0}); //right now this resets total, but ONLY IN THE WEBPAGE not on dweet. should we be able to reset via webpage, or should we control it all via IoT device?
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
	background(240,248,255);

	


	//add some angry red words if you've overspent
	if (newTotal>dailyLimit){
		fill(255,0,0);
		textSize(100);
		text("YOU FAILED", 50, 400);
	}

	text(newTotal, 620, 50);
	fill(128,128,128);
	textSize(30);
	text("Total spent today: $",360,50);
}




//POST reset total to 0
//ideally this happens via the device every 24 hours (cron job?)
function resetTotal(){

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'https://dweet.io/dweet/for/money-tracker', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(
				{ "total": 0, "limit": currentLimit}
			))

	requestData();
}



function newLimit(){

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'https://dweet.io/dweet/for/money-tracker', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(
				{ "total": newTotal, "limit": currentLimit}
			))

	requestData();
}


newLimit();


