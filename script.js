//Game settings

// speed of different objects
var enemySpeed = 1, missileSpeed = 3, gameSpeed = 10;
setInterval(gameLoop, gameSpeed);

//score and points
var score = 0;
var crash = -1;
var shoot = 10;

//world's dimension
var world = {
    width: 900,
    height: 600
}

//hero position
var hero = {
    x: 200,
    y: 500
};

var missiles = [];

//enemies 
var enemies = [
    {x: 50, y: 100},
    {x: 120, y: 150},
    {x: 190, y: 85},
    {x: 260, y: 150},
    {x: 330, y: 120},
    {x: 400, y: 100},
    {x: 470, y: 150}
];

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayWorld(){
    document.getElementById("container").style.height = world.height + "px";
    document.getElementById("container").style.width = world.width + "px";
}
displayWorld();

function displayHero(){
    document.getElementById("hero").style.left = hero.x + "px";
    document.getElementById("hero").style.top = hero.y + "px";
}

function displayMissiles(){
    content = "";
    for(missile of missiles){
        content += "<div class='missile' style='left:"+missile.x+"px; top:"
                    +missile.y+"px'></div>";
        document.getElementById("missiles").innerHTML = content;
    }
}

function moveMissiles(){
    for(var i=0; i<missiles.length; i++){
        missiles[i].y -= missileSpeed;
        if(missiles[i].y<-25){
            missiles.shift();
        }
    }
}

var numEnemies1 = randInt(1, enemies.length);
function displayEnemies(){
    content = "";
    //Enemy type 1
    for(var i=0; i<numEnemies1; i++){
        content += "<div class='enemy1' style='left:"+enemies[i].x+"px; top:"
        +enemies[i].y+"px'></div>";
        document.getElementById("enemies").innerHTML = content;
    }

    //Enemy type 2
    for(var i=numEnemies1; i<enemies.length; i++){
        content += "<div class='enemy2' style='left:"+enemies[i].x+"px; top:"
        +enemies[i].y+"px'></div>";
        document.getElementById("enemies").innerHTML = content;
    }
}

function moveEnemies() {
    for(enemy of enemies){
        enemy.y += enemySpeed;
        if(enemy.y+10 > world.height){
            enemy.y = 0;
            enemy.x = randInt(50, world.width-50);
        }
    }
}

function airplanesCollision() {
    for(enemy of enemies){
        if(Math.abs(enemy.x - hero.x) < 20 && Math.abs(enemy.y - hero.y) < 20){
            score += crash;
        }
    }
}

function displayScore() {
    document.getElementById("score").innerHTML = score;
}

function gameLoop(){
    displayHero();
    
    moveMissiles();
    displayMissiles();

    moveEnemies();
    displayEnemies();

    airplanesCollision() 
    
    displayScore();
}

function keyDown(e){
    //Left movement
    if(e.code === "ArrowLeft" || e.code == "KeyA") {
        hero.x -=10;
    }
    //Right movement
    else if(e.code === "ArrowRight" || e.code == "KeyD" ) {
        hero.x +=10;
    }
    //Up movement
    else if(e.code === "ArrowUp"  || e.code == "KeyW") {
        hero.y -=10;
    }
    //Down movement
    else if(e.code === "ArrowDown"  || e.code == "KeyS") {
        hero.y +=10;
    }
    else if(e.code === "Space"){
        missiles.push({x: (hero.x+5), y: (hero.y-8)});
        displayMissiles();
    }
    
    displayHero();
}

document.addEventListener("keydown", keyDown);
