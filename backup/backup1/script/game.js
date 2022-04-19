var snake = document.getElementById("snake");
var sizeBox = 100/12; //wie viele Felder gibt es: 12

var snakeBody = [ //Speichert die Koordinaten des jewiligen Körpertils
	[6,6],
	[5,6],
	[4,6],
];

//snakeBody.push([2,2]); // Element in Array hinzufügen

console.log(snakeBody);

window.onkeydown = function(e) { //Wenn eine Taste gedrückt wird
	var x=0;
	var y=0;
	
	switch (e.keyCode) { 

		case 37: //left
			x=-1;
		break; 
		case 38: //up
			y=1; 
		break;  
		case 39: //right
			x=1; 
		break;  
		case 40: //down
			y=-1; 
		break;  
	}
	
	move(x,y);
	
}


function move(x,y){
	
	console.log(snakeBody);
	
	for(var i=snakeBody.length-1;i>=0;i--){
		if(i>0){
		   snakeBody[i]=snakeBody[i-1]
		}
		else{
			snakeBody[i][0] += x;
			snakeBody[i][0] += y;
		}
		
	}
	
}