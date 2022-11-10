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

const start= document.querySelector(".start"); // start btn
const check= document.querySelector(".check"); // check btn
const reveal1= document.querySelector(".reveal1"); // upper reveal btn
const reveal2= document.querySelector(".reveal2"); // lower reveal btn
const playAgain= document.querySelector(".playAgain1"); // mid playAgain btn
const playAgain0= document.querySelector(".PlayAgain0"); // ⟳ btn
const playAgain3= document.querySelector(".PlayAgain3"); // last playAgain btn
const success= document.querySelector(".success"); // success msg
const fail= document.querySelector(".fail"); // failure msg
const sol= document.querySelector("#solution"); // soln container
const msg= document.querySelector("#message"); // verdict msg
const time= document.querySelector(".time"); // timer
const timeMSG= document.querySelector(".timeMSG"); // timer verdict
const audioBtn= document.querySelector(".audioLogo"); // audio btn
const clrBtn= document.querySelector(".clrBtn"); // clr btn
const BODY= document.querySelector(".BODY"); 
const navBar= document.querySelector(".navigationBar");
const numMobile= document.querySelector(".numMobile"); // 1-9
const darkMode= document.querySelector("#dark-mode"); // dark mode toggle btn
const darkModePara= document.querySelector(".dark-mode");
const fb= document.querySelector(".fb");
const Linkedin= document.querySelector(".in");
const git= document.querySelector(".git");
const copy= document.querySelector(".copy");
const love= document.querySelector(".love");
const selectDifficulty = document.querySelector(".unfilled-grid");
const startGame= document.querySelector(".startGame"); 

const BOARD= document.querySelectorAll(".board");

// Howlwer JS
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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
var inputVal=42; // default
selectDifficulty.addEventListener("click", function(){
    if(selectDifficulty.options[selectDifficulty.selectedIndex].value=='easy'){
        inputVal=42;
    }
    if(selectDifficulty.options[selectDifficulty.selectedIndex].value=='medium'){
        inputVal=48;
    }
    if(selectDifficulty.options[selectDifficulty.selectedIndex].value=='hard'){
        inputVal=53;
    }
    if(selectDifficulty.options[selectDifficulty.selectedIndex].value=='expert'){
        inputVal=56;
    }
});


var hasBegin= false;
var timer=0;
var myInterval; // setInterval variable to update timer
var checked=false;
var revealed1=false;
var revealed2=false;

var board= new Array(9); // board with which user will interact
var solution= new Array(9); // board which contains the actual solution
var wePutted= new Array(9) // kind of isVisited check (to keep a tract on which grid, we have removed our value)

for(let i=0; i<board.length; i++){
    board[i]= new Array(9);
    solution[i]= new Array(9);
    wePutted[i]= new Array(9);
}

start.addEventListener("click", function(){
    
    if(hasBegin === false){
        hasBegin= true;
        enableScroll();
        document.querySelector("#GameCanvas").scrollIntoView();
        if(!music.overworld.playing()){
            document.querySelector("#GameCanvas").scrollIntoView();
            music.overworld.play();
            audioBtn.classList.add("audioON");
        }
        sudokuGenerator(inputVal);
        startGame.classList.add("isHidden");
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
        
        
        if(hasBegin===true){
            myInterval= setInterval(function(){
                if(revealed1==false && revealed2==false && checked==false){
                    timer++;
                    time.textContent="Time Elapsed: "+timer+" sec";
                }
            },1000);
        }
    }
});

