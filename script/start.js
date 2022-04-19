var startScreen = document.getElementsByClassName("startScreen")[0];
var header = document.getElementsByClassName("header")[0];

var chooseLeft = document.getElementById("chooseLeft");
var chooseRight = document.getElementById("chooseRight");
var preShowSnake = document.getElementById("preShowSnake");
var continueText = document.getElementById("continueText");

var currentSnake = 0;
var snakeArr = [ //snake, head, mid, end
	[
		"img/game/snake1/snake.svg",
		"img/game/snake1/snake_head.svg",
		"img/game/snake1/snake_mid.svg",
		"img/game/snake1/snake_end.svg",
	],
	[
		"img/game/snake2/snake.svg",
		"img/game/snake2/snake_head.svg",
		"img/game/snake2/snake_mid.svg",
		"img/game/snake2/snake_end.svg",
	],
	
];

function changeSnake(change){
	
	currentSnake+=change;
	if(currentSnake<0){
		currentSnake = snakeArr.length-1;
	}
	else if(currentSnake >= snakeArr.length){
		currentSnake = 0;
	}
	
	preShowSnake.src = snakeArr[currentSnake][0];
}

chooseLeft.onclick = function(){
	changeSnake(-1);
}

chooseRight.onclick = function(){
	changeSnake(1);
}
continueText.onclick = function(){
	removeStart();
}


function removeStart(){
	startScreen.style.top = "-100%";
	header.style.height = "20%";
	spawnApple();
	
	snake.getElementsByTagName("img")[0].src = snakeArr[currentSnake][1];
	snake.getElementsByTagName("img")[1].src = snakeArr[currentSnake][2];
	snake.getElementsByTagName("img")[2].src = snakeArr[currentSnake][2];
	snake.getElementsByTagName("img")[3].src = snakeArr[currentSnake][3];
	
	snake.style.display = "block";

	setTimeout(() => {
		PlayGame();
	}, 1000);

}