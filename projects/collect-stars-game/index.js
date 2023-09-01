///// CONSTANTS AND IMPORTANT VARIABLES /////

const GRAVITY = 1.6;
const MAX_VY = 26;
const TIME_PER_GAME = 100;
const STARS_PER_GAME = 30;
const PLATFORMS_PER_GAME = 200;
const PLATFORM_MIN_WIDTH = 100;
const PLATFORM_MAX_WIDTH = 600;
const CLOUDS_PER_GAME = 200;

// Level dimensions
const R_LIMIT = 3000;
const L_LIMIT = -3000;
const T_LIMIT = -2000;
const B_LIMIT = 1000;

//Images and canvas
const platform_grass = document.getElementById("platform_grass");
const background = document.getElementById("background");
const cloud = document.getElementById("cloud");
const sprite = document.getElementById("sprite");
const star = document.getElementById("star");

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
if(innerHeight > innerWidth) //In portrait, substract 100px for mobile controls
    canvas.height -= 100;

//Normal window of movement for the ball
let R_MARGIN = canvas.width / 3;
let L_MARGIN = canvas.width / 9;
let T_MARGIN = canvas.height / 9;
let B_MARGIN = canvas.height * (8 / 9);


///// HANDLE WINDOW RESIZING /////

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    if(innerHeight > innerWidth)
        canvas.height -= 100;
    R_MARGIN = canvas.width / 3;
    L_MARGIN = canvas.width / 9;
})


///// GAME ENTITIES /////

class Player {
    constructor() {
        this.x = 100; //Position in level
        this.y = 300;
        this.vx = 0; //Velocity to add to position at each frame
        this.vy = 0;
        this.width = 48; //Ball size
        this.height = 48;
        this.falling = true; //Checks floor below ball
        this.image = sprite;
        this.tick = 1; //Controls ball jumping animation
    }

    draw() {
        c.drawImage(this.image, 32 * Math.floor(this.tick), 0, 32, 32, this.x, this.y, this.width, this.height);
    }

    update() {
        this.tick += 0.4;
        if (!keys.left.pressed && !keys.right.pressed){
            this.tick -= 0.38; //Ball movement when resting 
            if (this.tick >= 2) // Toggles between 0 and 1
                this.tick = 0;
        }
        if (this.tick >= 8) //Ball in motion, sprite contains 0-7 frames
            this.tick = 0;
            
        this.y += this.vy;
        this.x += this.vx;
        if (this.falling && this.vy < MAX_VY){
            this.vy += GRAVITY;
        }
        this.draw();
    }

    reset() {
        this.x = 100;
        this.y = 300;
        this.vx = 0;
        this.vy = 0;
        this.falling = true;
        this.tick = 1;
    }
}

class Platform {
    constructor(x, y, w){
        this.x = x;
        this.y = y;
        this.vx = 0, //Counters ball movement by moving in opposite velocity
        this.vy = 0,
        this.width = w;
        this.height = 40;
        this.image = platform_grass;
    }

    draw() {
        c.drawImage(this.image, this.x, this.y - 9, this.width, this.height)
    }

    update() {
        this.draw();
        this.y += this.vy;
        this.x += this.vx;
    }
}

class Cloud {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.vx = 0,
        this.vy = 0,
        this.width = w;
        this.height = h;
        this.image = cloud;
    }

    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    update() {
        this.draw();
        this.y += this.vy;
        this.x += this.vx;
    }
}

class Star {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.vx = 0,
        this.vy = 0,
        this.width = 36;
        this.height = 36;
        this.image = star;
        this.taken = false;
    }

    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    update() {
        this.draw();
        this.y += this.vy;
        this.x += this.vx;
    }
}


///// BASIC UI INTERACTION FUNCTIONS /////

//Show & hide help menu
document.getElementById("help").addEventListener('click', () => {
    document.getElementById("help_menu_container").classList.remove("hide");
    stopTimer();
})
document.getElementById("close_button").addEventListener('click', () => {
    document.getElementById("help_menu_container").classList.add("hide");
    startTimer(false);
})

