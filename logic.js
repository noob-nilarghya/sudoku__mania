function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
function enableScroll() {
    window.onscroll = function() {};
}

setTimeout(function(){
    window.scrollTo(0,0);
    history.scrollRestoration = "manual";
    document.querySelector('html').style.scrollBehavior = '';
    window.onbeforeunload = function () {
        window.scrollTo(0,0);
    };
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.body.scrollTop = 0; // For Safari
    disableScroll();
}, 100);


document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
document.body.scrollTop = 0; // For Safari

const Input= document.getElementById("myInput");
const start= document.querySelector(".start");
const check= document.querySelector(".check");
const reveal1= document.querySelector(".reveal1");
const reveal2= document.querySelector(".reveal2");
const playAgain= document.querySelector(".reset");
const success= document.querySelector(".success");
const fail= document.querySelector(".fail");
const sol= document.querySelector("#solution");
const msg= document.querySelector("#message");
const WA= document.querySelector(".wAttempt");
const time= document.querySelector(".time");
const timeMSG= document.querySelector(".timeMSG");
const audioBtn= document.querySelector(".audioLogo");
var hasBegin= false;
var wAns;

var music = {
    overworld: new Howl({
        src: [
            'Music/bg.mp3',
        ],
        loop: true,
    })
}

window.onload = () => {
    history.scrollRestoration = "manual";
    document.querySelector('html').style.scrollBehavior = '';
    window.onbeforeunload = function () {
        window.scrollTo(0,0);
    };
    
    for(let i=0; i<81; i++){
        document.querySelector("#item"+i).textContent="";
    }
    
    success.classList.add("isHidden");
    fail.classList.add("isHidden");
    timeMSG.classList.add("isHidden");
    playAgain.classList.add("isHidden");
    reveal2.classList.add("isHidden");
    sol.classList.add("isHidden");
};
var inputVal=30;
function myFunction() {
    var x = document.getElementById("myInput").value;
    let temp=parseInt(x,10);
    if(temp>=1 && temp<=80){
        inputVal=temp;
    }

}
var timer=0;
var myInterval;

start.addEventListener("click", function(){
    
    if(hasBegin === false){
        hasBegin= true;
        wAns=0;
        enableScroll();
        document.querySelector("#GameCanvas").scrollIntoView();
        if(!music.overworld.playing()){
            document.querySelector("#GameCanvas").scrollIntoView();
            music.overworld.play();
            audioBtn.classList.add("audioON");
        }
        sudokuGenerator(inputVal);
        let cnt=0;
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                if(board[i][j]==0){
                    document.querySelector("#item"+cnt).textContent="";
                    document.querySelector("#item"+cnt).classList.add("unfilled");
                    document.querySelector("#SOLitem"+cnt).classList.add("unfilled");
                }
                else{
                    let nm= board[i][j]; let str= nm.toString(10)
                    document.querySelector("#item"+cnt).textContent=str;
                    document.querySelector("#SOLitem"+cnt).textContent=str;
                }
                cnt++;
            }
        }
        
        var checkCliked=false;
        var reveal1Clicked=false;
        

        if(hasBegin===true){
            myInterval= setInterval(function(){
                if(reveal1Clicked==false && checkCliked==false){
                    timer++;
                    time.textContent="Time Elapsed: "+timer+" sec";
                }
            },1000);
        }
    }
});

audioBtn.addEventListener("click", function(){
    
    if(audioBtn.classList.contains("audioON")){
        
        if(music.overworld.playing()){
            audioBtn.src="Image/audio_OFF.png";
            audioBtn.classList.remove("audioON");
            audioBtn.classList.add("audioOFF");
            music.overworld.pause();
        }
    }
    else if(audioBtn.classList.contains("audioOFF")){
        
        if(!music.overworld.playing()){
            audioBtn.src="Image/audio_ON.png";
            audioBtn.classList.remove("audioOFF");
            audioBtn.classList.add("audioON");
            music.overworld.play();
        }
    }
});


playAgain.addEventListener("click", function(){
    history.scrollRestoration = "manual";
    document.querySelector('html').style.scrollBehavior = '';
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    location.reload();
});


