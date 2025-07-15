const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 375;
const CANVAS_HEIGHT = 370;
const SCALE = 2;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

canvas.style.width = `${CANVAS_WIDTH * SCALE}px`;
canvas.style.height = `${CANVAS_HEIGHT * SCALE}px`;

function drawLoadingScreen(progress, total) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    ctx.font = '30px pixelPurl';
    ctx.textAlign = 'center';
    ctx.fillText(`Loading Images... ${progress}/${total}`, canvas.width / 2, canvas.height / 2);
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width/2 - total/2*3, canvas.height/2 + 30, progress *3, 25)
    ctx.strokeRect(canvas.width/2 - total*3/2, canvas.height/2 + 30, total *3, 25)
    
    ctx.fillStyle = 'white';
    ctx.font = '30px pixelPurl';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round((progress / total) * 100)}%`, canvas.width / 2, canvas.height / 2 + 50);
}

function drawLoadingScreenAudio(progressB, totalB) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    ctx.font = '30px pixelPurl';
    ctx.textAlign = 'center';
    ctx.fillText(`Loading Audio... ${progressB}/${totalB}`, canvas.width / 2, canvas.height / 2);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width/2 - totalB/2*5, canvas.height/2 + 30, progressB *5, 25)
    ctx.strokeRect(canvas.width/2 - totalB*5/2, canvas.height/2 + 30, totalB *5, 25)
    
    ctx.fillStyle = 'white';
    ctx.font = '30px pixelPurl';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round((progressB / totalB) * 100)}%`, canvas.width / 2, canvas.height / 2 + 50);
}


const images = {
    run_r: 'https://raw.githubusercontent.com/Swillycoder/tang/main/run_r.png',
    run_l: 'https://raw.githubusercontent.com/Swillycoder/tang/main/run_l.png',
    stand_r: 'https://raw.githubusercontent.com/Swillycoder/tang/main/stand_r.png',
    stand_l: 'https://raw.githubusercontent.com/Swillycoder/tang/main/stand_l.png',
    intro: 'https://raw.githubusercontent.com/Swillycoder/tang/main/introsml.png',
    platform_img: 'https://raw.githubusercontent.com/Swillycoder/tang/main/girder.png',
    ladder: 'https://raw.githubusercontent.com/Swillycoder/tang/main/ladder50px.png',
    climbLadder: 'https://raw.githubusercontent.com/Swillycoder/tang/main/climb.png',
    climbStop: 'https://raw.githubusercontent.com/Swillycoder/tang/main/climbstop.png',
    orange: 'https://raw.githubusercontent.com/Swillycoder/tang/main/tangpacketsml.png',
    tangGlass: 'https://raw.githubusercontent.com/Swillycoder/tang/main/emptyglasssml.png',
    tangLogo: 'https://raw.githubusercontent.com/Swillycoder/tang/main/tanglogosml.png',
    will_img: 'https://raw.githubusercontent.com/Swillycoder/tang/main/willanim2.png',
    ham_img: 'https://raw.githubusercontent.com/Swillycoder/tang/main/hamanim.png',
    buzz_img: 'https://raw.githubusercontent.com/Swillycoder/tang/main/buzzanim.png',
    preintro1: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintroimg1.png',
    preintro2: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintroimg2.png',
    preintro3: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintroimg3.png',
    preintrotxt1: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintrotxt1.png',
    preintrotxt1a: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintrotxt1a.png',
    preintrotxt1b: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintrotxt1b.png',
    preintrotxt2: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintrotxt2.png',
    preintrotxt2a: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintrotxt2a.png',
    preintrotxt2b: 'https://raw.githubusercontent.com/Swillycoder/tang/main/preintrotxt2b.png',
    img1Lvl1: 'https://raw.githubusercontent.com/Swillycoder/tang/main/level1Img1.png',
    img2Lvl1: 'https://raw.githubusercontent.com/Swillycoder/tang/main/level1Img2.png',
    img3Lvl1: 'https://raw.githubusercontent.com/Swillycoder/tang/main/level1Img3.png',
    img1Lvl2: 'https://raw.githubusercontent.com/Swillycoder/tang/main/level2Img1.png',
    img2Lvl2: 'https://raw.githubusercontent.com/Swillycoder/tang/main/level2Img2.png',
    img3Lvl2: 'https://raw.githubusercontent.com/Swillycoder/tang/main/level2Img3.png',
    imgWin1: 'https://raw.githubusercontent.com/Swillycoder/tang/main/win1.png',
    imgWin2: 'https://raw.githubusercontent.com/Swillycoder/tang/main/win2.png',
    imgWin3: 'https://raw.githubusercontent.com/Swillycoder/tang/main/win3.png',
    imgWin4: 'https://raw.githubusercontent.com/Swillycoder/tang/main/win4.png',
    imgWin5: 'https://raw.githubusercontent.com/Swillycoder/tang/main/win5.png',
    gameover_img: 'https://raw.githubusercontent.com/Swillycoder/tang/main/gameover.png',
    monkeyNut_img:'https://raw.githubusercontent.com/Swillycoder/tang/main/monkeynutanim.png',
    barrel_img:'https://raw.githubusercontent.com/Swillycoder/tang/main/barrelanim.png',
};


