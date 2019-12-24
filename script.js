const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const circle = function(x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, fillCircle);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

const Ball = function() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.speed = 1;
};
Ball.prototype.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x <= 0 || this.x >= width) {
        this.xSpeed = -this.xSpeed;
    } else if (this.y <= 0 || this.y >= height) {
        this.ySpeed = -this.ySpeed;
    }
};
Ball.prototype.draw = function() {
    circle(this.x, this.y, 10, true);
};
Ball.prototype.setDirection = function(direction) {
    if (direction === 'up') {
        this.xSpeed = 0;
        this.ySpeed = -this.speed;
    } else if (direction === 'down') {
        this.xSpeed = 0;
        this.ySpeed = this.speed;
    } else if (direction === 'left') {
        this.xSpeed = -this.speed;
        this.ySpeed = 0;
    } else if (direction === 'right') {
        this.xSpeed = this.speed;
        this.ySpeed = 0;
    } else if (direction === 'stop') {
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
};
Ball.prototype.setSpeed = function(newSpeed) {
    if (newSpeed > 0 && newSpeed < 10) {
        this.speed = newSpeed;
    }
};

const ball = new Ball();

const keyActions = {
    32: 'stop',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
};

const speeds = {
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
};

$('body').keydown(function(event) {
    const direction = keyActions[event.keyCode];
    const newSpeed = speeds[event.keyCode];
    ball.setDirection(direction);
    ball.setSpeed(newSpeed);
});

setInterval(function() {
    ctx.clearRect(0, 0, width, width);
    ball.draw();
    ball.move();
    ctx.strokeRect(0, 0, width, height);
}, 30);