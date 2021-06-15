let canvas, ctx;

let keyCode;

let width, height;
let windowWidth, windowHeight;

const KEY = {
    SPACE: 32,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    W: 119,
    A: 97,
    S: 115,
    D: 100
};

function setup() {}

window.onload = () => {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addEventListeners();

    setLibValues();
    windowResized();

    setup(() => {
        draw();
        setInterval(() => {
            draw();
        }, 1000 / 10);
    });
}

function setLibValues() {
    width = canvas.width;
    height = canvas.height;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

// IMAGES

let images = [];

function imagesLoaded() {}

function loadImages(sources) {
    let numImages = 0;
    for (src in sources) {
        numImages++;
    }
    let loadedImages = 0;
    for (src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            loadedImages++;
            if (loadedImages == numImages) {
                //console.log("Images loaded!");
                imagesLoaded();
            }
        };
        images[src].src = sources[src];
    }
}

// RESIZE CAVAS

function resizeCanvas(width, height) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    canvas.width = width;
    canvas.height = height;

    setLibValues();
}

// RGB STRINGS

function rgb(r, g, b) {
    return rgba(r, g, b, 1);
}

function rgba(r, g, b, a = 1) {
    return "rgba(" + floor(r) + ", " + floor(g) + ", " + floor(b) + ", " + a + ")";
}

// DRAWING FUNCTIONS

function background(color) {
    fill(color);
    rect(0, 0, canvas.width, canvas.height);
}

function fill(color) {
    ctx.fillStyle = color;
}
function noFill() {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
}

function rect(x, y, width, height) {
    ctx.fillRect(x, y, width, height);
}

// MATH FUNCTIONS ALIASES

function pow(a, b) {
    return Math.pow(a, b);
}

function sqrt(a) {
    return Math.sqrt(a);
}

function floor(a) {
    return Math.floor(a);
}

function ceil(a) {
    return Math.ceil(a);
}

function round(a) {
    return Math.round(a);
}

function abs(a) {
    return Math.abs(a);
}

function random(a, b) {
    return Math.random() * (b - a) + a;
}

function min(a, b) {
    return a < b ? a : b;
}

function max(a, b) {
    return a > b ? a : b;
}

// ARRAY PROTOTYPES

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}
Array.prototype.first = function () {
    return this[0];
}
Array.prototype.last = function () {
    return this[this.length - 1];
}

// EVENT LISTENERS

function keyDown() {}

function windowResized() {}

function addEventListeners() {
    window.addEventListener("keydown", function (evt) {
        keyDown(evt.key);
    });

    window.onresize = function (event) {
        setLibValues();
        windowResized();
    };
}

// VECTOR

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

function vec(x, y) {
    return new Vector(x, y);
}

// TEXT

function font(f) {
    ctx.font = f;
}

function textAlign(a) {
    // start / end / left / center / right
    ctx.textAlign = a;
}

function text(text, x, y) {
    ctx.fillText(text, x, y);
}

// context manipulation

function push() {
    ctx.save()
};

function translate(x, y) {
    ctx.translate(x, y);
}
function rotate(x) {
    ctx.rotate(x);
}

function pop() {
    ctx.restore();
}