const INITIAL_SNAKE_LENGTH = 3;

class Snake {
    constructor() {
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
            console.log(this.t[i].x * tileSize, this.t[i].y * tileSize, tileSize, tileSize);
        }
        console.log(this.t);
    }

    draw() {
        fill("lime");
        for (let i = 0; i < this.t.length; i++) {
            rect(this.t[i].x * tileSize, this.t[i].y * tileSize, tileSize, tileSize);
        }
        // draw snakes head in a different color
        fill("red");
        rect(this.t[0].x * tileSize, this.t[0].y * tileSize, tileSize, tileSize);
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
        // dont update if snake dead
        if (this.dead) {
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
                break;
            }    
        }
    }

    grow() {
        // add a copy of the last element to this.t array
        this.t.push(this.t.last().copy());
    }
}