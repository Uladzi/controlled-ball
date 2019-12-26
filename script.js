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
    this.size = 10;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.speed = 1;
};
Ball.prototype.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
        this.xSpeed = -this.xSpeed;
    } else if (this.y < 0 || this.y > height) {
        this.ySpeed = -this.ySpeed;
    }
};
Ball.prototype.draw = function() {
    circle(this.x, this.y, this.size, true);
};
Ball.prototype.doAction = function(action) {
    if (action === 'up') {
        this.xSpeed = 0;
        this.ySpeed = -this.speed;
    } else if (action === 'down') {
        this.xSpeed = 0;
        this.ySpeed = this.speed;
    } else if (action === 'left') {
        this.xSpeed = -this.speed;
        this.ySpeed = 0;
    } else if (action === 'right') {
        this.xSpeed = this.speed;
        this.ySpeed = 0;
    } else if (action === 'stop') {
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
    if (action > 0 && action < 10) {
        this.speed = action;
    } else if (action === 'slower') {
        if (this.speed > 0) {
            this.speed--;
        }
    } else if (action === 'faster') {
        this.speed++;
    } else if (this.speed < 0) {
        this.speed = 0;
    } else if (action === 'larger') {
        this.size++;
    } else if (action === 'smaller') {
        if (this.size > 0) {
            this.size--;
        }
    }
};

const ball = new Ball();

const keyActions = {
    32: 'stop',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    67: 'smaller',
    86: 'larger',
    88: 'faster',
    90: 'slower',
};


$('body').keydown(function(event) {
    const action = keyActions[event.keyCode];
    ball.doAction(action);
});

setInterval(function() {
    ctx.clearRect(0, 0, width, width);
    ball.draw();
    ball.move();
    ctx.strokeRect(0, 0, width, height);
}, 30);