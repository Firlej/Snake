let snake;

let food;

function setup(callback) {

    snake = new Snake();

    food = vec(
        floor(random(0, COLS)),
        floor(random(0, ROWS))
    );

    callback();
}

function draw() {
    background(rgb(0, 50, 150));

    snake.update();
    if (snake.eats(food)) {
        food = vec(
            floor(random(0, COLS)),
            floor(random(0, ROWS))
        );
    }

    snake.draw();

    fill(rgb(250, 100, 100));
    foodSize = tileSize * 0.6;
    rect(food.x * tileSize + (tileSize - foodSize) / 2, food.y * tileSize + (tileSize - foodSize) / 2, foodSize, foodSize);
}

function keyDown(key) {
    // console.log(key);

    switch (key) {
        case "ArrowUp":
            snake.setDir(vec(0, -1));
            break;
        case "ArrowLeft":
            snake.setDir(vec(-1, 0));
            break;
        case "ArrowDown":
            snake.setDir(vec(0, 1));
            break;
        case "ArrowRight":
            snake.setDir(vec(1, 0));
            break;
        default:
            break;
    }
}

function windowResized() {
    let widthToHeight = 16 / 10;

    let gameArea = document.getElementById('gameArea');

    let newWidth = windowWidth;
    let newHeight = windowHeight;
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

    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';

    resizeCanvas($('#gameArea').width(), $('#gameArea').height());

    resizeCanvas($('#gameArea').width(), $('#gameArea').height());

    setVariables();
}