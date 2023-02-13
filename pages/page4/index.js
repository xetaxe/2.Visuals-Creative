const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 2;
const MAX_VY = 30;

const platform_grass = document.getElementById("platform_grass");
const background = document.getElementById("background");
const cloud = document.getElementById("cloud");
const sprite = document.getElementById("sprite");

canvas.width = innerWidth;
canvas.height = innerHeight;

const R_MARGIN = canvas.width / 3;
const L_MARGIN = canvas.width / 9;
const T_MARGIN = canvas.height / 9;
const B_MARGIN = canvas.height * (8 / 9);

const R_LIMIT = 5000;
const L_LIMIT = -5000;
const T_LIMIT = -3000;
const B_LIMIT = 1000;

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    R_MARGIN = canvas.width / 3;
    L_MARGIN = canvas.width / 9;
})

class Player {
    constructor() {
        this.x = 100;
        this.y = 300;
        this.abs_x = 100;
        this.abs_y = 300;
        this.vx = 0;
        this.vy = 0;
        this.width = 60;
        this.height = 60;
        this.falling = true;
        this.image = sprite;
        this.tick = 1;
    }



    draw() {
        c.drawImage(this.image, 32 * Math.floor(this.tick), 0, 32, 32, this.x, this.y,
            this.width, this.height);
    }

    update() {
        this.tick += 0.4;
        if (!keys.left.pressed && !keys.right.pressed){
            this.tick -= 0.38;
            if (this.tick >= 2)
                this.tick = 0;
        }
        if (this.tick >= 8)
            this.tick = 0;
        this.y += this.vy;
        this.x += this.vx;
        if (this.falling && this.vy < MAX_VY){
            this.vy += gravity;
        }
        this.draw();
    }
}

class Platform {
    constructor(x, y, w, h, image){
        this.x = x;
        this.y = y;
        this.vx = 0,
        this.vy = 0,
        this.width = w;
        this.height = h;
        this.image = image;
    }

    draw() {
        c.fillStyle = "blue";
        c.drawImage(this.image, this.x, this.y - 8,
            this.width, this.height)
    }

    update() {
        this.draw();
        this.y += this.vy;
        this.x += this.vx;
    }

}

class Cloud {
    constructor(x, y, w, h, image){
        this.x = x;
        this.y = y;
        this.vx = 0,
        this.vy = 0,
        this.width = w;
        this.height = h;
        this.image = image;
    }

    draw() {
        c.fillStyle = "blue";
        c.drawImage(this.image, this.x, this.y,
            this.width, this.height)
    }

    update() {
        this.draw();
        this.y += this.vy;
        this.x += this.vx;
    }

}

const player = new Player();
const platforms = [];
const clouds = [];
for(let i=0; i<200; i++){
    let x = Math.floor(Math.random() * (R_LIMIT - L_LIMIT) + L_LIMIT);
    let y = Math.floor(Math.random() * (B_LIMIT - T_LIMIT) + T_LIMIT);
    let w = Math.floor(Math.random() * (600 - 100) + 100);
    // let h = Math.floor(Math.random() * (40 - 5) + 5);
    platforms.push(new Platform(x, y, w, 40, platform_grass))
    if (i % 5 === 0)
        clouds.push(new Cloud(-x, -y, w, 0.75*w, cloud))
}

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate);
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
    player.update();
}
    
animate();
    
addEventListener('keydown', ({key}) => {
    switch (key.toLowerCase()) {
        case "a":
            keys.left.pressed = true
            break
        case "w":
        // if (!player.falling)
            player.vy = -28;
            player.falling = true;
            break
        case "d":
            keys.right.pressed = true
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