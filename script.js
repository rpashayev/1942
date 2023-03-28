//Game settings

//audio
var audio = new Audio("snd/explosion.wav");

var bestScore;

// speed of different objects
var enemySpeed = 1, missileSpeed = 3, gameSpeed = 10;
setInterval(gameLoop, gameSpeed);


//remove explosion
setInterval(removeExplosion, 2000);

var explosionClass = document.getElementsByClassName("explosion");

//score and points
var score = 0;
var crash = -1;
var shoot = 100;
var pass = -10;

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
var missileClass = document.getElementsByClassName("missile");

var explosions = [];

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

numOfEnemyType = 2;


function gameSettings() {
    numOfEnemies = document.querySelector("#numOfEnemies").value;
    world.height = document.querySelector("#worldHeight").value;
    world.width = document.querySelector("#worldWidth").value;
}



function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayWorld(){
    document.getElementById("world").style.height = world.height + "px";
    document.getElementById("world").style.width = world.width + "px";
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

function randomEnemies(){
    for(var i=0; i<enemies.length; i++){
        var enemyType = randInt(1, numOfEnemyType);
        enemies[i].type = "enemy"+enemyType;
    }
}
randomEnemies();


function displayEnemies(){
    content = "";
    for(var i=0; i<enemies.length; i++){
        content += "<div class='"+enemies[i].type+"' id='enemy"+i+"' style='left:"+enemies[i].x+"px; top:"
        +enemies[i].y+"px'></div>";
        document.getElementById("enemies").innerHTML = content;
    }
}

function moveEnemies() {
    for(enemy of enemies){
        enemy.y += enemySpeed;
        if(enemy.y+20 > world.height){
            enemy.y = 0;
            enemy.x = randInt(50, world.width-50);
            score += pass;
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

function bulletCollision() {
    for(enemy of enemies){
        for(missile of missiles){
            if(Math.abs(enemy.x - missile.x) < 16 && Math.abs(enemy.y - missile.y) < 5){
                audio.play();
                score += shoot;
                explosions.push({x: enemy.x, y: (enemy.y)});
                enemies.splice(enemies.indexOf(enemy), 1);
            
                if (enemies.length == 0){
                    endGame();
                }

                missiles.pop();
                missileClass[0].remove();
            }
        }
    }
}

function displayExplosion() {
    content = "";
    for(var i=0; i<explosions.length;i++){
        content += "<div class='explosion' style='left:"+explosions[i].x+"px; top:"+explosions[i].y+"px'></div>";
        document.getElementById("explosions").innerHTML = content;
    }
    
}

function removeExplosion(){
    explosions.shift();
    if (explosionClass.length > 0){
        explosionClass[0].remove();
    }
    displayExplosion();
}

function displayScore() {
    document.getElementById("score").innerHTML = score;
}

function endGame() {
    document.querySelector("#enemy0").remove();
    document.querySelector("#finalText").innerText = "ALL ENEMIES DESTROYED";
    if(bestScore == null){
        bestScore = score;
    }
    else if(score > bestScore) {
        bestScore = score;
    }
    document.querySelector("#bestScore").innerText = bestScore;

}

function gameLoop(){
    displayHero();
    
    moveMissiles();
    displayMissiles();

    moveEnemies();
    displayEnemies();

    airplanesCollision() 
    bulletCollision();

    displayExplosion();

    displayScore();
}

function keyDown(e){
    //Left movement
    if(e.code === "ArrowLeft" || e.code == "KeyA") {
        if(hero.x > 10){
        hero.x -=10;
        }
    }
    //Right movement
    else if(e.code === "ArrowRight" || e.code == "KeyD" ) {
        if(hero.x < world.width-30){
            hero.x +=10;
        }
    }
    //Up movement
    else if(e.code === "ArrowUp"  || e.code == "KeyW") {
        if(hero.y > world.height * 2 / 3){
            hero.y -=10;
        }
    }
    //Down movement
    else if(e.code === "ArrowDown"  || e.code == "KeyS") {
        if(hero.y < world.height-30){
            hero.y +=10;
        }
    }
    else if(e.code === "Space"){
        missiles.push({x: (hero.x+5), y: (hero.y-8)});
        displayMissiles();
    }
    
    displayHero();
}

document.addEventListener("keydown", keyDown);