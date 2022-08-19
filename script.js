const scoreEle=document.getElementById("score");
const timeLeftEle = document.getElementById("time");
const start=document.getElementById("start");
const pause=document.getElementById("pause");
const squares = document.querySelectorAll(".square");
const gameMusic = new Audio("assests/gMusic.mp3");
const hitMusic = new Audio("assests/hMusic.mp3");

let flag=null;
let score=0;
let timeLeft=60;
let position=null;
let timerId=null;
let randomMoleId=null; 

function randomMole(){
    squares.forEach(square => {
        square.classList.remove("mole");
    })
    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add("mole");
    position=randomSquare.id;
}

squares.forEach(square=>{
    square.addEventListener("mousedown",()=>{
        if(timerId !=null){
            if(square.id===position){
                hitMusic.play();
                setTimeout(() => {hitMusic.pause()}, 1000);
                score++;
                console.log(score);
                scoreEle.innerHTML=`Your Score : ${score}`;
                position=null;
            }
        }
    })
})

function countDown(){
    timeLeft -- ;
    timeLeftEle.innerHTML=`Time Left : ${timeLeft}`;
    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId=null;
        randomMoleId=null;
        gameMusic.pause();
        pause.classList.remove("visible");
        pause.classList.add("hide");
    }
}

function startGame(){
    if(timerId!=null)
    {
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId=null;
        randomMoleId=null;
        gameMusic.play();
    }
    gameMusic.play();
    pause.classList.remove("hide");
    pause.classList.add("visiblle");
        score=0;
        timeLeft=60;
        scoreEle.innerHTML=`Your Score : ${score}`;
        timeLeftEle.innerHTML=`Time Left : ${timeLeft}`;
        randomMoleId = setInterval(randomMole,1000);
        timerId = setInterval(countDown,1000);  
}

function pauseGame(){
    if(timerId !=null){
        if(pause.textContent=='PAUSE'){
            clearTimeout(timerId);
            clearInterval(randomMoleId);
            timerId=null;
            randomMoleId=null;
            pause.textContent='RESUME';
            gameMusic.pause();
        }
        else{
            randomMoleId = setInterval(randomMole,1000);
            timerId = setInterval(countDown,1000);
            pause.textContent='PAUSE';
            gameMusic.play();
        }
    }
}


start.addEventListener("click",startGame);

pause.addEventListener('click',pauseGame);