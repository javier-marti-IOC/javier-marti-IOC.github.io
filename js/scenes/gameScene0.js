class gameScene0 extends Phaser.Scene {
    constructor (){
        super('gameScene0');
    }
    
    
    create (){

        // Creem les músiques i els efectes, i li donem una configuració a la música de fons i l'executem.
        this.music = this.sound.add('music');
        var musicConfig = {
            mute:false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);

        this.catchFish = this.sound.add('fish');
        this.catchcat = this.sound.add('cat');
        

        //  Un fons de 3 capes per al nostre joc, i escalem la del mig per a que ocupi tota la imatge.
        //this.add.image(400, 300, 'fons_capa0');
        this.add.image(400, 300, 'fons_capa1').setScale(1.9);
        this.add.image(400, 300, 'fons_capa3');

     
        //  El grup de plataformes
        platforms = this.physics.add.staticGroup();
     
        // Aquí creem el terreny.
        // Cada plataforma està col·locada per a coincidir amb les capes del fons i els objectes d'aquesta.
        platforms.create(400,588,'terreny');
        platforms.create(-150,260,'terreny');
        platforms.create(200,427,'terreny');
        platforms.create(918,235,'terreny');
        
        
        

        // El jugador i la seva configuració, se li afegueix un modificador del sprite per a que les col·lisions siguin mes precises
        player = this.physics.add.sprite(100, 450, 'tet');
        player.body.setSize(35,35).setOffset(15,25);
        
     
        //  Propietats de la física del jugador. Afegeix un petit rebot al jugador en caure.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
     
        //  Les animacions dels nostres jugadors, girant, caminant a l’esquerra i caminant a la dreta.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('tet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
     
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'tet', frame: 4 } ],
            frameRate: 20
        });
     
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('tet', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
     
        //  Events d'entrada amb el teclat
        cursors = this.input.keyboard.createCursorKeys();
     
        //  Alguns peixos per recollir, 8 en total, separades uniformement a 100 píxels al llarg de l'eix X
        peixos = this.physics.add.group({
            key: 'peix',
            repeat: 7,
            setXY: { x: 25, y: 0, stepX: 100 }
        });
     
        peixos.children.iterate(function (child) {
     
            //  Cada peix fa un rebot lleugerament diferent
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
     
        });
     
        gotas = this.physics.add.group();
        //Aquí posem una bola que pot matar al gatet
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
     
            var gota = gotas.create(x, 16, 'gota');
            gota.setBounce(1);
            gota.setCollideWorldBounds(true);
            gota.setVelocity(Phaser.Math.Between(-80, 80), 20);
            gota.allowGravity = false;

        // aquí va el emissor de particules de neu
        this.add.particles(0, 1, 'snow-particle', {
            x: { min: 0, max: 7900 },
            y: { min: -500, max: 0 },
            quantity: 1,
            lifespan: 20000,
            gravityY: 20
            

        }).setScale(0.1);

        //  La puntuació
        scoreText = this.add.text(16, 16, 'Peixos= 0', { fontSize: '32px', fill: '#FFFF00'});
     
        //  Xoca el jugador i els peixos amb les plataformes
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(peixos, platforms);
        this.physics.add.collider(gotas, platforms);
     
        //  Comprova si el jugador col·lisiona amb algun peix, si crida ho fa, a la funció collectPeix
        this.physics.add.overlap(player, peixos, this.collectPeix, null, this);
        //  Comprova si el jugador col·lisiona amb alguna gota, si crida ho fa, a la funció hitGota
        this.physics.add.collider(player, gotas, this.hitGota, null, this);

    }

    update()
    {
        if (gameOver)
        {
            return;
        }
     
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
     
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
     
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
     
            player.anims.play('turn');
        }
     
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }

    collectPeix (player, peix)
    {
        this.catchFish.play();
        peix.disableBody(true, true);
     
        //  Afegeix i actualitza la puntuació
        score += 1;
        scoreText.setText('Peixos= ' + score);
     
        if (peixos.countActive(true) === 0)
        {
         
        this.sound.removeByKey('music');    
        this.scene.start('gameScene');   
            
     
        }
    }

    hitGota (player, gota)
    {
        this.physics.pause();
     
        player.setTint(0xff0000);
     
        player.anims.play('turn');
     
        gameOver = true;
        //Aquí parem la música perquè si no continuaria en la següent escena
        this.sound.removeByKey('music');

        this.catchcat.play();
        gameOver = this.add.text(210, 400, 'GAME OVER', { fontSize: '64px', fill: '#FFFF00'});

        var bg = this.add.sprite(365, 340, 'restart').setInteractive();
        bg.setOrigin(0, 0).setScale(0.06);
 
          var gameW = this.sys.game.config.width;
          var gameH = this.sys.game.config.height;
          var text = this.add.text(gameW/2, gameH/2, 'Clica a la icona', {
              font: '45px Arial',
              fill: '#FFFF00'
          });
          text.setOrigin(0.5, 0.5);
          text.depth = 1;
         
          var textBg = this.add.graphics();
          textBg.fillStyle(0x000000, 0.7);
          textBg.fillRect(gameW/2 - text.width/2 - 10, gameH/2 - text.height/2 - 10, text.width + 20, text.height + 20);
          
          //Aquí li diem que ja no es Game Over perquè així quan carregui la següent escena podrem moure el gat
          gameOver = false;

        

          bg.on('pointerdown', function(){
              this.scene.start('gameScene0');
              score = 0;
          }, this);  




    }


}