class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    mul(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }
    equals(v) {
        return this.x == v.x && this.y == v.y;
    }
}
let vec = (x,y) => new Vector(x,y);

Array.prototype.last = function() {
    return this[this.length - 1];
}

class Snake {
    constructor(pos) {
        this.pos = [pos];
        this.dir = vec(1, 0);
        
        this.grow();
        this.grow();

        this.highscore = localStorage.getItem('highscore') === null ? this.score() : Number(localStorage.getItem('highscore'));
        $("#highscore").html(this.highscore);
    }

    update() {

        for (let i = this.pos.length - 1; i > 0; i--) {
            this.pos[i] = this.pos[i - 1].copy();
        }

        this.pos[0].add(this.dir);

        // wrap around the screen
        if (this.pos[0].x >= COLS) {
            this.pos[0].x = 0;
        } else if (this.pos[0].y >= ROWS) {
            this.pos[0].y = 0;
        } else if (this.pos[0].x < 0) {
            this.pos[0].x = COLS - 1;
        } else if (this.pos[0].y < 0) {
            this.pos[0].y = ROWS - 1;
        }
    }

    draw() {
        // ctx.fillStyle = "lime";
        // ctx.fillRect(this.pos[0].x * TS, this.pos[0].y * TS, TS, TS);
        
        ctx.fillStyle = "red";
        for (let i = 1; i < this.pos.length; i++) {
            ctx.fillRect(this.pos[i].x * TS, this.pos[i].y * TS, TS, TS);
        }
        
        const x = 64
        ctx.save();
        ctx.translate(this.pos[0].x * TS + TS/2,this.pos[0].y * TS + TS/2);
        ctx.rotate(-Math.atan2(this.dir.x, this.dir.y));
        ctx.drawImage(
            images.sprite,
            x*4, x*1, x, x, 
            -TS/2,  -TS/2, TS, TS);
        ctx.restore();
    }

    grow() {
        this.pos.push(this.pos.last().copy());

        if (this.score() > this.highscore) {
            this.highscore = this.score();
            $("#highscore").html(this.highscore);
            localStorage.setItem("highscore", this.highscore);
        }
    }

    eats(food) {
        if (this.pos[0].equals(food)) {
            this.grow();
            return true;
        }
        return false;
    }
    
    score() {
        return this.pos.length - 3;
    }
}