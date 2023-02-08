const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 2;

canvas.width = innerWidth;
canvas.height = innerHeight;

const R_MARGIN = canvas.width / 3;
const L_MARGIN = canvas.width / 9;
const T_MARGIN = canvas.height / 3;
const B_MARGIN = canvas.height * 8 / 9;

console.log(canvas.width, canvas.height);

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const R_MARGIN = canvas.width / 3;
    const L_MARGIN = canvas.width / 9;
})

class Player {
    constructor() {
        this.x = 100,
        this.y = 100,
        this.vx = 0,
        this.vy = 1,
        this.width = 100
        this.height = 100
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.x, this.y,
            this.width, this.height)
    }

    update() {
        this.draw();
        this.y += this.vy;
        this.x += this.vx;
        if (this.y + this.height + this.vy <= canvas.height)
            this.vy += gravity;
        else
            this.vy = 0;
    }
}

class Platform {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.vx = 0,
        this.vy = 0,
        this.width = w;
        this.height = h;
    }

    draw() {
        c.fillStyle = "blue";
        c.fillRect(this.x, this.y,
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
for(let i=0; i<20; i++){
    let x = Math.floor(Math.random() * canvas.width)
    let y = Math.floor(Math.random() * canvas.height)
    let w = Math.floor(Math.random() * (400 - 50) + 50)
    let h = Math.floor(Math.random() * (40 - 5) + 5)
    platforms.push(new Platform(x, y, w, h))
}
const platform = new Platform();
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
    c.clearRect(0, 0, canvas.width, canvas.height);
    platforms.forEach( platform => platform.update());
    player.update();

    if (keys.right.pressed && player.x < R_MARGIN)
        player.vx = 5
    else if (keys.left.pressed && player.x > L_MARGIN)
        player.vx = -5
    else
        player.vx = 0

    if (player.y + player.vy < T_MARGIN)
        player.vy = 0
    else if (player.y + player.vy > B_MARGIN)
        player.vy = 0

    if (keys.right.pressed && player.x >= R_MARGIN)
        platforms.forEach( platform => platform.vx = -5)
    else if (keys.left.pressed && player.x <= L_MARGIN)
        platforms.forEach( platform => platform.vx = 5)
    else
        platforms.forEach( platform => platform.vx = 0)

    // if (player.y <= T_MARGIN)
    //     platforms.forEach( platform => platform.vy = -player.vy)
    // else if (player.y >= B_MARGIN)
    //     platforms.forEach( platform => platform.vy = -player.vy)
    // else
    //     platforms.forEach( platform => platform.vy = 0)

    platforms.forEach( platform => {
        if (player.y + player.height <= platform.y && player.y + player.height + player.vy >= platform.y 
            && player.x > (platform.x - player.width) && player.x < platform.x + platform.width)
            player.vy = 0
    })
}

animate();

addEventListener('keydown', ({key}) => {
    switch (key) {
        case "a":
            keys.left.pressed = true
            break
        case "w":
            player.vy = -28;
            break
        case "d":
            keys.right.pressed = true
            break
    }

})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case "a":
            keys.left.pressed = false
            break
        case "d":
            keys.right.pressed = false
            break
    } 
})