const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
};

async function loadAllImages(imageSources) {
    const loadedImages = {};
    const total = Object.keys(imageSources).length;
    let progress = 0;

    for (const [key, src] of Object.entries(imageSources)) {
        try {
            loadedImages[key] = await loadImage(src);
            progress++;
            console.log(`${key} loaded successfully`);
            drawLoadingScreen(progress, total);
        } catch (error) {
            console.error(error);
        }
    }
    return loadedImages;
}

const audiofiles = {
    intromusic: 'https://raw.githubusercontent.com/Swillycoder/tang/main/intro.mp3',
    bossmusic: 'https://raw.githubusercontent.com/Swillycoder/tang/main/boss.mp3',
    spacemusic: 'https://raw.githubusercontent.com/Swillycoder/tang/main/space.mp3',
    sfx_jump: 'https://raw.githubusercontent.com/Swillycoder/tang/main/jump.ogg',
    sfx_collect: 'https://raw.githubusercontent.com/Swillycoder/tang/main/collect.ogg',
    sfx_water: 'https://raw.githubusercontent.com/Swillycoder/tang/main/water.ogg',
    voice1: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice1.ogg',
    voice2: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice2.ogg',
    voice3: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice3.ogg',
    voice4: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice4.ogg',
    voice5: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice5.ogg',
    voice6: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice6.ogg',
    voice7: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice7.ogg',
    voice8: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice8.ogg',
    voice9: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice9.ogg',
    voice10: 'https://raw.githubusercontent.com/Swillycoder/tang/main/voice10.ogg',
}

let loadedAudio;

const loadAudio = (src) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = src;
    audio.oncanplaythrough = () => resolve(audio); // Fully buffered enough to play
    audio.onerror = () => reject(new Error(`Failed to load audio: ${src}`));
  });
};

async function loadAllAudio(audioSources) {
    const result = {};
        const totalB = Object.keys(audioSources).length;
        let progressB = 0;
    for (const [key, src] of Object.entries(audioSources)) {
        try {
        result[key] = await loadAudio(src);
        progressB++;
        console.log(`${key} audio loaded`);
        drawLoadingScreenAudio(progressB, totalB);
        } catch (error) {
        console.error(error);
        }
    }
    return result;
}

class Player {
    constructor (x,y, width, height, standR, standL, runR, runL, climb, currentSprite) {
        this.x = x;
        this.y = y;
        this.currentSprite = currentSprite;
        this.width = width;
        this.height = height;
        this.speed = 2;
        this.radius = 18;
        this.frames = 0;
        this.frameDelay = 10;
        this.frameTimer = 0;
        this.standL = standL;
        this.standR = standR;
        this.runL = runL;
        this.runR = runR;
        this.climb = climb;
        this.isJumping = false;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.jumpStrength = -7;
        this.isClimbing = false;
        this.touchingLadder = false;

    }

    boundaries () {
        if (this.x <= 0) this.x = 0;
        if (this.x + this.width >= canvas.width) this.x = canvas.width - this.width;
        if (this.y >= 290) this.y = 290;
    }

    checkLadderCollision(ladders) {
        this.touchingLadder = false;

        for (let ladder of ladders) {
            const withinX = this.x + this.width > ladder.x && this.x < ladder.x + ladder.width;
            const withinY = this.y + this.height > ladder.y && this.y < ladder.y + 34;
            if (withinX && withinY) {
                this.touchingLadder = true;
                break;
            }
        }
    }

    checkCollectibleCollision(collectibles, collectedOrange) {
        for (let i = collectibles.length - 1; i >= 0; i--) {
            const collectible = collectibles[i];
            const withinOX = this.x + this.width > collectible.x && this.x < collectible.x + collectible.width;
            const withinOY = this.y + this.height > collectible.y && this.y < collectible.y + collectible.height;

            if (withinOX && withinOY) {
                collectedOrange.push(collectible);
                collectibles.splice(i, 1);
                loadedAudio.sfx_collect.play();
                holdingOrange = true;
            }
        }
    }