//Click restart game, try again, or play again buttons
document.getElementById("restart_game").addEventListener('click', () => {
    document.getElementById("help_menu_container").classList.add("hide");
    startGame();
})

document.getElementById("try_again").addEventListener('click', () => {
    startGame();
})

function displayTime(time) {
    document.getElementById("current_time").innerHTML = time;
}

function displayStars(currentStars) {
    document.getElementById("total_stars").innerHTML = STARS_PER_GAME;
    document.getElementById("current_stars").innerHTML = currentStars;
}

function showGoMessage() {
    document.getElementById("go_message").style.animation = 'none';
    document.getElementById("go_message").offsetHeight;
    document.getElementById("go_message").style.animation = null;
}

function showWinDialog() {
    document.getElementById("win_modal").classList.remove("hide");
}
function showLoseDialog() {
    document.getElementById("lose_modal").classList.remove("hide");
}

function removeDialogs() {
    document.getElementById("win_modal").classList.add("hide");
    document.getElementById("lose_modal").classList.add("hide");
}


///// GAME CONTROLS /////

// Stores whether the player is pressing the controllers or not
const keys = {
    right: { pressed: false },
    left: { pressed: false }
}

// Controls for PC
addEventListener('keydown', ({key}) => {
    switch (key.toLowerCase()) {
        case "a":
            keys.left.pressed = true
            break
        case "d":
            keys.right.pressed = true
            break
        case "w":
            if (!player.falling){
                player.vy = -28;
                player.falling = true;
            }
            break
        }
})

addEventListener('keyup', ({key}) => {
    switch (key.toLowerCase()) {
        case "a":
            keys.left.pressed = false
            break
        case "d":
            keys.right.pressed = false
            break
    } 
})

// Controls for mobile 
document.getElementById("left_arrow").addEventListener('touchstart', () => {
    keys.left.pressed = true;
})
document.getElementById("left_arrow").addEventListener('touchend', () => {
    keys.left.pressed = false;
})

document.getElementById("right_arrow").addEventListener('touchstart', () => {
    keys.right.pressed = true;
})
document.getElementById("right_arrow").addEventListener('touchend', () => {
    keys.right.pressed = false;
})

document.getElementById("jump").addEventListener('touchstart', (e) => {

    e.preventDefault();
    if (!player.falling){
        player.vy = -28;
        player.falling = true;
    }

    if(e.touches.length == 2 && 
    (e.touches.item(0).id ===  "left_arrow" || 
    e.touches.item(1).id ===  "left_arrow")) {
        keys.left.pressed === true
    }

    if(e.touches.length == 2 && 
    (e.touches.item(0).id ===  "right_arrow" || 
    e.touches.item(1).id ===  "right_arrow")) {
        keys.right.pressed === true
    }
})


///// GAME LOGIC /////

// Handle game time
let time;
let timeInterval;

function startTimer(newGame = true) {
    if (newGame)
        time = TIME_PER_GAME;
    displayTime(time);

    timeInterval = setInterval(() => {
        time -= 1;
        if(time < 0){
            loseGame();
            return
        }
        displayTime(time);
    }, 1000)
}

function stopTimer() {
    clearInterval(timeInterval)
}


// Handle stars
let currentStars = 0;
displayStars(currentStars);

function checkStarDistance(player, starArray) {
    for(let i=0; i<starArray.length; i++){
        if(Math.abs(player.x - starArray[i].x) + Math.abs(player.y - starArray[i].y) < 20);
        takeStar(starArray[i], starArray);
    }
}

function takeStar(starIndex, starArray){
    starArray[starIndex].taken = true;
    currentStars++;
    displayStars(currentStars);

    if(currentStars === STARS_PER_GAME)
        winGame();
}


// Fundamental game variables
const player = new Player();
const platforms = [];
const clouds = [];
const stars = [];

