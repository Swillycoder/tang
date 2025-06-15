const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 375;
const CANVAS_HEIGHT = 370;
const SCALE = 2;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

canvas.style.width = `${CANVAS_WIDTH * SCALE}px`;
canvas.style.height = `${CANVAS_HEIGHT * SCALE}px`;

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
    will_img: 'https://raw.githubusercontent.com/Swillycoder/tang/main/willanim2.png',
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
    for (const [key, src] of Object.entries(imageSources)) {
        try {
            loadedImages[key] = await loadImage(src);
            console.log(`${key} loaded successfully`);
        } catch (error) {
            console.error(error);
        }
    }
    return loadedImages;
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
        this.jumpStrength = -6.5;
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

        // Ensure the player's foot is horizontally "on" the platform segment
        const onPlatform =
            foot.x >= Math.min(start.x, end.x) - 5 &&
            foot.x <= Math.max(start.x, end.x) + 5;

        if (distance < 5 && foot.y < closestPoint.y + 5 && onPlatform && this.velocityY >= 0) {
            // Snap player to the platform
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

        // Horizontal movement
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
        }

        if (this.isClimbing === false) {
            this.checkPlatformCollisions(platforms);
        }

        this.checkCollectibleCollision(collectibles, collectedOrange);
            
        this.boundaries();
        
        // Frame updates (unchanged)
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

        // Get world coordinates of the top left and top right corners
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

        if (this.frames >= 3) {
            this.frames = 0;
        }

        this.draw();

    }
}

const barrelPath = [
    { x: 50, y: 50 },
    { x: 100, y: 81 },
    { x: 350, y: 81 },
    { x: 350, y: 139 },
    { x: 310, y: 144 },
    { x: 80, y: 144 },
    { x: 30, y: 151 },
    { x: 30, y: 205 },
    { x: 350, y: 240 },
    { x: 350, y: 297 },
    { x: 150, y: 317 },
    { x: 0, y: 317 },
];

class Barrel {
    constructor() {
        this.x = barrelPath[0].x;
        this.y = barrelPath[0].y;
        this.speed = 1;
        this.pathIndex = 1; // start moving toward second point
        this.radius = 8;
        this.width = 7;
        this.height = 7;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.stroke();
    }

    update() {
        if (this.pathIndex >= barrelPath.length) return; // End of path

        const target = barrelPath[this.pathIndex];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.speed) {
            // Snap to target and advance
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
        } else {
            // Move toward target
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }

        this.draw();
    }


}

let score = 0;
let gameState = "introScreen"
let player;
let platforms = [];
let ladders = [];
let collectibles = [];
let collectedOrange = [];
let holdingOrange = false;
let loadedImages;
const tangDrink = new TangDrink(5,262,36,68);
let enemySprite1;
let barrels = [new Barrel(7,7)];
let playerHealth = 100

setInterval(() => {
    barrels.push(new Barrel(7,7));
}, 5000);

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function collideBarrel() {
    for (let barrel of barrels) {
        if (isColliding(player, barrel)) {
            console.log('collide with barrel!');
            playerHealth -= 1;
        }
    }
}

function collideGlass() {
    if (holdingOrange === true && isColliding(player, tangDrink)) {
        score += 1
        console.log('collide!');
        tangDrink.fillLevel = Math.min(tangDrink.fillLevel + 0.25, 1);
        collectibles.push(new Collectible(90, 0, 36, 36, loadedImages.orange, 'orange'));

        if (collectedOrange.length > 0) {
            collectedOrange.shift();
        }

        holdingOrange = false;
    }
}

function gameStats() {
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

    ctx.font = '15px Impact';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('HEALTH :', canvas.width/2-50, 360);

    //Score
    ctx.font = '15px Impact';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`SCORE : ${score}`, canvas.width-60, 360);
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

function gameLoop() {
    if (gameState === "introScreen") {
        introScreen();
    } else if (gameState === "gameScreen") {
        gameScreen();
    } else if (gameState === "gameOverScreen") {
        gameOverScreen();
    } 
    requestAnimationFrame(gameLoop);
}

function introScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(loadedImages.intro, 50, 0);
    ctx.font = '40px Impact'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText("DRINK THE", canvas.width/2, 37)
    ctx.fillText("TANG AID!!!", canvas.width/2, 80)
    ctx.fillText("HIT ENTER TO PLAY", canvas.width/2, 280)
}

function gameScreen() {
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

    enemySprite1.update();

        // Draw path (for debugging)
/*
    ctx.beginPath();
    ctx.moveTo(barrelPath[0].x, barrelPath[0].y);
    for (let i = 1; i < barrelPath.length; i++) {
        ctx.lineTo(barrelPath[i].x, barrelPath[i].y);
    }
    ctx.strokeStyle = "lightgray";
    ctx.stroke();
    */

    // Update and draw barrels
    for (let barrel of barrels) {
        barrel.update();
    }

    collideBarrel();
    gameStats();

    if (playerHealth <= 0) {
        gameState = 'gameOverScreen'
    }
}


function gameOverScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(231, 12, 12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '40px Impact'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(`SCORE - ${score}`, canvas.width/2, 100)
    ctx.fillText("HIT P TO PLAY AGAIN", canvas.width/2, 200)
}

(async () => {
    console.log("Loading images...");
    loadedImages = await loadAllImages(images);
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
    ]

    ladders = [
        new Ladder(335,237,36,50, loadedImages.ladder),
        new Ladder(5,146,36,50, loadedImages.ladder),
        new Ladder(335,78,36,50, loadedImages.ladder),
        new Ladder(150,24,36,50, loadedImages.ladder),
    ]

    collectibles = [
        new Collectible(90,0,36,36, loadedImages.orange, 'orange')
    ]

    enemySprite1 = new Enemy(20,18,28,75,loadedImages.will_img);
    gameLoop();
})();

document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
    }
    if (gameState === "introScreen") {
        if (e.code === 'Enter') {
            gameState = 'gameScreen';

        }
    }

    if (gameState === "gameOverScreen") {
        if (e.code === 'KeyP') {
            gameState = 'introScreen';
            playerHealth = 100;
            score = 0;
            player.x = 50;
            player.y = 290;
            barrels = [];
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
    //if (e.code === 'ArrowUp' && player.isClimbing) {
    //    player.y -= 2
    //}
});
