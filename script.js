var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 800;
c.fillStyle = 'red';
var x = 500;
var y = 100;
var dx = 0;
var dy = 0;
var size = 30;
var run = false;
var dir;
var jump;
var maxSpeed = 12;
var collide;
var mapX = 0;
var mapY = 0;
var coins = 0;

var textcoins = document.getElementById('Coins');
textcoins.textContent = coins;
function player() {
    c.fillStyle = 'orange';
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
        var over = document.getElementById('Over');
        over.style.display = 'none';
        canvas.style.transition = '0.1s';
        canvas.style.backgroundColor = 'rgb(213, 236, 255)';
        resetMap();
        run = false;
        x = 500;
        y = 100;
        dx = 0;
        dy = 0;
        size = 30;
        dir = null;
        jump = false;
        l = false;
        r = false;
        mapX = 0;
        mapY = 0;
        coins = 0;
        textcoins.textContent = coins;
        reset.textContent = 'Play!';
    }
}
function resetMap(){
    gameMap = [
        0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,
        0,4,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1,1,0,0,0,3,0,0,0,0,
        0,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1,1,1,0,0,3,0,0,0,0,
        0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,3,1,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
        0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,3,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,
        0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1,3,0,0,0,1,0,0,0,0,0,
        0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,
        0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ]
}
resetMap();
map();
player();
var collition;
function map() {
    let gx = 0;
    let gy = 0;
    collition = [];
    collition2 = [];
    for (let i = 1; i < gameMap.length + 1; i++) {
        if (gameMap[i - 1] == 3){
            c.fillStyle = 'yellow';
            //c.arc(gx * 67, gx * 67, 67/2, 0, 2 * Math.PI);
            //c.arc(x,y,r,sAngle,eAngle,counterclockwise);
            c.beginPath();
            c.arc(gx * 67 + mapX+ 33.5, gy * 67+ 33.5 + mapY, 20/2, 0, 2 * Math.PI);
            c.fill();
            c.stroke();
            //c.fillRect(gx * 67 + mapX ,gy * 67, 68, 68)
            collition2.push({x: gx * 67 + 33.5 + mapX , y: gy * 67 + 33.5 + mapY});
        }
        if (gameMap[i - 1] == 2){
            c.fillStyle = 'red';
            c.fillRect(gx * 67 + mapX,gy * 67 + mapY, 68, 68)
            collition.push({x: gx * 67 + 33.5 + mapX, y: gy * 67 + 33.5 + mapY});
        }
        if (gameMap[i - 1] == 1){
            c.fillStyle = 'green';
            c.fillRect(gx * 67 + mapX, gy * 67 + mapY, 68, 68)
            collition.push({x: gx * 67 + 33.5 + mapX, y: gy * 67 + 33.5 + mapY});
        }
        if (i % (gameMap.length / 12) == 0 && i != 0) {
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
let m;
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (run)
        requestAnimationFrame(animate)
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
    if (collide == 'l' && dir == 'r'){
        maxSpeed = 15;// changed here
        collide = null;
    } else if (collide == 'r' && dir == 'l'){
        maxSpeed = 15;// changed here
        collide = null;
    } else if ((collide == 'd' || collide == 'u') && dy != -0.2)
        collide = null;
    else if (!a) {
        collide = null;
    }
    a = false;
    //console.log(x,y)
    for (let i = 0; i < collition2.length; i++) {
        m = 10 + size / 2;
        const xy = collition2[i];
        let disX = xy.x - x - size / 2;
        let disY = xy.y - y - size / 2;
        if(Math.abs(disY) < m && Math.abs(disX) < m) {
            console.log('coin')
            let a = -1;
            for (let z = 0; z < gameMap.length; z++){
                if (gameMap[z] == 3) {
                    a+=1;
                }
                if (a == i) {
                    gameMap[z] = 0;
                    break;
                }
            }
            coins +=1;
            textcoins.textContent = coins;
        }
    }
    for (let i = 0; i < collition.length; i++) {
        m = 33.5 + size / 2;
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
                if (collide == 'l' || collide == 'dl'){
                    //maxSpeed = 10;  // changed here
                    collide = 'dl';
                }else if (collide == 'r'|| collide == 'dr'){
                    //maxSpeed = 10;// changed heres
                    collide = 'dr';
                }else 
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
    if (mapY < -150) {
        var over = document.getElementById('Over');
        var body = $('body');
        const width = body.width();
        over.style.marginLeft = `${width / 2 - 202}px`;
        canvas.style.backgroundColor = 'black';
        canvas.style.transition = '2s';
        over.style.display = 'block';
        if (mapY < -4200) {
            canvas.style.transition = '0.1s';
            canvas.style.backgroundColor = 'rgb(213, 236, 255)';
            reset();
        }
    }
    console.log(mapY)

    if (jump == true) {
        if (collide == 'd') {
            //maxSpeed = 15;// changed here
            dy = 8;
            collide = null;
        } else if (collide == 'r') {
            //maxSpeed = 15;// changed here
            dy = 8;
            dx = 8;
            collide = null;
        } else if (collide == 'l') {
            //maxSpeed = 15;// changed here
            dy = 8;
            dx = -8;
            collide = null;
        } else if (collide == 'dl') {
            //maxSpeed = 10;// changed here
            dy = 8;
            collide = 'l';
        } else if (collide == 'dr') {
            //maxSpeed = 10;// changed here
            dy = 8;
            collide = 'r';
        }
        jump = false;
    }
    //console.log(maxSpeed)// changed here
    if (dy < -maxSpeed)
        dy = -maxSpeed;
    if (dx > maxSpeed)
        dx = maxSpeed;
    if (dx < -maxSpeed)
        dx = -maxSpeed;
    map();
    player();
    
    //console.log(mapX)
    if ((x < 400 && dx > 0) || (x > 600 && dx < 0))
        mapX += dx;
    else
        x -= dx;
    if ((y < 200 && dy > 0) || (y > 600 && dy < 0))
        mapY += dy;
    else
        y -= dy;
}
