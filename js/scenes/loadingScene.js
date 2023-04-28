var loadingScene = new Phaser.Scene('loadingScene');
 
loadingScene.preload = function(){
 
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
 
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
 
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
 
    loadingText.setOrigin(0.5, 0.5);
 
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
 
    percentText.setOrigin(0.5, 0.5);
 
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
 
    assetText.setOrigin(0.5, 0.5);
 
    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });
 
    this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.src);
    });
 
    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });
 
    /* ASSETS DEL GAMESCENE */

    this.load.image('fons_capa0', 'assets/fons_capa0.png');
    this.load.image('fons_capa1', 'assets/fons_capa1.png');
    this.load.image('fons_capa2', 'assets/fons_capa2.png');
    this.load.image('fons_capa3', 'assets/fons_capa3.png');
    this.load.audio('music', ['assets/Sound/Jungle.mp3', 'assets/Sound/Jungle.ogg']);
    this.load.audio('fish', ['assets/Sound/fish.mp3', 'assets/Sound/fish.ogg']);
    this.load.audio('cat', ['assets/Sound/cat.mp3', 'assets/Sound/cat.ogg']);
    this.load.image('terreny', 'assets/plataformas.png');
    this.load.image('peix', 'assets/peix.png');
    this.load.image('gota', 'assets/gota.png');
    this.load.image('restart', 'assets/restart.png');
    this.load.image('start', 'assets/start.png');
    this.load.image('snow-particle', 'assets/particles/snow.png');
    this.load.spritesheet('tet', 'assets/tet.png', { frameWidth: 64, frameHeight: 64 });


};
 
loadingScene.create = function(){
 
    this.scene.start('homeScene');
 
};