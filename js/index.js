//game constants & variables
let inputDir={x:0, y:0};
const foodSound= new Audio('img/food.wav');
const gameOverSound= new Audio('img/gameover.wav');
const moveSound= new Audio('img/move.wav');
const musicSound= new Audio('img/bgmusic.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13, y:15}]        //x-axis: upper horizontal line & y-axis:left vertical line
food={x:6,y:7};   //its not array, its one of the object of snake


//game functions
function main(ctime){   //current time
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime =ctime;
    gameEngine();
}
function isCollide(snake){
    //if you collide with yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you collide to wall
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
            return true;

        }
    }

function gameEngine(){
    //part1: updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x:0, y:0};
        alert("Game over. Press any key to play again!");
        snakeArr=[{x:13, y:15}];
        musicSound.play();
        score=0;
}
//if you have eaten the food , increment the score and regenerate the food
if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
    foodSound.play();
    score +=1;
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "HiScore: " + hiscore;
    }
    scoreBox.innerHTML="score:"+ score;
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
    let a=2 ;
    let b=16 ;
    food = {x: Math.round(a +(b-a)* Math.random()), y: Math.round(a +(b-a)* Math.random())}
}

//moving the snake
for (let i =snakeArr.length -2; i>=0; i--) {
    snakeArr[i+1]={...snakeArr[i]};    
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;
    //part2:display snake and food
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart=e.y;  //e.y:rows are created using y axis
    snakeElement.style.gridColumnStart=e.x; //e.x:columns are created using x axis
    
        if(index === 0){                         // when its index is 0, then head class added as first body element 
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;  //e.y:rows are created using y axis
    foodElement.style.gridColumnStart=food.x; //e.x:columns are created using x axis
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}
//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval)) 
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);      //for game loop
window.addEventListener('keydown',e=>{
    inputDir = {x: 0, y:1} //start the game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0 ;
            inputDir.y= -1;   // y value should be subtracted to go up
            break;

            case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;

            case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y=0 ;
            break;

            case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1 ;
            inputDir.y=0 ;
            break;

    
        default:
            break;
    }
})