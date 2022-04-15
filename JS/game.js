class Game {
    constructor() {
        this.player = null;
        this.opponents = [];
        this.board = document.getElementById('board');
        this.bulletArr = [];
    }
    start() {
        this.createPlayer();
        // this.createOpponent();
        this.eventListener();
        this.moveOpponents();
        setInterval(() => {
            this.createOpponent();
        }, 1000)
    }
    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = toggle ? "block" : "none";
        element.style.display = display;
      }
    createPlayer() {
        // Creating a player and adding it to the DOM & assign it to our game board
        this.player = new Player();
        const newPlayer = document.createElement('div');
        newPlayer.className = 'player';
        this.board.appendChild(newPlayer);
        // Selecting the player element in the DOM & Drawing the player
        this.drawPlayer();
    }
    drawPlayer() {
        const drawPlayer = document.querySelector('.player');
        drawPlayer.style.width = this.player.width + "vw"
        drawPlayer.style.height = this.player.height + "vh"
        drawPlayer.style.left = this.player.positionX + "vw"
        drawPlayer.style.bottom = this.player.positionY + "vh"
    }
    drawAllOpponents() {
        this.opponents.forEach(element => {
            element.domElement.style.width = element.width + "vw"
            element.domElement.style.height = element.height + "vh"
            element.domElement.style.left = element.positionX + "vw"
            element.domElement.style.bottom = element.positionY + "vh"
        })
    }
    createOpponent() {
        // Creating new Opponents and Putting them into Array
        let newOpp = new Opponent()
        this.opponents.push(newOpp)
        let opponentElm = document.createElement('div');
        opponentElm.className = 'opponent';
        this.board.appendChild(opponentElm);
        newOpp.domElement = opponentElm;
    }
    removeOpponent() {
        this.opponents.forEach(element => {
            if (element.positionY < 0) {
                this.opponents.shift();
                element.domElement.remove();
                let point = document.getElementById("scoring");
                point.innerHTML++;
            }
        })
    }
    moveOpponents() {
        // move opponents toward player
        setInterval(() => {
            this.bulletArr.forEach(element =>{
                element.moveUp();
                this.drawBullet();
                this.removeBullet();
            })
            this.opponents.forEach(element => {
                element.moveDown();
                this.drawAllOpponents();
               // this.drawBullet();
                this.detectCollision(element);
                this.removeOpponent();
                this.bulletArr.forEach(bullet =>{
                    this.shootingCollision(bullet,opponent);
                })
            })
        }, 50);
    }
    eventListener() {
        document.addEventListener("keydown", (event) => {
            // assigning keys to movement and drawing the player after movements
            if (event.key === "ArrowRight") {
                this.player.steerRight();
            } else if (event.key === "ArrowLeft") {
                this.player.steerLeft();
            } else if (event.key === "Space") {
                this.createBullet();
                this.bullet.moveUp();
            }
            this.drawPlayer();
        });
    }
    detectCollision(opponent) {
        if (this.player.positionX < opponent.positionX + opponent.width &&
            this.player.positionX + this.player.width > opponent.positionX &&
            this.player.positionY < opponent.positionY + opponent.height &&
            this.player.height + this.player.positionY > opponent.positionY) {
            console.log("crashhhh");
            var audio = new Audio('../Sound/mixkit-war-explosions-2773.wav')
            audio.play();
            window.alert("GAME OVER!! Go get some Coffee")
        }
    }
    createBullet() {
        this.bullet = new Bullet(this.player.positionX, this.player.positionY);
        const newBullet = document.createElement('div');
        newBullet.className = ('bullet');
        this.board.appendChild(newBullet);
        newBullet.domElement = bulletElm;
        this.bulletArr.push(this.bullet);
    }
    drawBullet() {
        const bulletclass = document.querySelector('.bullet');
        bulletclass.style.width = this.bullet.width + "vw"
        bulletclass.style.height = this.bullet.height + "vh"
        bulletclass.style.left = this.bullet.positionX + "vw"
        bulletclass.style.bottom = this.bullet.positionY + "vh"
    }
    removeBullet(bullet) {
        if (bullet.positionY === 100) {
            this.bulletArr.splice(this.bulletArr.indexOf(bullet), 1);
            bullet.domElement.remove();
        }
    }
    shootingCollision(bullet, opponent) {
        if (
            bullet.positionX < opponent.positionX + opponent.width &&
            bullet.positionX + bullet.width > opponent.positionX &&
            bullet.positionY < opponent.positionY + opponent.height &&
            bullet.height + bullet.positionY > opponent.positionY
        ) {
            this.bulletArr.splice(this.bulletArr.indexOf(bullet), 1);
            this.opponents.splice(this.opponents.indexOf(opponent), 1);
            bullet.domElement.remove();
            opponent.domElement.remove();
            let point = document.getElementById("scoring");
            point.innerHTML += 10;
        }
    }

}
// Creates the Player class and add the properties and steering methods
class Player {
    constructor() {
        this.height = 7;
        this.width = 7;
        this.positionX = 45;
        this.positionY = 0;
    }
    steerRight() {
        if (this.positionX < 90) {
            this.positionX += 1;
        }
    }
    steerLeft() {
        if (this.positionX > 5) {
            this.positionX -= 1;
        }
    };
}

class Bullet {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.height = 20;
        this.width = 10;
        this.domElement = null;
    }
    moveUp() {
        this.positionY += 2
    }


}
// creates the Opponents class which inherits some Player properties and moveDown method
class Opponent {
    constructor() {
        this.domElement = null; // will store the dom element for each oponent
        this.positionX = Math.floor(Math.random() * 90);
        this.positionY = 100;
        this.height = 8;
        this.width = 7;
    }
    moveDown() {
        this.positionY--;
    }
}
// Sound Track to play after Start Button been pressed
var audio = new Audio('../Sound/start.mp3')
const game = new Game();
const start = document.querySelector("button")
start.addEventListener('click', (event) => {
    game.start();
    audio.play();
}
)