    checkPlatformCollisions(platforms) {
    const foot = {
        x: this.x + this.width / 2,
        y: this.y + this.height
    };

    for (let platform of platforms) {
        const { start, end } = platform.getTopEdge();
        const { distance, closestPoint } = this.pointToLineDistance(foot, start, end);

        const platformWidth = Math.hypot(end.x - start.x, end.y - start.y);

        const onPlatform =
            foot.x >= Math.min(start.x, end.x) - 5 &&
            foot.x <= Math.max(start.x, end.x) + 5;

        if (distance < 5 && foot.y < closestPoint.y + 5 && onPlatform && this.velocityY >= 0) {
            this.y = closestPoint.y - this.height;
            this.velocityY = 0;
            this.isJumping = false;
            break;
        }
    }
}

pointToLineDistance(point, lineStart, lineEnd) {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = lenSq !== 0 ? dot / lenSq : -1;

    let xx, yy;

    if (param < 0) {
        xx = lineStart.x;
        yy = lineStart.y;
    } else if (param > 1) {
        xx = lineEnd.x;
        yy = lineEnd.y;
    } else {
        xx = lineStart.x + param * C;
        yy = lineStart.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return { distance: Math.sqrt(dx * dx + dy * dy), closestPoint: { x: xx, y: yy } };
}

    draw () {
        ctx.drawImage(
            this.currentSprite,
            this.width * this.frames,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
          );
    }
    
    update(platforms, ladders) {

        this.checkLadderCollision(ladders);

        this.isClimbing = false;

        if (this.touchingLadder && (keys.ArrowUp || keys.ArrowDown)) {
            this.isClimbing = true;
            this.gravity = 0;

            if (keys.ArrowUp) {
                this.y -= 2;
                this.currentSprite = this.climb;
            } else if (keys.ArrowDown) {
                this.y += 2;
                this.currentSprite = this.climb;
            } else {
                this.velocityY = 0;
                this.currentSprite = loadedImages.climbStop;
                this.frames = 0;
            }
        }

        if (!this.touchingLadder) {
            this. gravity = 0.5
        }

        if (!this.isClimbing) {
            this.velocityY += this.gravity;
            this.y += this.velocityY;
        }

        if (keys.ArrowLeft) {
            this.x -= this.speed;
            this.currentSprite = this.runL;
        }
        if (keys.ArrowRight) {
            this.x += this.speed;
            this.currentSprite = this.runR;
        }

        if (keys.Space && !this.isJumping && !this.isClimbing) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
            loadedAudio.sfx_jump.play();
        }

        if (this.isClimbing === false) {
            this.checkPlatformCollisions(platforms);
        }

        this.checkCollectibleCollision(collectibles, collectedOrange);
            
        this.boundaries();
        
        this.frameTimer++;
        if (this.frameTimer >= this.frameDelay) {
            this.frames++;
            this.frameTimer = 0;
        }

        if (this.frames >= 3 && (this.currentSprite === this.standR || this.currentSprite === this.standL)) {
            this.frames = 0;
        }

        if (this.frames >= 5 && (this.currentSprite === this.runR || this.currentSprite === this.runL)) {
            this.frames = 0;
        }
        if (this.frames >= 2 && (this.currentSprite === this.climb)) {
            this.frames = 0;
        }
        this.draw();
    }
}

class Ladder {
    constructor(x,y,width, height, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y)
    }
}

class Platform {
    constructor(x,y,width,height,image, rotation) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.rotation = rotation;

    }

    getTopEdge() {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const centerX = this.x + halfWidth;
        const centerY = this.y + halfHeight;

        const cos = Math.cos(this.rotation);
        const sin = Math.sin(this.rotation);

        const rotatePoint = (px, py) => ({
            x: px * cos - py * sin + centerX,
            y: px * sin + py * cos + centerY
        });

        const start = rotatePoint(-halfWidth, -halfHeight);
        const end = rotatePoint(halfWidth, -halfHeight);

        return { start, end };
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);

        ctx.drawImage(
            this.image,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.restore();
    }
        update(){
            this.draw();
        }
    }

class Collectible {
    constructor (x,y,width,height,image, label) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.label = label;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

class TangDrink {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillLevel = 0;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y + this.height, this.width, this.height * -this.fillLevel);
        ctx.drawImage(loadedImages.tangGlass, this.x, this.y);
    }
}

class Enemy {
    constructor(x,y,width,height,image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.frames = 0;
        this.frameDelay = 10;
        this.frameTimer = 0;
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.width * this.frames,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
          );
    }

    update() {
        this.frameTimer++;
        if (this.frameTimer >= this.frameDelay) {
            this.frames++;
            this.frameTimer = 0;
        }

        if (this.frames >= 4) {
            this.frames = 0;
        }

        this.draw();

    }
}

