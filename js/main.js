let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [loadingScene, homeScene, gameScene0, gameScene],
    //scene: [gameScene],
    title: 'El nostre videojoc',
    backgroundColor: 'ffffff'
};

let game = new Phaser.Game(config);

var player;
var peixos;
var gotas;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;