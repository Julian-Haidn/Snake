//snakeBody.push([2,2]); // Element in Array hinzufügen
var snake = document.getElementById("snake");
var apple = document.getElementById("apple");

var sizeBox = 100/12; //wie viele Felder gibt es: 12
var conPlay = true; //flase bei wenn der Spieler verloren hat
var posApple = [6,6];

var snakeBody = [ //Speichert die Koordinaten des jewiligen Körpertils [x,y,Grad]
	[5,5],
	[4,5],
	[3,5],
	[2,5],
];

console.log();

spawnApple();
function spawnApple(){
	var x;
	var y;
	var samePlace = true;
	
	while(samePlace){ //Generiert einen Ort für den Apfel
		x = Math.floor(Math.random() * 12);
		y = Math.floor(Math.random() * 12);
		samePlace = false;
		
		for(var h=0;h<snakeBody.length;h++){
			if(snakeBody[h][0]==x &&
			  snakeBody[h][1]==y){
			   samePlace=true;
			}
		}
	}
	
	
	posApple[0] = x;
	posApple[1] = y;
	apple.style.left = posApple[0]*sizeBox + "%";
	apple.style.top = posApple[1]*sizeBox + "%";
}

window.onkeydown = function(e) { //Wenn eine Taste gedrückt wird
	if(conPlay){
		switch (e.keyCode) { 

			case 37: //left
				x=-1;
				move(-1,0);
			break; 
			case 38: //up
				y=1;
				move(0,-1);
			break;  
			case 39: //right
				x=1;
				move(1,0);
			break;  
			case 40: //down
				y=-1;
				move(0,1);
			break;  
		}
	}
	
}

function move(x,y){ // ---- MOVE ----
	
	// --- Body Array neu definieren ---
	for(var i=snakeBody.length-1;i>=0;i--){
		
		if(i>0){
		   snakeBody[i][0]=snakeBody[i-1][0];
		   snakeBody[i][1]=snakeBody[i-1][1];
		}
		else{
			snakeBody[0][0] += x;
			snakeBody[0][1] += y;
		}
	}
		
	if(!checkCrash()){
		// --- Snake bewegen ---
		i=0;
		for(var j=1;j<snake.childNodes.length;j+=2){ //snake.childNodes liefert die einezlenen Bilder der Snake

			snake.childNodes[j].style.left = snakeBody[i][0]*sizeBox + "%";
			snake.childNodes[j].style.top = snakeBody[i][1]*sizeBox + "%";
			i++;
		}
	}
	else{
		gameOver();
	}
}

function checkCrash(){
	var crash = false;
	//überprüft ob in sich selbst gefahren wurde
	for(var k=1;k<snakeBody.length;k++){
		if(snakeBody[0][0]==snakeBody[k][0] &&
		  snakeBody[0][1]==snakeBody[k][1]){
		   crash=true;
		}
	}
	//Überprüft ob außerhalb des Feldes
	if(snakeBody[0][0]<0|| 
	  snakeBody[0][1]<0||
	   snakeBody[0][0]>=12||
	   snakeBody[0][1]>=12){
		crash = true;
	}
	
	return crash;
}

function gameOver(){
	conPlay = false;
	window.alert("Game Over");
}