const barrelPath = [
    { x: 50-7, y: 50-7 },
    { x: 100-7, y: 81-7 },
    { x: 350-7, y: 81-7 },
    { x: 350-7, y: 139-7 },
    { x: 310-7, y: 144-7 },
    { x: 80-7, y: 144-7 },
    { x: 30-7, y: 151-7 },
    { x: 30-7, y: 205-7 },
    { x: 350-7, y: 240-7 },
    { x: 350-7, y: 297-7 },
    { x: 150-7, y: 317-7 },
    { x: 0-7, y: 317-7 },
];

class Barrel {
    constructor(width, height,image) {
        this.x = barrelPath[0].x;
        this.y = barrelPath[0].y;
        this.speed = 1;
        this.pathIndex = 1;
        this.radius = 8;
        this.width = width;
        this.height = height;
        this.image = image;
        this.frames = 0;
        this.frameDelay = 10;
        this.frameTimer = 0;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.width * this.frames,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );

    }

    update() {
        this.frameTimer++;
        if (this.frameTimer >= this.frameDelay) {
            this.frames++;
            this.frameTimer = 0;
        }

        if (this.frames >= 4) {
            this.frames = 0;
        }

        if (this.pathIndex >= barrelPath.length){
            return;
            }

        const target = barrelPath[this.pathIndex];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.speed) {
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }

        this.draw();
    }
}

class Nut {
    constructor (x,y, speed, image, width, height) {
        this.x = x;
        this.y = y;
        this.radius = 7;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.image = image;
        this.frames = 0;
        this.frameDelay = 10;
        this.frameTimer = 0;
    }

    draw () {
        ctx.drawImage(
            this.image,
            this.width * this.frames,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    update () {
        this.frameTimer++;
        if (this.frameTimer >= this.frameDelay) {
            this.frames++;
            this.frameTimer = 0;
        }

        if (this.frames >= 4) {
            this.frames = 0;
        }
        this.x += this.speed;

        if (this.speed > 0 && this.x >= canvas.width + 100) {
            this.x = -100;
        }
        if (this.speed < 0 && this.x <= -20) {
            this.x = canvas.width + 100;
        }

        this.draw();
    }
}

class LaserEyes{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.projectiles = [];
        this.lastShotTime = performance.now();
        this.fireRate = 1000;
    }

        shoot(player) { 
        const currentTime = performance.now();
    
        if (currentTime - this.lastShotTime >= this.fireRate) {

            let dx = player.x - this.x;
            let dy = player.y - this.y;
            let magnitude = Math.sqrt(dx * dx + dy * dy);
            let speed = 2;
    
            this.projectiles.push({
                x: this.x,
                y: this.y,
                width: 15,
                height: 4,
                velocityX: (dx / magnitude) * speed,
                velocityY: (dy / magnitude) * speed
            });
    
            this.lastShotTime = currentTime;
        }
    }
    
    draw() {
    for (let i = 0; i < this.projectiles.length; i++) {
        const p = this.projectiles[i];

        const angle = Math.atan2(p.velocityY, p.velocityX);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);

        ctx.fillStyle = 'red';
        ctx.fillRect(0, -p.height / 2, p.width, p.height);

        ctx.restore();

        p.x += p.velocityX;
        p.y += p.velocityY;

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            this.projectiles.splice(i, 1);
            i--;
        }
    }
}
    update(){
        this.shoot(player);
        this.draw();
    }
}

const keys = {
    KeyA: false,
    KeyD: false,
    KeyP: false,
    Space: false,
    Enter: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
};

let score = 0;
let gameState = "startScreen"
let player;
let laserEye;
let platforms = [];
let ladders = [];
let nuts = [];
let collectibles = [];
let collectedOrange = [];
let holdingOrange = false;
let loadedImages;
const tangDrink = new TangDrink(5,262,36,68);
let enemySprite1;
let enemySprite2;
let enemySprite3;
let barrels = [];
let playerHealth = 100
let laserColliding = false;
const mouse = {
    x: 0,
    y: 0,
    isDown: false
};
let mouseClicked = false;
let voicePlayed = false;

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

let currentFrameBarrels = 0;
let frameCounterBarrels = 0;
const frameDelayBarrels = 160; 

function spawnBarrels() {
    frameCounterBarrels++;
    if (frameCounterBarrels >= frameDelayBarrels) {
        barrels.push(new Barrel(15,15,loadedImages.barrel_img));
        frameCounterBarrels = 0;
    }

}

function collideBarrel() {
    for (let i = barrels.length - 1; i >= 0; i--) {
        if (isColliding(player, barrels[i])) {
            barrels.splice(i, 1); // remove barrel
            playerHealth -= 5;
        }
    }
}

