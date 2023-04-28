var homeScene = new Phaser.Scene('homeScene');
 
homeScene.create = function(){
  var bg = this.add.sprite(325, 370, 'start').setInteractive();
  bg.setOrigin(0, 0).setScale(0.3);
 
  var gameW = this.sys.game.config.width;
  var gameH = this.sys.game.config.height;
  var text = this.add.text(gameW/2, gameH/2, 'TET GATET', {
      font: '60px Arial',
      fill: '#FFFF00'
  });
  text.setOrigin(0.5, 0.5);
  text.depth = 1;
 
  var textBg = this.add.graphics();
  textBg.fillStyle(0x000000, 1);
  textBg.fillRect(gameW/2 - text.width/2 - 10, gameH/2 - text.height/2 - 10, text.width + 20, text.height + 20);
 
  bg.on('pointerdown', function(){
      this.scene.start('gameScene0');
  }, this);
};