check.addEventListener("click", function(){
    checkCliked=true;
    clearInterval(myInterval);
    let ans= checkUserSolution();
    timeMSG.textContent="Your time: "+timer+" seconds.";
    if(ans===true){
        success.classList.remove("isHidden");
        success.classList.add("animate__animated");
        success.classList.add("animate__heartBeat");
        success.classList.add("animate__slow");
        reveal2.classList.remove("isHidden");
        playAgain.classList.remove("isHidden");

    }
    else{
        fail.classList.remove("isHidden");
        fail.classList.add("animate__animated");
        fail.classList.add("animate__heartBeat");
        fail.classList.add("animate__slow");
        reveal2.classList.remove("isHidden");
        playAgain.classList.remove("isHidden");
    }
    timeMSG.classList.remove("isHidden");
    timeMSG.classList.add("animate__animated");
    timeMSG.classList.add("animate__heartBeat");
    timeMSG.classList.add("animate__delay-2s");
});

let nil;

for(let i=0; i<81; i++){
    let Itm= document.querySelector("#item"+i);
    Itm.addEventListener("click", function(){
        nil=i;
        for(let k=0; k<81; k++){
            if(document.querySelector("#item"+k).classList.contains("selectAnime")===true){
                document.querySelector("#item"+k).classList.remove("selectAnime");
            }
        }
        
        let itm=i+1;
        let r; let c;
        if(itm%9 === 0){
            r= ( Math.floor(itm/9) )-1;
            c=8;
        }
        else if( itm%9 !=0){
            r= Math.floor(itm/9);
            c= (itm%9) -1;
        }

        if(wePutted[r][c]===0){
            Itm.classList.add("selectAnime");
        }
        
        /*
        let count=0;
        document.addEventListener("keypress", function(evt){
            if(wePutted[r][c]=== 0 && isNaN(evt.key)==false && (parseInt(evt.key, 10)>=1 && parseInt(evt.key, 10)<=9) && count<1 ){
                Itm.classList.remove("selectAnime");
                let NUM=parseInt(evt.key, 10);
                count++;
                for(let arb=0; arb<81; arb++){
                    if(arb===i){
                        console.log("keyPress",arb,i,nil);
                        document.querySelector("#item"+i).textContent=evt.key;
                        board[r][c]=NUM;
                        if(isPermittedCheck(NUM, r, c)==true){
                            document.querySelector("#item"+i).classList.remove("txtRed");
                            document.querySelector("#item"+i).classList.add("txtGreen");
                        }
                        else{
                            document.querySelector("#item"+i).classList.remove("txtGreen");
                            document.querySelector("#item"+i).classList.add("txtRed");
                        }
                    }
                }
            }
        }); 
        */
        
        let countI=0;
        for(let z=1; z<=9; z++){
            document.querySelector("#num"+z).addEventListener("click", function(){
                if(wePutted[r][c]===0){
                    if(countI<1){
                        Itm.classList.remove("selectAnime");
                        let NuMI=z;
                        countI++;
                        
                        for(let arb=0; arb<81; arb++){
                            if(arb===i){
                                console.log("click",arb,i,nil);
                                document.querySelector("#item"+i).textContent=NuMI.toString(10);
                                board[r][c]=NuMI;
                                if(isPermittedCheck(NuMI, r, c)==true){
                                    document.querySelector("#item"+i).classList.remove("txtRed");
                                    document.querySelector("#item"+i).classList.add("txtGreen");
                                }
                                else{
                                    document.querySelector("#item"+i).classList.remove("txtGreen");
                                    document.querySelector("#item"+i).classList.add("txtRed");
                                    wAns++;
                                    WA.textContent="Wrong Attempts: "+wAns;
                                }
                            }
                        }
                    }
                }
            });
        }
    });
}


