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
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
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
    constructor() {
        this.reset();
    }

    reset() {
        this.pos = [vec(
            Math.floor(Math.random() * COLS),
            Math.floor(Math.random() * ROWS)
        )];

        this.dir = vec(0, 0);
        this.dirChanged = false;
        
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
        this.dirChanged = false;

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

        this.checkDead();
    }

    checkDead() {
        // hacky solution to avoid resetting upon start of game.
        if (this.pos.length <= 3) {
            return;
        }

        for (let i = 1; i < this.pos.length; i++) {
            if (this.pos[0].equals(this.pos[i])) {
                this.reset();
            }
        }
    }

    draw() {
        // ctx.fillStyle = "lime";
        // ctx.fillRect(this.pos[0].x * TS, this.pos[0].y * TS, TS, TS);
        

        // draw body
        ctx.fillStyle = "red";
        for (let i = 1; i < this.pos.length - 1; i++) {
            ctx.fillRect(this.pos[i].x * TS, this.pos[i].y * TS, TS, TS);
        }

        const S_TS = 64; // sprite tilesize
        
        // draw head
        ctx.save();
        ctx.translate(this.pos[0].x * TS + TS/2,this.pos[0].y * TS + TS/2);
        ctx.rotate(-Math.atan2(this.dir.x, this.dir.y));
        ctx.drawImage(
            images.sprite,
            S_TS*4, S_TS*1, S_TS, S_TS, 
            -TS/2,  -TS/2, TS, TS);
        ctx.restore();
        
        // draw tail
        ctx.save();
        ctx.translate(this.pos.last().x * TS + TS/2,this.pos.last().y * TS + TS/2);
        let tail_dir = this.pos.last().copy().sub(this.pos[this.pos.length-2]);
        ctx.rotate(-Math.atan2(tail_dir.x, tail_dir.y));
        ctx.drawImage(
            images.sprite,
            S_TS*3, S_TS*2, S_TS, S_TS, 
            -TS/2,  -TS/2, TS, TS);
        ctx.restore();
    }

    setDir(v) {
        // check if direction changed in last frame
        // check to not be able to change direction 180 degrees. only 90 degree turns
        if (!this.dirChanged && !this.dir.equals(v.copy().mul(-1))) {
            this.dir = v;
            this.dirChanged = true;
        }
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