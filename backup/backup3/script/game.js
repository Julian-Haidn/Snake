var snake = document.getElementById("snake");
var apple = document.getElementById("apple");
var root = document.documentElement;

var repeatMove; // darin wird die Loop fürs bewegen gespeichert
var fieldSize = 12;
var sizeBox = 100/fieldSize; //wie viele Felder gibt es: 12
var conPlay = true; //flase bei wenn der Spieler verloren hat
var posApple = [6,6];
var direction = [1,0,0]; //Koordinaten + Grad

var speed = 200; // gewschindigkeit der Snake
root.style.setProperty('--snakeSpeed', speed/1000 + "s");
root.style.setProperty('--fieldSize', fieldSize);

var snakeBody = [ //Speichert die Koordinaten des jewiligen Körpertils [x,y,Grad]
	[5,5,0],
	[4,5,0],
	[3,5,0],
	[2,5,0],
];

window.onload = function(){
	spawnApple();
	repeatMove = window.setInterval(function(){
		move(direction[0], direction[1], direction[2]);
	}, speed);
}

window.onkeydown = function(e) { //Wenn eine Taste gedrückt wird
	switch (e.keyCode) { 
		case 37: //left
			if(direction[0]==0){
				
				if(direction[1] == 1){
					direction[2]+=90;
				}
				else{
					direction[2]-=90;
				}
				
				direction[0]=-1;
				direction[1]=0;
			}
		break; 
		case 38: //up
			if(direction[1]==0){
				
				if(direction[0] == -1){
					direction[2]+=90;
				}
				else{
					direction[2]-=90;
				}
					
				direction[0]=0;
				direction[1]=-1;	
			}
		break;  
		case 39: //right
			if(direction[0]==0){
				
				if(direction[1] == -1){
					direction[2]+=90;
				}
				else{
					direction[2]-=90;
				}
				
				direction[0]=1;
				direction[1]=0;
			}
		break;  
		case 40: //down
			if(direction[1]==0){
				
				if(direction[0] == 1){
					direction[2]+=90;
				}
				else{
					direction[2]-=90;
				}
				
				direction[0]=0;
				direction[1]=1;
			}
		break;  
	}
}

function move(x,y,rotate){ // ---- MOVE ----
	
	// --- Body Array neu definieren ---
	for(var i=snakeBody.length-1;i>=0;i--){
		
		if(i>0){
		   snakeBody[i][0]=snakeBody[i-1][0];
		   snakeBody[i][1]=snakeBody[i-1][1];
		   snakeBody[i][2]=snakeBody[i-1][2];
		}
		else{
			snakeBody[0][0] += x;
			snakeBody[0][1] += y;
			snakeBody[0][2] = rotate;
		}
	}
	
	checkAppleCollect();
	
	if(!checkCrash()){
		// --- Snake bewegen ---
		for(var j=0;j<snake.getElementsByTagName("img").length;j++){ //snake.getElementsByTagName("img") liefert die einezlenen Bilder der Snake
			snake.getElementsByTagName("img")[j].style.left = snakeBody[j][0]*sizeBox + "%";
			snake.getElementsByTagName("img")[j].style.top = snakeBody[j][1]*sizeBox + "%";
			snake.getElementsByTagName("img")[j].style.transform = "rotate(" + snakeBody[j][2] + "deg)";
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
	   snakeBody[0][0]>=fieldSize||
	   snakeBody[0][1]>=fieldSize){
		crash = true;
	}
	
	return crash;
}

function checkAppleCollect(){ //Wenn ein Ampfel eingefangen wurde
	if(posApple[0] == snakeBody[0][0] && posApple[1] == snakeBody[0][1]){
		rotate = snakeBody[snakeBody.length-1][2];
		
		 // Element in Array hinzufügen
		
		snakeBody.push([
			snakeBody[snakeBody.length-1][0],
			snakeBody[snakeBody.length-1][1],
			snakeBody[snakeBody.length-1][2],
		]);
		
		
		//Spawn Image
		snake.getElementsByTagName("img")[snake.getElementsByTagName("img").length -1].src="img/game/snake_mid.svg";
		var img = new Image();
		img.src="img/game/snake_end.svg";
		img.style.transform = "rotate(" + rotate + "deg)";
		snake.appendChild(img);
		
		spawnApple();
	}
}

function spawnApple(){
	var x;
	var y;
	var samePlace = true;
	
	while(samePlace){ //Generiert einen Ort für den Apfel
		x = Math.floor(Math.random() * fieldSize);
		y = Math.floor(Math.random() * fieldSize);
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

function gameOver(){
	window.clearInterval(repeatMove);
	conPlay = false;
	window.alert("Game Over");
}