darkMode.addEventListener("click", function(){
    if(darkMode.checked==true){ // DARK MODE
        BODY.style.backgroundImage= "url('Image/bg-dark.png')";
        BODY.style.color= "#c7bebe";
        BODY.style.fontWeight="100";
        if(navBar.classList.contains("navbar-light")==true){
            navBar.classList.remove("navbar-light");
            navBar.classList.add("navbar-dark");
        }
        if(numMobile.classList.contains("numMobile-light")==true){
            numMobile.classList.remove("numMobile-light");
            numMobile.classList.add("numMobile-dark");
        }
        for(let i=0; i<BOARD.length; i++){
            if(BOARD[i].classList.contains("board-light")==true){
                BOARD[i].classList.remove("board-light");
                BOARD[i].classList.add("board-dark");
            }
        }
        if(time.classList.contains("time-light")==true){
            time.classList.remove("time-light");
            time.classList.add("time-dark");
        }
        if(darkModePara.classList.contains("darkMode-light")==true){
            darkModePara.classList.remove("darkMode-light");
            darkModePara.classList.remove("red");
            darkModePara.classList.add("darkMode-dark");
            darkModePara.classList.add("yellow");
        }
        if(fb.classList.contains("footer-light")==true){
            fb.classList.remove("footer-light");
            Linkedin.classList.remove("footer-light");
            Linkedin.src="Image/in-dark.png";
            git.classList.remove("footer-light");
            copy.classList.remove("footer-light");
            love.classList.remove("footer-light");

            fb.classList.add("footer-dark");
            Linkedin.classList.add("footer-dark");
            git.classList.add("footer-dark");
            copy.classList.add("footer-dark");
            love.classList.add("footer-dark");
        }
    }

    else if(darkMode.checked==false){ // LIGHT MODE
        BODY.style.backgroundImage= "url('Image/bg-light.jpg')";
        BODY.style.color= "black";
        if(navBar.classList.contains("navbar-dark")==true){
            navBar.classList.remove("navbar-dark");
            navBar.classList.add("navbar-light");
        }
        if(numMobile.classList.contains("numMobile-dark")==true){
            numMobile.classList.remove("numMobile-dark");
            numMobile.classList.add("numMobile-light");
        }
        for(let i=0; i<BOARD.length; i++){
            if(BOARD[i].classList.contains("board-dark")==true){
                BOARD[i].classList.remove("board-dark");
                BOARD[i].classList.add("board-light");
            }
        }
        if(time.classList.contains("time-dark")==true){
            time.classList.remove("time-dark");
            time.classList.add("time-light");
        }
        if(darkModePara.classList.contains("darkMode-dark")==true){
            darkModePara.classList.remove("darkMode-dark");
            darkModePara.classList.remove("yellow");
            darkModePara.classList.add("darkMode-light");
            darkModePara.classList.add("red");
        }
        if(fb.classList.contains("footer-dark")==true){
            fb.classList.remove("footer-dark");
            Linkedin.classList.remove("footer-dark");
            Linkedin.src="Image/linkedin.png";
            git.classList.remove("footer-dark");
            copy.classList.remove("footer-dark");
            love.classList.remove("footer-dark");

            fb.classList.add("footer-light");
            Linkedin.classList.add("footer-light");
            git.classList.add("footer-light");
            copy.classList.add("footer-light");
            love.classList.add("footer-light");
        }
    }
});


audioBtn.addEventListener("click", function(){
    
    if(audioBtn.classList.contains("audioON")){
        
        if(music.overworld.playing()){
            audioBtn.classList.remove("fa-volume-up");
            audioBtn.classList.add("fa-volume-mute");
            audioBtn.classList.remove("audioON");
            audioBtn.classList.add("audioOFF");
            music.overworld.pause();
        }
    }
    else if(audioBtn.classList.contains("audioOFF")){
        
        if(!music.overworld.playing()){
            audioBtn.classList.remove("fa-volume-mute");
            audioBtn.classList.add("fa-volume-up");
            audioBtn.classList.remove("audioOFF");
            audioBtn.classList.add("audioON");
            music.overworld.play();
        }
    }
});

const reloadWindow= function(){
    history.scrollRestoration = "manual";
    document.querySelector('html').style.scrollBehavior = '';
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    location.reload();
}

playAgain.addEventListener("click", reloadWindow);

playAgain0.addEventListener("click", reloadWindow);

playAgain3.addEventListener("click", reloadWindow);


