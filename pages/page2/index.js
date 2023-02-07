const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 2;

canvas.width = innerWidth;
canvas.height = innerHeight;

console.log(canvas.width, canvas.height);

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
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

const player = new Player();
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
    player.update();

    if (keys.right.pressed)
        player.vx = 5
    else if (keys.left.pressed)
        player.vx = -5
    else
        player.vx = 0
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