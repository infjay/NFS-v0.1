class Game {
    constructor() {
        this.player = null;
        this.opponents = [];
        this.board = document.getElementById('board');


    }
    start() {
        this.createPlayer();
        this.createOpponent();
        this.eventListener();
    }

    createPlayer() {
        // Creating a player and adding it to the DOM & assign it to our game board
        this.player = new Player();
        const newPlayer = document.createElement('div');
        newPlayer.className = 'player';
        this.board.appendChild(newPlayer);
        // Selecting the player element in the DOM & Drawing the player
        this.drawingPlayer();
    }

    drawingPlayer() {
        const drawPlayer = document.querySelector('.player');
        drawPlayer.style.width = "100px"
        drawPlayer.style.height = "200px"
        drawPlayer.style.left = this.player.positionX + "vw"
        drawPlayer.style.bottom = this.player.positionY + "vh"
    }

    drawingOpponent(){
        const drawOpp = document.querySelector('.opponent');
        drawOpp.style.width = "100px"
        drawOpp.style.height = "200px"
        drawOpp.style.left = this.opponents.positionX + "vw"
        drawOpp.style.top = this.opponents.positionY + "vh"
    }

    createOpponent() {
        setInterval(() => {
            // Creating new Opponents and Putting them into Array every 1 Seconds
            let newOpp = new Opponent()
            this.opponents.push(newOpp)
            let newOpponent = document.createElement('div');
            newOpponent.className = 'opponent';
            this.board.appendChild(newOpponent);
            this.drawingOpponent();
        }, 1000);


    }

    eventListener() {
        console.log(this.player.positionX);
        document.addEventListener("keydown", (event) => {
            // assigning keys to movement
            if (event.key === "ArrowRight") {
                 this.player.steerRight();
            } else if (event.key === "ArrowLeft") {
                this.player.steerLeft();
                console.log("move left");
            } 
           this.drawingPlayer();
    
        });
    }

    
}



    
    




// Creates the Player class and add the properties and steering methods
class Player {
    constructor(height, width) {
        this.height = height + 'px';
        this.width = width + 'px';
        this.positionX = 45;
        this.positionY = 0;
    }
    steerRight() {
        this.positionX += 3;
    }
    steerLeft() {
        this.positionX -= 3;
    };
}

// creates the Opponents class which inherits some Player properties and moveDown method
class Opponent extends Player {
    constructor(height, width) {
        super(height, width);
        this.positionX = Math.random() * 90;
        this.positionY = 0;

    }
    moveDown() {
        this.positionY -=1;
    }
}


const game = new Game();
game.start();

