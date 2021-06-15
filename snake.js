const INITIAL_SNAKE_LENGTH = 3;

class Snake {
    constructor() {
        this.reset();
        this.pause();
        this.highscore = localStorage.getItem('highscore') === null ? this.score() : Number(localStorage.getItem('highscore'));
    }

    reset() {
        this.t = [];

        this.dir = vec(1, 0);
        this.dirChanged = false;

        this.dead = false;

        this.t.push(vec(
            floor(random(0, COLS)),
            floor(random(0, ROWS))
        ));

        for (let i = 1; i < INITIAL_SNAKE_LENGTH; i++) {
            this.t.push(vec(this.t[0].x - i, this.t[0].y));
            // console.log(this.t[i].x * tileSize, this.t[i].y * tileSize, tileSize, tileSize);
        }
        // console.log(this.t);

        $("#score").html(this.score());
    }

    draw() {
        fill("lime");
        for (let i = 1; i < this.t.length; i++) {
            rect(this.t[i].x * tileSize, this.t[i].y * tileSize, tileSize, tileSize);
        }
        // draw snakes head in a different color
        fill("red");
        rect();

        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        const x = 64
        push();
            translate( this.t[0].x * tileSize + tileSize/2, this.t[0].y * tileSize + tileSize/2);
            rotate(-Math.atan2(this.dir.x, this.dir.y));
            ctx.drawImage(images.sprite, x*4, x*1, x, x, -tileSize/2, -tileSize/2, tileSize, tileSize);
        pop();
    }

    setDir(v) {
        // check if direction changed in last frame
        // check to not be able to change direction 180 degrees. only 90 degree turns
        if (!this.dirChanged && !this.dir.equals(v.copy().mul(-1))) {
            this.dir = v;
            this.dirChanged = true;
        }
    }

    update() {
        // dont update if snake dead or puased
        if (this.dead || this.paused) {
            return;
        }
        // update snake positions interating from the back
        for (let i = this.t.length - 1; i > 0; i--) {
            this.t[i] = this.t[i - 1].copy();
        }
        // update snakes head using the dir vector
        this.t[0].add(this.dir);
        // allow direction change again
        this.dirChanged = false;

        // wrap around the screen
        if (this.t[0].x >= COLS) {
            this.t[0].x = 0;
        } else if (this.t[0].y >= ROWS) {
            this.t[0].y = 0;
        } else if (this.t[0].x < 0) {
            this.t[0].x = COLS;
        } else if (this.t[0].y < 0) {
            this.t[0].y = ROWS;
        }

        this.checkDead();

        // console.log(this.t);
    }

    eats(food) {
        if (this.t[0].equals(food)) {
            this.grow();
            return true;
        }
        return false;
    }

    checkDead() {
        for (let i = 1; i < this.t.length; i++) {
            if (this.t[0].equals(this.t[i])) {
                this.dead = true;
                this.reset();
                break;
            }    
        }
    }

    grow() {
        // add a copy of the last element to this.t array
        this.t.push(this.t.last().copy());

        if (this.score() > this.highscore) {
            this.highscore = this.score();
            localStorage.setItem("highscore", this.highscore);
        }

        $("#score").html(this.score());
    }
    
    score() {
        return this.t.length - INITIAL_SNAKE_LENGTH;
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
    }

    pauseUnpause() {
        this.paused = !this.paused;
    }
}