let canvas, ctx;

let s;
let food;

const COLS = 16;
const ROWS = 10;
const TS = 320 / 16; // tile size


let sources = {
    sprite: 'snake.png', // https://rembound.com/files/creating-a-snake-game-tutorial-with-html5/snake-graphics.png
}
let images = {}

let loadedImages = 0;
for (src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
        loadedImages++;
        if (loadedImages == Object.keys(sources).length) {
            imagesLoaded();
        }
    };
    images[src].src = sources[src];
}

function imagesLoaded() {
    console.info("Images loaded!");
    $("#startScreen").fadeIn('slow');
}

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    windowResized();

    s = new Snake(vec(
        Math.floor(Math.random() * COLS),
        Math.floor(Math.random() * ROWS)
    ));

    food = vec(
        Math.floor(Math.random() * COLS),
        Math.floor(Math.random() * ROWS)
    );

    setInterval(loop, 1000/10);
}

function loop() {    
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(50,50,150";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    s.update();
    s.draw();

    if (s.eats(food)) {
        food = vec(
            Math.floor(Math.random() * COLS),
            Math.floor(Math.random() * ROWS)
        );
    }

    // draw food
    ctx.fillStyle = "rgb(250, 100, 100)";
    ctx.fillRect(food.x * TS, food.y * TS, TS, TS);

    // draw score
    ctx.font = Math.floor(canvas.height * 0.1) + "px Arial";
    ctx.fillStyle = "purple";
    ctx.textAlign = "center";
    ctx.fillText(s.score(), canvas.width/2, 0.1 * canvas.height);
}

window.addEventListener("keydown", (event) => {
    // console.log(event);
    // console.log(event.key);
    switch (event.key) {
        case "ArrowUp":
            s.dir = vec(0, -1);
            break;
        case "ArrowLeft":
            s.dir = vec(-1, 0);
            break;
        case "ArrowDown":
            s.dir = vec(0, 1);
            break;
        case "ArrowRight":
            s.dir = vec(1, 0);
            break;
        default:
            break;
    }
});



window.onresize = windowResized;

function windowResized() {

    let gameArea = document.getElementById('gameArea');

    let widthToHeight = COLS / ROWS;

    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        // window width is too wide relative to desired game width
        newWidth = newHeight * widthToHeight;
    } else {
        // window height is too high relative to desired game height
        newHeight = newWidth / widthToHeight;
    }

    gameArea.style.height = newHeight + 'px';
    gameArea.style.width = newWidth + 'px';
}