reveal1.addEventListener("click", function(){
    reveal1Clicked=true;
    clearInterval(myInterval);
    SolveSudoku();
    for(let i=0; i<81; i++){
        let itm=i+1;
        let r; let c;
        if(itm%9 === 0){
            r= ( Math.floor(itm/9) )-1;
            c=8;
        }
        else if( itm%9 !=0){
            r= Math.floor(itm/9);
            c= (itm%9) -1;
        }
        let n= solution[r][c];
        if(board[r][c]!=solution[r][c]){
            document.querySelector("#SOLitem"+i).classList.add("selectStatic");
        }
        document.querySelector("#SOLitem"+i).textContent=n.toString(10);
    }
    sol.classList.remove("isHidden");
    sol.classList.add("animate__animated");
    sol.classList.add("animate__heartBeat");
    sol.classList.add("animate__slow");
    reveal2.classList.remove("isHidden");
    playAgain.classList.remove("isHidden");

});

reveal2.addEventListener("click", function(){
    SolveSudoku();
    for(let i=0; i<81; i++){
        let itm=i+1;
        let r; let c;
        if(itm%9 === 0){
            r= ( Math.floor(itm/9) )-1;
            c=8;
        }
        else if( itm%9 !=0){
            r= Math.floor(itm/9);
            c= (itm%9) -1;
        }
        let n= solution[r][c];
        if(board[r][c]!=solution[r][c]){
            document.querySelector("#SOLitem"+i).classList.add("selectStatic");
        }
        document.querySelector("#SOLitem"+i).textContent=n.toString(10);
    }
    sol.classList.remove("isHidden");
    sol.classList.add("animate__animated");
    sol.classList.add("animate__heartBeat");
    sol.classList.add("animate__slow");
    reveal2.classList.remove("isHidden");
    playAgain.classList.remove("isHidden");
    
});


var board= new Array(9);
var solution= new Array(9);
var wePutted= new Array(9)

for(let i=0; i<board.length; i++){
    board[i]= new Array(9);
    solution[i]= new Array(9);
    wePutted[i]= new Array(9);
}

function randomNumGen(){
    let num= Math.random();
    num*=9;
    num+=1;
    num= Math.floor(num);
    return num;
}

