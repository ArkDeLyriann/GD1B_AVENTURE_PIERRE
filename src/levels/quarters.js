import Player from "../entities/hero.js";
import kitchen from "/src/levels/kitchen.js";
import menu from "/src/levels/menuPrincipal.js";
import global from "/src/levels/global.js";

import Rat from "/src/entities/rats.js";
import Bullet from "/src/entities/bullet.js";
import Bullets from "/src/entities/bullets.js";

export default class quarters extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "quarters" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    init(data){
        this.playerHP = data.playerHP
        this.thune = data.thune
        this.havePelle = data.havePelle
        this.haveGun = data.haveGun
      }
    preload() {
        this.load.image("Phaser_sprite001", "src/assets/Sprite-0001.png");
    }

    create(){
        this.clavier = this.input.keyboard.createCursorKeys();
        // on load le tiled
        const carteDuNiveau = this.add.tilemap("quartiers");
        // on load l'image liée au tiled
        const tileset = carteDuNiveau.addTilesetImage(
        "Sprite-0001",
        "Phaser_sprite001"
    );
    
    
        // création du background a partir du tiles
    const carteQuartiers = carteDuNiveau.createLayer(
        "visuel",
        tileset
    );

    // les plateformes sont solides
    const carteCollision = carteDuNiveau.createLayer(
        "collision",
        tileset
    );

   const carteTpSuite = carteDuNiveau.createLayer(
        "TP suite",
        tileset
    );

    const carteTpAvant = carteDuNiveau.createLayer(
        "TP avant",
        tileset
    );
    
    

    this.player = new Player(this, 550, 1888, 'boug');
    this.player.refreshBody();
    this.physics.add.collider(this.player, carteCollision);
    carteTpSuite.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, carteTpSuite, this.goSuite, null , this);
    carteTpAvant.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, carteTpAvant, this.goBack, null , this);
    carteCollision.setCollisionByExclusion(-1, true);
    this.physics.world.setBounds(0, 0, 1920, 1920);


      //flingue

      this.bullets = new Bullets(this);
      this.input.on('pointerdown', (pointer ) => {
       
      
        console.log(this.player.direction);
  
        if (this.haveGun = true){
          if(this.player.direction == 'up'){
            this.bullets.fireBulletUP(this.player.x, this.player.y);
          }else  if(this.player.direction == 'down'){
            this.bullets.fireBulletDOWN(this.player.x, this.player.y);
          }else  if(this.player.direction == 'left'){
            this.bullets.fireBulletLEFT(this.player.x, this.player.y);
          }else if(this.player.direction == 'right'){
            this.bullets.fireBulletRIGHT(this.player.x, this.player.y);
          }
        }
  
      });





      //rats
    this.ratus = this.add.group();
    this.rat1 = new Rat(this, 10*32, 53*32, 'rats');
    this.rat2 = new Rat(this, 18*32, 53*32, 'rats');
    this.rat3 = new Rat(this, 30*32, 53*32, 'rats');
    this.rat4 = new Rat(this, 27*32, 14*32, 'rats');
    this.rat5 = new Rat(this, 27*32, 6*32, 'rats');
    this.rat6 = new Rat(this, 41*32, 7*32, 'rats');
    this.rat7 = new Rat(this, 41*32, 16*32, 'rats');
    this.rat8 = new Rat(this, 41*32, 44*32, 'rats');
    this.rat9 = new Rat(this, 28*32, 25*32, 'rats');
    this.rat10 = new Rat(this, 36*32, 25*32, 'rats');

    this.ratus.add(this.rat1);
    this.ratus.add(this.rat2);
    this.ratus.add(this.rat3);
    this.ratus.add(this.rat4);
    this.ratus.add(this.rat5);
    this.ratus.add(this.rat6);
    this.ratus.add(this.rat7);
    this.ratus.add(this.rat8);
    this.ratus.add(this.rat9);
    this.ratus.add(this.rat10);
    


    this.physics.add.collider(this.bullets, this.rat1, this.killRat1, null, this);
    this.physics.add.collider(this.bullets, this.rat2, this.killRat2, null, this);
    this.physics.add.collider(this.bullets, this.rat3, this.killRat3, null, this);
    this.physics.add.collider(this.bullets, this.rat4, this.killRat4, null, this);
    this.physics.add.collider(this.bullets, this.rat5, this.killRat5, null, this);
    this.physics.add.collider(this.bullets, this.rat6, this.killRat6, null, this);
    this.physics.add.collider(this.bullets, this.rat7, this.killRat7, null, this);
    this.physics.add.collider(this.bullets, this.rat8, this.killRat8, null, this);
    this.physics.add.collider(this.bullets, this.rat9, this.killRat9, null, this);
    this.physics.add.collider(this.bullets, this.rat10, this.killRat10, null, this);

    this.physics.add.collider(this.ratus, carteCollision);
    this.physics.add.overlap(this.player, this.ratus, this.toucheRatus, null, this);



    this.barrePV = this.add.sprite(300 , 150, 'healthBar').setScrollFactor(0, 0);
    this.barrePV.setScale(1.5);


    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.startFollow(this.player);

    carteQuartiers.setPipeline('Light2D');
    carteCollision.setPipeline('Light2D');
    carteTpAvant.setPipeline('Light2D');
    carteTpSuite.setPipeline('Light2D');
    this.player.setPipeline('Light2D');
    
    
    this.lights.enable().setAmbientColor(0x333333);

    this.light = this.lights.addLight(180, 80, 800).setColor(0xf1af0c).setIntensity(1.3);


    this.intervalMoveRatus = setInterval(() => {
      this.ratus.getChildren().forEach((rat) => {
        const randNumber = Math.floor((Math.random() * 4) + 1);
        switch(randNumber) {
          case 1:
            rat.body.setVelocityX(50);
            //this.anims.play("rat_right", true);
            break;
          case 2:
            rat.body.setVelocityX(-50);
            //this.anims.play("rat_left", true);
            break;
          case 3:
            rat.body.setVelocityY(-50);
            //this.anims.play("rat_Up", true);
            break;
          case 4:
            rat.body.setVelocityY(50);
            //this.anims.play("rat_Down", true);
            
            break;
          
        }
      });
    }, 1000);
    

    }

    update(){


        this.player.update();

        this.light.x = this.player.x;
        this.light.y = this.player.y;

        if (this.playerHP == 5){
            //console.log(this.barrePV);
            this.barrePV.anims.play('full');
          }
          else if (this.playerHP == 4){
            this.barrePV.anims.play('1hit');
          }
          else if (this.playerHP == 3){
            this.barrePV.anims.play('2hit');
          }
          else if (this.playerHP == 2){
            this.barrePV.anims.play('3hit');
          }
          else if (this.playerHP == 1){
            this.barrePV.anims.play('4hit');
          }
          else if (this.playerHP == 0){
            this.barrePV.anims.play('ded');
            return;
          }
    
    
    }

    killRat1(){
      this.rat1.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    killRat2(){
      this.rat2.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
    }
    killRat3(){
      this.rat3.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
    }
    killRat4(){
      this.rat4.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    killRat5(){
      this.rat5.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    killRat6(){
      this.rat6.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    killRat7(){
      this.rat7.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    killRat8(){
      this.rat8.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    killRat9(){
      this.rat9.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    killRat10(){
      this.rat10.destroy();
      this.thune += 10;
      this.ratsvivants -= 1;
  
    }
    toucheRatus(){
      if (this.player.alpha==1){
      this.playerHP -= 1;
      console.log(this.playerHP);
      this.player.setAlpha(0.5);
      setTimeout(() => {
        this.player.setAlpha(1);
      }, 3000)
      }
    }




    soins(){
      console.log("touchepotion");
      
      this.playerHP += 1;
      this.potion1.destroy(true);
      console.log(this.playerHP);

    }
   
    goSuite(){
        
        this.scene.start("global",{
            x:48*32, 
            y:8*32,
            playerHP : this.playerHP,
            thune : this.thune,
            havePelle : this.havePelle,
            haveGun : this.haveGun
          });

    }

    goBack(){
        
        this.scene.start("global",{
            x:51*32, 
            y:20*32,
            playerHP : this.playerHP,
            thune : this.thune,
            havePelle : this.havePelle,
            haveGun : this.haveGun
          });

    }


}