function collideNut() {
    for (let nut of nuts) {
        if (isColliding(player, nut)) {
            playerHealth -= 1;
        }
    }
}

function collideLaserEyes() {
    for (let i = 0; i < laserEye.projectiles.length; i++) {
        const laser = laserEye.projectiles[i];

        if (isColliding(player, laser)) {
            laserEye.projectiles.splice(i, 1);
            i--;
            playerHealth -= 6;
        }
    }
}


function collideGlass() {
    if (holdingOrange === true && isColliding(player, tangDrink)) {
        score += 25;
        playerHealth += 15;
        loadedAudio.sfx_water.play();
        tangDrink.fillLevel = Math.min(tangDrink.fillLevel + 0.34, 1);
        collectibles.push(new Collectible(90, 0, 36, 36, loadedImages.orange, 'orange'));

        if (collectedOrange.length > 0) {
            collectedOrange.shift();
        }

        holdingOrange = false;
    }
}

function gameStats() {
    //Tang Logo
    ctx.drawImage(loadedImages.tangLogo, 25, 342)

    //Health Bar
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.strokeRect(2,340,canvas.width-4,28)

    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width/2-15, 347.5, 100, 14)

    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width/2-15, 347.5, playerHealth, 14)

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width/2-15, 347.5, playerHealth, 14)

    ctx.font = '20px pixelPurl';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('HEALTH :', canvas.width/2-50, 360);

    //Score
    ctx.font = '20px pixelPurl';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`SCORE : ${score}`, canvas.width-60, 360);
}

function selectorBox(x, y, width, height, hoverText, changeState) {
    
    const isHovering = (
        mouse.x > x &&
        mouse.x < x + width &&
        mouse.y > y &&
        mouse.y < y + height
    );

    if (isHovering) {
        ctx.fillStyle = 'white';
        ctx.font = '20px pixelPurl';
        ctx.fillText(hoverText, mouse.x, mouse.y);
    }

    if (isHovering && mouse.isDown) {
        gameState = changeState;
        mouse.isDown = false;
        return true;
    }
}

function gameLoop() {
    if (gameState === "startScreen") {
        startScreen();
    } else if (gameState === "preIntroScreen") {
        preIntroScreen();
    } else if (gameState === "introScreen") {
        introScreen();
    } else if (gameState === "gameScreen") {
        gameScreen();
    } else if (gameState === "gameScreen2") {
        gameScreen2();
    } else if (gameState === "gameScreen3") {
        gameScreen3();
    } else if (gameState === "gameOverScreen") {
        gameOverScreen();
    } else if (gameState === "winScreenLvl1") {
        winScreenLvl1();
    } else if (gameState === "winScreenLvl2") {
        winScreenLvl2();
    } else if (gameState === "winScreen") {
        winScreen();
    } else if (gameState === "endScreen") {
        endScreen();
    } 
    requestAnimationFrame(gameLoop);
}



function startScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ctx.drawImage(
        loadedImages.tangLogo,
        canvas.width / 2 - 50,
        canvas.height / 2 - 50,
        100,
        80
    );
    selectorBox(140,140,100,80, 'CLICK TO BEGIN', 'preIntroScreen');

    ctx.font = '20px pixelPurl';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Hit ENTER to Begin", canvas.width/2, 350);

}

let introImages;
let currentFrameIntro = 0;
let frameCounterIntro = 0;
const frameDelayIntro = 400; 

function preIntroScreen() {
    loadedAudio.intromusic.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    frameCounterIntro++;
    if (frameCounterIntro >= frameDelayIntro) {
        frameCounterIntro = 0;
        currentFrameIntro = (currentFrameIntro + 1) % introImages.length;
    }

    ctx.drawImage(introImages[currentFrameIntro], 35, 35);

    ctx.font = '20px pixelPurl';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Hit SPACE to Skip", canvas.width/2, 350);
}

