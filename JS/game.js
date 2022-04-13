class Game {
    constructor() {
        this.player = null;
        this.opponents = [];
        this.board = document.getElementById('board');


    }
    start(){
        this.createPlayer();
        this.createOpponent();
    }
 
    createPlayer() {
        // Creating a player and adding it to the DOM & assign it to our game board
        this.player = new Player(20, 10);
        const newPlayer = document.createElement('div');
        newPlayer.className = 'player';
        this.board.appendChild(newPlayer);
        // Selecting the player element in the DOM & Drawing the player
        const drawPlayer = document.querySelector('.player');
        drawPlayer.style.width = "100px"
        drawPlayer.style.height = "200px"

    }
    

     createOpponent() {
         setInterval(() => {
             // Creating new Opponents and Putting them into Array every 1 Seconds
             let newOpp = new Opponent()
            this.opponents.push(newOpp)
             let newOpponent = document.createElement('div');
             newOpponent.className = 'opponent';
             this.board.appendChild(newOpponent);
             const drawOpp = document.querySelector('.opponent');
             drawOpp.style.width = "100px"
             drawOpp.style.height = "200px"
            moveDown();
         }, 1000);

       
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
        this.positionX += 1;
    }
    steerRight() {
        this.positionY -= 1;
    };
}

// creates the Opponents class which inherits some Player properties and moveDown method
class Opponent extends Player {
    constructor(height, width) {
        super(height, width);
        this.positionX = 0;
        this.positionY = Math.random() * 90;

    }
    moveDown() {
        this.positionY -= 1;
    }
}


const game = new Game();
game.start();