function generateGame(){
    platforms.push(new Platform(L_LIMIT, B_LIMIT, (R_LIMIT - L_LIMIT) + 1000))
    for(let i=0; i<PLATFORMS_PER_GAME; i++){
        let x = Math.floor(Math.random() * (R_LIMIT - L_LIMIT) + L_LIMIT);
        let y = Math.floor(Math.floor(Math.random() * (B_LIMIT - T_LIMIT) + T_LIMIT) / 200) * 200;
        let w = Math.floor(Math.random() * (PLATFORM_MAX_WIDTH - PLATFORM_MIN_WIDTH) + PLATFORM_MIN_WIDTH);
        platforms.push(new Platform(x, y, w))
    }

    for(let i=0; i<CLOUDS_PER_GAME; i++){
        let x = Math.floor(Math.random() * (R_LIMIT - L_LIMIT) + L_LIMIT);
        let y = Math.floor(Math.random() * (B_LIMIT - T_LIMIT) + T_LIMIT);
        let w = Math.floor(Math.random() * (300 - 100) + 100);
        let h = Math.floor(Math.random() * (300 - 100) + 100);
        clouds.push(new Cloud(x, y, w, h))
    }

    for(let i=0; i<STARS_PER_GAME; i++){
        let starPlatformIndex = Math.floor(Math.random() * PLATFORMS_PER_GAME)
        let starPlatform = platforms[starPlatformIndex];
        let x = starPlatform.x + Math.floor(Math.random() * (starPlatform.width + 20) - 10);
        let y = starPlatform.y - 20;
        stars.push(new Star(x, y))
    }
}

function deletePreviousGame() {
    player.reset();
    platforms.splice(0, platforms.length);
    clouds.splice(0, clouds.length);
    stars.splice(0, stars.length);
}


// Animation and collision checks logic
let animationID;
function animateGame() {
    animationID = requestAnimationFrame(animateGame);
    c.drawImage(background, 0, 0, canvas.width, canvas.height);

    player.falling = true;
    
    if (keys.right.pressed && player.x < R_MARGIN)
        player.vx = 5
    else if (keys.left.pressed && player.x > L_MARGIN)
        player.vx = -5
    else
        player.vx = 0;


    if (keys.right.pressed && player.x >= R_MARGIN){
        platforms.forEach( platform => platform.vx = -5);
        clouds.forEach( cloud => cloud.vx = -1);
    }
    else if (keys.left.pressed && player.x <= L_MARGIN){
        platforms.forEach( platform => platform.vx = 5);
        clouds.forEach( cloud => cloud.vx = 1);
    }
    else {
        platforms.forEach( platform => platform.vx = 0);
        clouds.forEach( cloud => cloud.vx = -0.1);
    }

    platforms.forEach( platform => {
        if (player.y + player.height <= platform.y && player.y + player.height + player.vy >= platform.y
            && (player.x - 30) > (platform.x - player.width) && (player.x  + 30) < (platform.x + platform.width)) {
                player.y = platform.y - player.height;
                player.vy = 0;
                player.falling = false;
            }
    })

    if (player.y + player.vy <= T_MARGIN){
        platforms.forEach( platform => platform.vy = -player.vy)
        clouds.forEach( cloud => cloud.vy = -(player.vy / 10))
        player.y -= player.vy
    }
    else if (player.y + player.vy + player.height >= B_MARGIN){
        platforms.forEach( platform => platform.vy = -player.vy)
        clouds.forEach( cloud => cloud.vy = -(player.vy / 10))
        player.y -= player.vy
    }
    else{
        platforms.forEach( platform => platform.vy = 0);
        clouds.forEach( cloud => cloud.vy = 0);
    }

    if (player.y < T_MARGIN) 
        player.y = T_MARGIN;
    else if ( player.y + player.height > B_MARGIN)
        player.y = B_MARGIN - player.height;

    clouds.forEach( cloud => cloud.update());
    platforms.forEach( platform => platform.update());
    stars.forEach( star => star.update());
    player.update();
}


// Start, win and lose game functions
function startGame() {
    removeDialogs();
    deletePreviousGame()
    generateGame();
    startTimer();
    animateGame();
}

function winGame() {
    cancelAnimationFrame(animationID);
    stopTimer();
    showWinDialog();
}

function loseGame() {
    cancelAnimationFrame(animationID);
    stopTimer();
    showLoseDialog();
}
    
startGame();