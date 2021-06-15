let snake;

let food;

let frameCount = 0;
let frameRate = 0;

sources = {
	sprite: 'https://rembound.com/files/creating-a-snake-game-tutorial-with-html5/snake-graphics.png'
}

function imagesLoaded() {
	$("#startScreen").fadeIn('slow');
}

function setup(callback) {
	loadImages(sources);

    snake = new Snake();

    food = vec(
        floor(random(0, COLS)),
        floor(random(0, ROWS))
    );

    callback();

    // DEBUG
    
    setInterval(function(){
		// console.log(frameCount);
        frameRate = frameCount;
        frameCount = 0;
	}, 1000);
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

    // draw food
    fill(rgb(250, 100, 100));
    foodSize = tileSize * 0.6;
    rect(food.x * tileSize + (tileSize - foodSize) / 2, food.y * tileSize + (tileSize - foodSize) / 2, foodSize, foodSize);

    // draw highscore
    font(floor(height * 0.1) + "px Arial");
    fill("red");
    textAlign("center");
    text(snake.highscore, width/2, 0.1 * height);

    // DEBUG
    frameCount++;
    font(floor(height * 0.1) + "px Arial");
    fill("red");
    textAlign("end");
    text(frameRate, width * 0.99, 0.1 * height);

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
        case " ":
            snake.pauseUnpause();
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
    ctx.imageSmoothingEnabled = false;
}