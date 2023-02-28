export class Triangle {
    constructor(x, y, width, height, color, vx, vy){
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.color = color,
        this.vx = vx,
        this.vy = vy
    }

    updatePoints(){
        this.x += this.vx;
        this.y += this.vy;
    }

    getPoints(){
        return [
            this.x, this.y,
            this.x + this.width, this.y,
            this.x, this.y + this.height
        ]
    }

    getColor(){
        return this.color
    }
    
}