function introScreen() {

    if (!voicePlayed) {
        voicePlayed = true;
        loadedAudio.voice7.play();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(loadedImages.intro, 50, 30);
    ctx.font = '40px pixelPurl';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("DRINK THE", canvas.width/2+10, 67);
    ctx.fillText("TANG AID!!!", canvas.width/2+10, 110);
    ctx.fillText("HIT ENTER TO PLAY", canvas.width/2 +10, 310);
}

//LEVEL 1
function gameScreen() {
    loadedAudio.bossmusic.play();
    if (!voicePlayed) {
        voicePlayed = true;
        loadedAudio.voice1.play();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    platforms.forEach(platform => {
        platform.update();
    })

    ladders.forEach(ladder => {
        ladder.draw();
    })

    collectibles.forEach(collectible => {
        collectible.draw();
    })
    
    player.update(platforms, ladders);
    collideGlass();

    player.checkCollectibleCollision(collectibles, collectedOrange);
    tangDrink.draw();
  
    for (let barrel of barrels) {
        barrel.update();
        if (barrel.pathIndex >= barrelPath.length){
            score += 2;
            barrels.shift();
        }
    }
    enemySprite1.update();
    spawnBarrels();
    collideBarrel();
    gameStats();

    if (playerHealth <= 0) {
        gameState = 'gameOverScreen'
        loadedAudio.bossmusic.pause();
        loadedAudio.bossmusic.currentTime = 0;
        voicePlayed = false;
    }

    if (tangDrink.fillLevel >= 1) {
        gameState = 'winScreenLvl1';
        loadedAudio.bossmusic.pause();
        loadedAudio.bossmusic.currentTime = 0;
        voicePlayed = false;
    }
}

//LEVEL2
function gameScreen2() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    loadedAudio.bossmusic.play();
    if (!voicePlayed) {
        voicePlayed = true;
        loadedAudio.voice3.play();
    }

    platforms.forEach(platform => {
        platform.update();
    })

    ladders.forEach(ladder => {
        ladder.draw();
    })

    collectibles.forEach(collectible => {
        collectible.draw();
    })

    nuts.forEach(nut => {
        nut.update();
    })
    
    player.update(platforms, ladders);
    collideGlass();

    player.checkCollectibleCollision(collectibles, collectedOrange);
    tangDrink.draw();

    for (let barrel of barrels) {
        barrel.update();
        if (barrel.pathIndex >= barrelPath.length){
            score += 2;
            barrels.shift();
            }
    }
    enemySprite2.update();
    spawnBarrels();
    collideBarrel();
    collideNut();
    gameStats();

    if (playerHealth <= 0) {
        gameState = 'gameOverScreen'
        loadedAudio.bossmusic.pause();
        loadedAudio.bossmusic.currentTime = 0;
        voicePlayed = false;
    }

    if (tangDrink.fillLevel >= 1) {
        gameState = 'winScreenLvl2';
        loadedAudio.bossmusic.pause();
        loadedAudio.bossmusic.currentTime = 0;
        voicePlayed = false;
    }
}

//LEVEL 3
function gameScreen3() {
    loadedAudio.bossmusic.play();
    if (!voicePlayed) {
        voicePlayed = true;
        loadedAudio.voice5.play();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    platforms.forEach(platform => {
        platform.update();
    })

    ladders.forEach(ladder => {
        ladder.draw();
    })

    collectibles.forEach(collectible => {
        collectible.draw();
    })
    
    player.update(platforms, ladders);
    collideGlass();

    

    player.checkCollectibleCollision(collectibles, collectedOrange);
    tangDrink.draw();

    for (let barrel of barrels) {
        barrel.update();
        if (barrel.pathIndex >= barrelPath.length){
            score += 2;
            barrels.shift();
        }
    }
    enemySprite3.update();
    
    laserEye.update();
    spawnBarrels();
    collideBarrel();
    collideLaserEyes();
    gameStats();

    if (playerHealth <= 0) {
        gameState = 'gameOverScreen'
        loadedAudio.bossmusic.pause();
        loadedAudio.bossmusic.currentTime = 0;
        voicePlayed = false;
    }

    if (tangDrink.fillLevel >= 1) {
        gameState = 'winScreen';
        loadedAudio.bossmusic.pause();
        loadedAudio.bossmusic.currentTime = 0;
        voicePlayed = false;
    }
}

function gameOverScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(loadedImages.gameover_img,35,35)
    ctx.font = '20px pixelPurl'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(`SCORE - ${score}`, canvas.width/2, 120)
    ctx.fillText("HIT P TO PLAY AGAIN", canvas.width/2, 330)

    selectorBox(115,275,135,30, 'PLAY AGAIN???', 'preIntroScreen')
}

let imagesLvl1;
let currentFrameLvl1 = 0;
let frameCounterLvl1 = 0;
const frameDelayLvl1 = 400; 

function winScreenLvl1() {
    loadedAudio.intromusic.play();
    if (!voicePlayed) {
        voicePlayed = true;
        loadedAudio.voice2.play();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if (currentFrameLvl1 < imagesLvl1.length - 1) {
        frameCounterLvl1++;
        if (frameCounterLvl1 >= frameDelayLvl1) {
            frameCounterLvl1 = 0;
            currentFrameLvl1++;
        }
    }

    ctx.drawImage(imagesLvl1[currentFrameLvl1], 35, 35);

    ctx.font = '20px pixelPurl';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Hit SPACE to Skip", canvas.width/2, 350);

}

let imagesLvl2;
let currentFrameLvl2 = 0;
let frameCounterLvl2 = 0;
const frameDelayLvl2 = 400;
let voicePlayedBuzz = false;
let voiceCounter = 0;

function winScreenLvl2() {
    voiceCounter++
    loadedAudio.intromusic.play();

    if (!voicePlayed && voiceCounter >= 700) {
        voicePlayed = true;
        loadedAudio.voice4.play();
    }

    if (!voicePlayedBuzz &&  voiceCounter >= 900) {
        voicePlayedBuzz = true;
        loadedAudio.voice9.play();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if (currentFrameLvl2 < imagesLvl2.length - 1) {
        frameCounterLvl2++;
        if (frameCounterLvl2 >= frameDelayLvl2) {
            frameCounterLvl2 = 0;
            currentFrameLvl2++;
        }
    }

    ctx.drawImage(imagesLvl2[currentFrameLvl2], 35, 35);

    ctx.font = '20px pixelPurl';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Hit SPACE to Skip", canvas.width/2, 350);
}

let imagesWin;
let currentFrameWin = 0;
let frameCounterWin = 0;
const frameDelayWin = 400;
let voiceCounterWin = 0;

function winScreen() {
    voiceCounterWin++
    loadedAudio.spacemusic.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!voicePlayed && voiceCounterWin >= 750) {
        voicePlayed = true;
        loadedAudio.voice6.play();
    }

    if (!voicePlayedBuzz && voiceCounterWin >= 0) {
        voicePlayedBuzz = true;
        loadedAudio.voice10.play();
    }
    
    frameCounterWin++;

    if (currentFrameWin < imagesWin.length - 1) {
        if (frameCounterWin >= frameDelayWin) {
            frameCounterWin = 0;
            currentFrameWin++;
        }
    } else {
        if (frameCounterWin >= frameDelayWin) {
            voiceCounterWin = 0;
            gameState = 'endScreen';
            voicePlayed = false;
            voicePlayedBuzz = false;
        }
    }

    ctx.drawImage(imagesWin[currentFrameWin], 35, 35);
}

function endScreen () {
    loadedAudio.spacemusic.play();
    loadedAudio.voice8.play();
    ctx.drawImage(loadedImages.imgWin5, 35,35)
    ctx.font = '30px pixelPurl'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(`${score}`, 243, 188)
    ctx.fillText('Hit P Key to Play Again', canvas.width/2, canvas.height - 10)
}

(async () => {
    drawLoadingScreen(0, Object.keys(images).length);
    drawLoadingScreen(0, Object.keys(audiofiles).length);
    console.log("Loading images...");
    loadedImages = await loadAllImages(images);
    loadedAudio = await loadAllAudio(audiofiles);
    console.log("All images loaded!");

    player = new Player(50, 290, 36,36, loadedImages.stand_r, loadedImages.stand_l,
        loadedImages.run_r, loadedImages.run_l, loadedImages.climbLadder, loadedImages.stand_r);
    
    platforms = [new Platform(0,326,75,15, loadedImages.platform_img,0),
        new Platform(75,326,75,15, loadedImages.platform_img,0),
        new Platform(150,323,75,15, loadedImages.platform_img, -Math.PI/30),
        new Platform(224,315,75,15, loadedImages.platform_img, -Math.PI/30),
        new Platform(298,307,75,15, loadedImages.platform_img, -Math.PI/30),

        new Platform(298,248,75,15, loadedImages.platform_img, Math.PI/30),
        new Platform(224,240,75,15, loadedImages.platform_img, Math.PI/30),
        new Platform(150,232,75,15, loadedImages.platform_img, Math.PI/30),
        new Platform(76,224,75,15, loadedImages.platform_img, Math.PI/30),
        new Platform(2,216,75,15, loadedImages.platform_img, Math.PI/30),

        new Platform(2,157,75,15, loadedImages.platform_img, -Math.PI/30),
        new Platform(77,153,75,15, loadedImages.platform_img, 0),
        new Platform(152,153,75,15, loadedImages.platform_img, 0),
        new Platform(227,153,75,15, loadedImages.platform_img, 0),
        new Platform(302,149,75,15, loadedImages.platform_img, -Math.PI/30),

        new Platform(0,90,75,15, loadedImages.platform_img,0),
        new Platform(75,90,75,15, loadedImages.platform_img,0),
        new Platform(150,90,75,15, loadedImages.platform_img,0),
        new Platform(225,90,75,15, loadedImages.platform_img,0),
        new Platform(300,90,75,15, loadedImages.platform_img,0),

        new Platform(150,40,75,15, loadedImages.platform_img,0),
        new Platform(75,40,75,15, loadedImages.platform_img,0),
    ];

    ladders = [
        new Ladder(335,237,36,50, loadedImages.ladder),
        new Ladder(5,146,36,50, loadedImages.ladder),
        new Ladder(335,78,36,50, loadedImages.ladder),
        new Ladder(150,24,36,50, loadedImages.ladder),
    ];

    collectibles = [
        new Collectible(90,0,36,36, loadedImages.orange, 'orange')
    ];

    enemySprite1 = new Enemy(20,18,28,75,loadedImages.will_img);
    enemySprite2 = new Enemy(5,40,58,50,loadedImages.ham_img);
    enemySprite3 = new Enemy(20,16,40,75,loadedImages.buzz_img);

    introImages = [loadedImages.preintrotxt1,loadedImages.preintrotxt1a,loadedImages.preintrotxt1b,
        loadedImages.preintro1, loadedImages.preintro2, loadedImages.preintrotxt2, loadedImages.preintrotxt2a, 
        loadedImages.preintrotxt2b, loadedImages.preintro3
    ];

    imagesLvl1 = [loadedImages.img1Lvl1, loadedImages.img2Lvl1, loadedImages.img3Lvl1];

    imagesLvl2 = [loadedImages.img1Lvl2, loadedImages.img2Lvl2, loadedImages.img3Lvl2];

    imagesWin = [loadedImages.imgWin1, loadedImages.imgWin2, loadedImages.imgWin3,
        loadedImages.imgWin4
    ];

    nuts = [new Nut(-10, 130, 1, loadedImages.monkeyNut_img, 18,18), 
        new Nut(canvas.width + 10, 210, -1, loadedImages.monkeyNut_img, 18,18)]

    laserEye = new LaserEyes(35, 30);

    loadedAudio.intromusic.volume = 0.1;
    loadedAudio.bossmusic.volume = 0.1;
    loadedAudio.spacemusic.volume = 0.1;
    loadedAudio.sfx_jump.volume = 0.05;
    loadedAudio.sfx_water.volume = 0.1;
    loadedAudio.sfx_collect.volume = 0.1;
    
    gameLoop();

})();

document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
    }

    if (gameState === "startScreen") {
        if (e.code === "Enter") {
            gameState = "preIntroScreen";
        }
    }

    if (gameState === "preIntroScreen") {
        if (e.code === 'Space') {
            gameState = 'introScreen'; 
            loadedAudio.intromusic.pause();
            loadedAudio.intromusic.currentTime = 0;
            }
    }

    if (gameState === "introScreen") {
        if (e.code === 'Enter') {
            gameState = 'gameScreen';
            playerHealth = 100;
            score = 0;
            player.x = 50;
            player.y = 290;
            barrels = [];
            collectedOrange = [];
            tangDrink.fillLevel = 0;
            voicePlayed = false;

        }
    }

    if (gameState === "winScreenLvl1") {
        if (e.code === 'Space') {
            gameState = 'gameScreen2';
            player.x = 50;
            player.y = 290;
            barrels = [];
            collectedOrange = [];
            tangDrink.fillLevel = 0;
            loadedAudio.intromusic.pause();
            loadedAudio.intromusic.currentTime = 0;
            voicePlayed = false;
            currentFrameLvl1 = 0;

        }
    }

    if (gameState === "winScreenLvl2") {
        if (e.code === 'Space') {
            gameState = 'gameScreen3';
            player.x = 50;
            player.y = 290;
            barrels = [];
            collectedOrange = [];
            tangDrink.fillLevel = 0;
            loadedAudio.intromusic.pause();
            loadedAudio.intromusic.currentTime = 0;
            voicePlayed = false;
            voicePlayedBuzz = false;
            voiceCounter = 0;
            currentFrameLvl2 = 0;

        }
    }

    if (gameState === "gameOverScreen" || gameState === 'endScreen') {
        if (e.code === 'KeyP') {
            gameState = 'introScreen';
            playerHealth = 100;
            score = 0;
            player.x = 50;
            player.y = 290;
            barrels = [];
            collectedOrange = [];
            nuts = [];
            tangDrink.fillLevel = 0;
            loadedAudio.spacemusic.pause();
            loadedAudio.spacemusic.currentTime = 0;
            voicePlayed = false;
            currentFrameWin = 0;
        }
    }
    
});

document.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
    }
    if (e.code === 'ArrowRight') {
        player.currentSprite = loadedImages.stand_r;
    }
    if (e.code === 'ArrowLeft') {
        player.currentSprite = loadedImages.stand_l;
    }
});

canvas.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect();
    
    mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
    mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);
});

canvas.addEventListener('mousedown', function () {
    mouse.isDown = true;
});

canvas.addEventListener('mouseup', function () {
    mouse.isDown = false;
});

//END OF CODE