function isPermitted(num, row, col){
    // checking the same row
    for(let j=0; j<9; j++){
        if(board[row][j]===num){
            return false;
        }
    }

    // checking the same col
    for(let i=0; i<9; i++){
        if(board[i][col]===num){
            return false;
        }
    }

    // checking BOXES row[0-2], All col
    if(row>=0 && row<=2 && col>=0 && col<=2){
        for(let i=0; i<=2; i++){
            for(let j=0; j<=2; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=0 && row<=2 && col>=3 && col<=5){
        for(let i=0; i<=2; i++){
            for(let j=3; j<=5; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=0 && row<=2 && col>=6 && col<=8){
        for(let i=0; i<=2; i++){
            for(let j=6; j<=8; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    
    // checking BOXES row[3-5], All col
    if(row>=3 && row<=5 && col>=0 && col<=2){
        for(let i=3; i<=5; i++){
            for(let j=0; j<=2; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=3 && row<=5 && col>=3 && col<=5){
        for(let i=3; i<=5; i++){
            for(let j=3; j<=5; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=3 && row<=5 && col>=6 && col<=8){
        for(let i=3; i<=5; i++){
            for(let j=6; j<=8; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    
    // checking BOXES row[6-8], All col
    if(row>=6 && row<=8 && col>=0 && col<=2){
        for(let i=6; i<=8; i++){
            for(let j=0; j<=2; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=6 && row<=8 && col>=3 && col<=5){
        for(let i=6; i<=8; i++){
            for(let j=3; j<=5; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=6 && row<=8 && col>=6 && col<=8){
        for(let i=6; i<=8; i++){
            for(let j=6; j<=8; j++){
                if(board[i][j]===num){
                    return false;
                }
            }
        }
    }

    return true;
}

function resetBoard(){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            board[i][j]=0;
            wePutted[i][j]=0;
            
        }
    }
}

function printBoard(){
    // TODO
}

function createFullSudoku(){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){

            if(board[i][j]===0){ // empty grid
                let count=0;
                let m = new Map();

                while(count<9){ // Try with diff rand num in [1,9] until purpose solves
                    let num= randomNumGen();
                    
                    if(m.has(num)===false){
                        m.set(num, 1);
                        count++;

                        if(isPermitted(num, i, j)===true){ 
                            board[i][j]=num;
                            solution[i][j]=num;
        
                            if(createFullSudoku()===true){
                                return true;
                            }
                            else{  // reached this line means 'num' is not a successful choice to fill current grid. So, make this grid empty & try with other num
                                board[i][j]=0;  
                                solution[i][j]=0;
                            }
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function removeGrid(numOfGridRemove){
    let count=0;
    let m = new Map();

    while(count < numOfGridRemove){
        let row= randomNumGen(); let col= randomNumGen();
        let numbr= (row*10)+col;
        let s = numbr.toString(10);
        if(m.has(s) === false){
            board[row-1][col-1]=0;
            wePutted[row-1][col-1]=0;
            m.set(s,1);
            count++;
        }
    }
}

function sudokuGenerator(numOfGridToRemove){

    resetBoard();
    let ans= createFullSudoku();
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            wePutted[i][j]=1;
        }
    }
    removeGrid(numOfGridToRemove);
}

function isPermittedCheck(num, row, col){
    if(board[row][col]===0){
        return false;
    }

    // checking the same row
    for(let j=0; j<9; j++){
        if(j!=col && board[row][j]===num){
            return false;
        }
    }

    // checking the same col
    for(let i=0; i<9; i++){
        if(i!=row && board[i][col]===num){
            return false;
        }
    }

    // checking BOXES row[0-2], All col
    if(row>=0 && row<=2 && col>=0 && col<=2){
        for(let i=0; i<=2; i++){
            for(let j=0; j<=2; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=0 && row<=2 && col>=3 && col<=5){
        for(let i=0; i<=2; i++){
            for(let j=3; j<=5; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=0 && row<=2 && col>=6 && col<=8){
        for(let i=0; i<=2; i++){
            for(let j=6; j<=8; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    
    // checking BOXES row[3-5], All col
    if(row>=3 && row<=5 && col>=0 && col<=2){
        for(let i=3; i<=5; i++){
            for(let j=0; j<=2; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=3 && row<=5 && col>=3 && col<=5){
        for(let i=3; i<=5; i++){
            for(let j=3; j<=5; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=3 && row<=5 && col>=6 && col<=8){
        for(let i=3; i<=5; i++){
            for(let j=6; j<=8; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    
    // checking BOXES row[6-8], All col
    if(row>=6 && row<=8 && col>=0 && col<=2){
        for(let i=6; i<=8; i++){
            for(let j=0; j<=2; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=6 && row<=8 && col>=3 && col<=5){
        for(let i=6; i<=8; i++){
            for(let j=3; j<=5; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }
    else if(row>=6 && row<=8 && col>=6 && col<=8){
        for(let i=6; i<=8; i++){
            for(let j=6; j<=8; j++){
                if( (i!=row && j!=col) && board[i][j]===num){
                    return false;
                }
            }
        }
    }

    return true;
}

function checkUserSolution(){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            let num=board[i][j];
            if(isPermittedCheck(num, i, j)===false){
                return false;
            }
        }
    }
    return true;
}

function SolveSudoku(){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){

            if(solution[i][j]===0){  //empty board
                // Try to fill the board with one of the number in [1,9]

                for(let num=1; num<=9; num++){

                    if(isPermitted(num, i, j)===true){
                        solution[i][j]=num;
                        // call solveSudoku to solve next unfilled grid
                        if(SolveSudoku()===true){ // solveSudoku is able to slve furthur unfilled grid successfully
                            return true;
                        }
                        else{
                            solution[i][j]= 0; // backtrack, Try with some other num
                        }
                    }
                }
                // If none of the num in [1,9] is able to solve sudoku, it means sudoku is unsolvable
                return false;
            }
        }
    }
    
    // Reached here, that means, it has filled all the unfilled grid, & sudoku is complete
    return true;
}

// user will solve sudoku from board.
// User's answer will be check from board itself
// But reveal solution will be displayed in solution array
