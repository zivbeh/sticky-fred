var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 800;
c.fillStyle = 'red';
var x = 100;
var y = 100;
var dx = 0;
var dy = 0;
var size = 30;
var run = false;
var dir;
var jump;
var maxSpeed = 15;
var collide;
function player() {
    c.fillStyle = 'red';
    c.fillRect(x, y, size, size)
}
function reset() {
    var reset = document.getElementById('reset');
    const text = reset.textContent;
    if (text === 'Play!'){
        jump = false;
        run = true;
        animate();
        reset.textContent = 'Reset';
    } else {
        run = false;
        x = 100;
        y = 100;
        dx = 0;
        dy = 0;
        size = 30;
        dir = null;
        jump = false;
        l = false;
        r = false;
        reset.textContent = 'Play!';
    }
}
gameMap = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
    0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,1,1,0,0,0,0,0,0,0, 
    0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,
    0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
    0,0,1,1,0,1,0,0,0,0,0,1,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
map();
player();
var collition;
function map() {
    let gx = 0;
    let gy = 0;
    collition = [];
    for (let i = 1; i < gameMap.length + 1; i++) {
        // if (gameMap[i - 1] == 2){
        //     c.fillStyle = 'green';
        //     c.fillRect(gx * 67,gy * 67, 67, 67)
        //     collition.push({x: gx * 67 + 33.5, y: gy * 67 + 33.5});
        // }
        if (gameMap[i - 1] == 1){
            c.fillStyle = 'green';
            c.fillRect(gx * 67,gy * 67, 67, 67)
            collition.push({x: gx * 67 + 33.5, y: gy * 67 + 33.5});
        }
        if (i % 15 == 0 && i != 0) {
            gx = 0;
            gy++;
        } else {
            gx++;
        }
    }
}
let l = false;
let r = false;
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft") {
        l = true;
        dir = 'l';
    }
    else if (event.key == "ArrowUp" || event.key == "Space")
        jump = true;
    else if (event.key == "ArrowRight") {
        r = true;
        dir = 'r';
    }
    else if (event.key == "ArrowDown")
        jump = false;
    if (event.key == 'r')
        reset();
});
document.addEventListener('keyup', function(event) {
    if (event.key == "ArrowLeft") {
        if (r)
            dir = 'r';
        else
            dir = null;
        l = false;
    }
    else if (event.key == "ArrowRight") {
        if (l)
            dir = 'l';
        else
            dir = null;
        r = false;
    }
});
let a;
let m = 33.5 + size / 2;
function animate() {
    if (run)
        requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    console.log(collide)
    dy -= 0.2;
    if (dir == 'l')
        dx += 0.4;
    else if (dir == 'r')
        dx -= 0.4;
    else if (dx < 0)
        dx += 0.4;
    else if (dx > 0)
        dx -= 0.4;
    if (dx < 0.4 && dx > -0.4)
        dx = 0;
    if (collide == 'l' && dir == 'r')
        collide = null;
    else if (collide == 'r' && dir == 'l')
        collide = null;
    else if ((collide == 'd' || collide == 'u') && dy != -0.2)
        collide = null;
    else if (!a) {
        collide = null;
    }
    a = false;
    for (let i = 0; i < collition.length; i++) {
        const xy = collition[i];
        let disX = xy.x - x - size / 2;
        let disY = xy.y - y - size / 2;
        if(Math.abs(disY) < m && Math.abs(disX) < m) {
            if (disY > 0 && disY > Math.abs(disX)) {
                while (Math.abs(disY) < m) {
                    y -= 0.2
                    disY = xy.y - y - size / 2;
                }
                dy = 0;
                if (collide == 'l' || collide == 'dl')
                    collide = 'dl'
                else if (collide == 'r'|| collide == 'dr')
                    collide = 'dr';
                else 
                    collide = 'd';
            } else if (disY < 0 && -disY > Math.abs(disX)) {
                while (Math.abs(disY) < m) {
                    y += 0.2
                    disY = xy.y - y - size / 2;
                }
                dy = 0;
                collide = 'u';
            } else if (disX > 0 && disY < Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x -= 0.2
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
                collide = 'r';
            } else if (disX < 0 && -disY < Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x += 0.2
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
                collide = 'l';
            } else if (disY > 0 && disY > Math.abs(disX)) {
                while (Math.abs(disX) < m) {
                    x += 0.2
                    disX = xy.x - x - size / 2;
                }
                dx = 0;
                collide = 'l';
            }
        }
        if(Math.abs(disY) < m + 1 && Math.abs(disX) < m + 1)
            a = true;
    }
    if (jump == true) {
        if (collide == 'd') {
            dy = 8;
            collide = null;
        } else if (collide == 'r') {
            dy = 8;
            dx = 8;
            collide = null;
        } else if (collide == 'l') {
            dy = 8;
            dx = -8;
            collide = null;
        } else if (collide == 'dl') {
            dy = 8;
            collide = 'l';
        } else if (collide == 'dr') {
            dy = 8;
            collide = 'r';
        }
        jump = false;
    }
    if (dy < -maxSpeed)
        dy = -maxSpeed;
    if (dx > maxSpeed)
        dx = maxSpeed;
    if (dx < -maxSpeed)
        dx = -maxSpeed;
    map();
    player();
    x -= dx;
    y -= dy;
}