/****************************************   CONFETTI   **********************************************/
{
var confetti = {
	maxCount: 150,		//set max confetti count
	speed: 2,			//set the particle animation speed
	frameInterval: 15,	//the confetti animation frame interval in milliseconds
	alpha: 1.0,			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	gradient: false,	//whether to use gradients for the confetti particles
	start: null,		//call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
	stop: null,			//call to stop adding confetti
	toggle: null,		//call to start or stop the confetti animation depending on whether it's already running
	pause: null,		//call to freeze confetti animation
	resume: null,		//call to unfreeze confetti animation
	togglePause: null,	//call to toggle whether the confetti animation is paused
	remove: null,		//call to stop the confetti animation and remove all confetti immediately
	isPaused: null,		//call and returns true or false depending on whether the confetti animation is paused
	isRunning: null		//call and returns true or false depending on whether the animation is running
};

(function() {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.toggle = toggleConfetti;
	confetti.pause = pauseConfetti;
	confetti.resume = resumeConfetti;
	confetti.togglePause = toggleConfettiPause;
	confetti.isPaused = isConfettiPaused;
	confetti.remove = removeConfetti;
	confetti.isRunning = isConfettiRunning;
	var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
	var streamingConfetti = false;
	var animationTimer = null;
	var pause = false;
	var lastFrameTime = Date.now();
	var particles = [];
	var waveAngle = 0;
	var context = null;

	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = Math.random() * Math.PI;
		return particle;
	}

	function toggleConfettiPause() {
		if (pause)
			resumeConfetti();
		else
			pauseConfetti();
	}

	function isConfettiPaused() {
		return pause;
	}

	function pauseConfetti() {
		pause = true;
	}

	function resumeConfetti() {
		pause = false;
		runAnimation();
	}

	function runAnimation() {
		if (pause)
			return;
		else if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			var now = Date.now();
			var delta = now - lastFrameTime;
			if (!supportsAnimationFrame || delta > confetti.frameInterval) {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				updateParticles();
				drawParticles(context);
				lastFrameTime = now - (delta % confetti.frameInterval);
			}
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}

	function startConfetti(timeout, min, max) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimationFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, confetti.frameInterval);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
			document.body.prepend(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
			context = canvas.getContext("2d");
		} else if (context === null)
			context = canvas.getContext("2d");
		var count = confetti.maxCount;
		if (min) {
			if (max) {
				if (min == max)
					count = particles.length + max;
				else {
					if (min > max) {
						var temp = min;
						min = max;
						max = temp;
					}
					count = particles.length + ((Math.random() * (max - min) + min) | 0);
				}
			} else
				count = particles.length + min;
		} else if (max)
			count = particles.length + max;
		while (particles.length < count)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		pause = false;
		runAnimation();
		if (timeout) {
			window.setTimeout(stopConfetti, timeout);
		}
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function removeConfetti() {
		stop();
		pause = false;
		particles = [];
	}

	function toggleConfetti() {
		if (streamingConfetti)
			stopConfetti();
		else
			startConfetti();
	}
	
	function isConfettiRunning() {
		return streamingConfetti;
	}

	function drawParticles(context) {
		var particle;
		var x, y, x2, y2;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			x2 = particle.x + particle.tilt;
			x = x2 + particle.diameter / 2;
			y2 = particle.y + particle.tilt + particle.diameter / 2;
			if (confetti.gradient) {
				var gradient = context.createLinearGradient(x, particle.y, x2, y2);
				gradient.addColorStop("0", particle.color);
				gradient.addColorStop("1.0", particle.color2);
				context.strokeStyle = gradient;
			} else
				context.strokeStyle = particle.color;
			context.moveTo(x, particle.y);
			context.lineTo(x2, y2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle) - 0.5;
				particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();
}
/*************************************************************************************************************************************************************/



check.addEventListener("click", function(){

    // for(let i=0; i<9; i++){
    //     for(let j=0; j<9; j++){
    //         console.log(board[i][j]);
    //     }
    // }

    checked=true;
    clearInterval(myInterval); // stop timer
    let ans= checkUserSolution();
    timeMSG.textContent="Your time: "+timer+" seconds.";
    if(ans===true){

        const START = () => {
            setTimeout(function(){
                confetti.start();
            },1000);
        };
        const STOP = () => {
            setTimeout(function(){
                confetti.stop();
            },6000)
        };
        
        START();
        STOP();

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

function gridToR(gridVal){
    let itm= gridVal+1;
    let r;
    if(itm%9 === 0){
        r= ( Math.floor(itm/9) )-1;
    }
    else if( itm%9 !=0){
        r= Math.floor(itm/9);
    }
    return r;
}
function gridToC(gridVal){
    let itm= gridVal+1;
    let c;
    if(itm%9 === 0){
        c=8;
    }
    else if( itm%9 !=0){
        c= (itm%9) -1;
    }
    return c;   
}

const Grid= [];
var idx=0;

/*
👉 If any of the item is clicked? --> 
    Check wheather currently other item are animating? If yes, remove animation
    Decode correponding 0-based row, col index from item Number
    Check that wheather user clicked on empty grid or not? If yes, apply animation
    Check wheather user clicked on clrBtn or not? If yes, remove animation from current grid, & revert grid value back to 0
    Now check that wheather user clicked on any of the numPad btn or not? If yes -->
        Check wheather current animated grid is unfilled or not? If yes -->First remove animation & then assign numPad value to grid
        Now check wheather current value is permitted or not? IF yes --> Turn text color to green, If not permitted --> Turn text color to red
*/

const numPad= function(Itm, z){
    if(wePutted[gridToR(Grid[idx-1])][gridToC(Grid[idx-1])]===0){
        Itm.classList.remove("selectAnime");
        let NuMI=z;
        
        document.querySelector("#item"+Grid[idx-1]).textContent=NuMI.toString(10);
        board[gridToR(Grid[idx-1])][gridToC(Grid[idx-1])]=NuMI;

        if(isPermittedCheck(NuMI, gridToR(Grid[idx-1]),gridToC(Grid[idx-1]))==true){ // correct value has ben choosen by user
            document.querySelector("#item"+Grid[idx-1]).classList.remove("txtRed");
            document.querySelector("#item"+Grid[idx-1]).classList.add("txtGreen");
        }
        else{
            document.querySelector("#item"+Grid[idx-1]).classList.remove("txtGreen"); // wrong value
            document.querySelector("#item"+Grid[idx-1]).classList.add("txtRed");
        }
    }
}

for(let i=0; i<81; i++){
    let Itm= document.querySelector("#item"+i);
    Itm.addEventListener("click", function(){
        if(checked===false && revealed1===false && revealed2===false){
            Grid.push(i);
            idx++;
            
            for(let k=0; k<81; k++){ 
                if(document.querySelector("#item"+k).classList.contains("selectAnime")===true){
                    document.querySelector("#item"+k).classList.remove("selectAnime"); // remove animation from other grid
                }
            }
            
            let r= gridToR(Grid[idx-1]); 
            let c= gridToC(Grid[idx-1]);
            
            if(wePutted[r][c]===0){ // grid was unfilled (user has clicked on correct grid) --> apply animation
                Itm.classList.add("selectAnime");
            }
            
            clrBtn.addEventListener("click", function(){
                if(checked===false && revealed1===false && revealed2===false && wePutted[gridToR(Grid[idx-1])][gridToC(Grid[idx-1])]===0){
                    board[gridToR(Grid[idx-1])][gridToC(Grid[idx-1])]=0;
                    document.querySelector("#item"+Grid[idx-1]).textContent="";
                }
            });
            
            document.querySelector("#num"+1).addEventListener("click", function(){  numPad(Itm, 1)  });
            document.querySelector("#num"+2).addEventListener("click", function(){  numPad(Itm, 2)  });
            document.querySelector("#num"+3).addEventListener("click", function(){  numPad(Itm, 3)  });
            document.querySelector("#num"+4).addEventListener("click", function(){  numPad(Itm, 4)  });
            document.querySelector("#num"+5).addEventListener("click", function(){  numPad(Itm, 5)  });
            document.querySelector("#num"+6).addEventListener("click", function(){  numPad(Itm, 6)  });
            document.querySelector("#num"+7).addEventListener("click", function(){  numPad(Itm, 7)  });
            document.querySelector("#num"+8).addEventListener("click", function(){  numPad(Itm, 8)  });
            document.querySelector("#num"+9).addEventListener("click", function(){  numPad(Itm, 9)  });

        }
    });
}


reveal1.addEventListener("click", function(){
    revealed1=true;
    clearInterval(myInterval);
    SolveSudoku();
    for(let i=0; i<81; i++){
        let r = gridToR(i); 
        let c = gridToC(i);
        
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
    revealed2=true;
    SolveSudoku();
    for(let i=0; i<81; i++){
        let r = gridToR(i); 
        let c = gridToC(i);

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


function createFullSudoku(){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){

            if(board[i][j]===0){ // empty grid
                let count=0;
                let m = new Map();

                while(count<9){ // Try with diff rand num in [1,9] until purpose solves
                    let num= randomNumGen();
                    
                    if(m.has(num)===false){
                        m.set(num, true);
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
            m.set(s,true);
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