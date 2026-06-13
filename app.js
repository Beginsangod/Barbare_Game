const GRAVITY = 2;
const AREA1 = "assets/area1.jpeg";
const AREA2 = "assets/area2.jpeg";
const AREA3 = "assets/area3.jpeg";

const gameArea = document.querySelector("#gameArea");

let gameState = {
    score : 0,
    level : 1,
    gameRunning : true,
    keys : {}  
}

let AreaList = [
    AREA1,
    AREA2,
    AREA3
]

let gameObjects = {
    platforms : [],
    ennemy : [],
    bonus : [],
}

let selectedArea = 2;

function Level_Editor(area) {
    gameArea.style.background = `url(${AreaList[area]})`;
    if (area == 1 || area == 2) {

    } else if (area == 0) {
        
    }
}
Level_Editor(selectedArea);