var data;
var newTotal = 10;

function setup(){
	createCanvas(700,300);
	requestData();
}

function requestData(){
	loadJSON("https://dweet.io/get/dweets/for/money-tracker", gotData);
}

function gotData(data){
	newTotal = data.with[0].content.total;
	console.log(newTotal);
}

function draw(){
	background(255,255,255);
	textSize(50);
	text("Total spent today: $", 50,100);
	text(newTotal, 500, 100);
}
