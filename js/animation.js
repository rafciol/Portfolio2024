const canvas = document.getElementById('canvas');
const cx = canvas.getContext('2d');

const increment = 12345;
const multiplier = 11234611;
const modulus = Math.floor(Math.pow(2, 31));

let stepX = 32
    , stepY = 32
    , sizeX = 1
    , sizeY = 1
    , marginTop = 0
    , marginBottom = 0
    , marginLeft = 0
    , marginRight = 0;

let frameID;

function lcg(x, c = increment, a = multiplier, m = modulus) {
    return (a * x + c) % m;
}

function createRandom(initialSeed = 0) {
    let seed = initialSeed;
    return {
        reset(newSeed) {
            seed = newSeed;
        },
        get() {
            seed = lcg(seed);
            return seed / modulus;
        }
    }
}

const random = createRandom();

function frame(frameTime) {
    cx.clearRect(0,0,cx.canvas.width,cx.canvas.height);
    for (let y = marginTop; y < cx.canvas.height - marginBottom; y += stepY) {
        random.reset(y);
        for (let x = marginLeft; x < cx.canvas.width - marginRight; x += stepX) {
            const randomValue = random.get();
            const distX = randomValue * 16;
            const distY = randomValue * 16;
            const phase = randomValue * Math.PI * 2;
            cx.fillStyle = '#1e1e1e'
            cx.fillRect(
                x,
                y,
                sizeX + Math.sin(phase + frameTime / 1000) * distX,
                sizeY + Math.cos(phase + frameTime / 1000) * distY
            )
        }
    }
    frameID = window.requestAnimationFrame(frame);
}

function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

function start() {
    window.addEventListener('resize', resize);
    window.dispatchEvent(new Event('resize'));

    frameID = window.requestAnimationFrame(frame);
}

start();