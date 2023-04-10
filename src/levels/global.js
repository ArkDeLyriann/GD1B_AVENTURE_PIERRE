import Player from "../entities/hero.js";
import kitchen from "/src/levels/kitchen.js";
import menu from "/src/levels/menuPrincipal.js";
import Rat from "/src/entities/rats.js";
import miniBoss from "/src/entities/miniBoss.js";
import Bullet from "/src/entities/bullet.js";
import Bullets from "/src/entities/bullets.js";

export default class global extends Phaser.Scene {
    constructor() {
      super({
        key: "global"
      });
    }
    init(data){
      this.spawnX = data.x
      this.spawnY = data.y
      this.playerHP = data.playerHP
      this.thune = data.thune
      this.havePelle = data.havePelle
      this.haveGun = data.haveGun
      
    }

    preload(){
        this.load.image('bullet', 'src/assets/bullet.png');
        this.load.image("Phaser_sprite001", "src/assets/Sprite-0001.png");
        this.load.spritesheet("healthBar", "src/assets/lifebar.png",{
        frameWidth: 128,
        frameHeight: 32,

      })
    }

    create(){

        

        this.clavier = this.input.keyboard.createCursorKeys();
        // on load le tiled
        const carteDuNiveau = this.add.tilemap("global");
        // on load l'image liée au tiled
        const tileset = carteDuNiveau.addTilesetImage(
        "Sprite-0001",
        "Phaser_sprite001"
        );
    
    
        // création des layers a partir du tiles
        const carteGlobal = carteDuNiveau.createLayer(
          "fond",
          tileset
        );

        const carteHaies = carteDuNiveau.createLayer(
          "haies",
          tileset
          );

      
         const carteCollider = carteDuNiveau.createLayer(
          "mursMaisons",
          tileset
        );

        const carteVersCuisine = carteDuNiveau.createLayer(
          "tpCuisine",
          tileset
        );

        const carteVersQuarters = carteDuNiveau.createLayer(
          "tpQuarters",
          tileset
        );

        
        

        //coordonnées du spawn joueur
        if(this.spawnX && this.spawnY){
          this.player = new Player(this, this.spawnX, this.spawnY, 'boug');
        }
        else{this.player = new Player(this, 1216, 2208, 'boug');
        }

        //création des potions
        this.potion1 = this.physics.add.sprite(32*32, 21*32, 'potion');


        //les débris
        this.lesDebris = this.add.group();



        this.debris1 = this.physics.add.staticSprite(785, 913, 'debris');
        this.debris2 = this.physics.add.staticSprite(785, 945, 'debris');
        this.debris3 = this.physics.add.staticSprite(1071, 26*32, 'debris');
        this.debris4 = this.physics.add.staticSprite(1201, 689, 'debris');
        this.debris5 = this.physics.add.staticSprite (1201, 721, 'debris');


        this.lesDebris.add(this.debris1);
        this.lesDebris.add(this.debris2);
        this.lesDebris.add(this.debris3);
        this.lesDebris.add(this.debris4);
        this.lesDebris.add(this.debris5);


        //le gun
        this.pistol = this.physics.add.sprite(96, 640, 'pistol');

        this.physics.add.overlap(this.player, this.pistol, this.ramasseGun, null, this);

        //Création des balles
        this.bullets = new Bullets(this);
        


        //commande PanPan
        this.input.on('pointerdown', (pointer ) => {
          console.log(this.player.direction);
          if(this.haveGun == true);
            if(this.haveGun == true){
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

        

        
        //Création du mini Boss
        this.miniBoss = new miniBoss(this, 25*32, 13*32, 'boss1');
        this.pvMiniBoss = 200;
        
        
        //Création des rats
        this.ratus = this.add.group();
        this.rat1 = new Rat(this, 19*32, 39*32, 'rats');
        this.rat2 = new Rat(this, 30*32, 35*32, 'rats');
        this.rat3 = new Rat(this, 50*32, 40*32, 'rats');
        this.rat4 = new Rat(this, 23*32, 21*32, 'rats');
        this.rat5 = new Rat(this, 42*32, 39*32, 'rats');
        this.rat6 = new Rat(this, 24*32, 41*32, 'rats');
        this.rat7 = new Rat(this, 35*32, 41*32, 'rats');
        this.rat8 = new Rat(this, 13*32, 20*32, 'rats');

        this.ratsvivants = 8;

        this.ratus.add(this.rat1);
        this.ratus.add(this.rat2);
        this.ratus.add(this.rat3);
        this.ratus.add(this.rat4);
        this.ratus.add(this.rat5);
        this.ratus.add(this.rat6);
        this.ratus.add(this.rat7);
        this.ratus.add(this.rat8);
        

        this.backUi = this.add.image(900, 165, 'backUi').setScrollFactor(0);
        this.backUi.setScale(1.5);
        this.backUi.setAlpha(0.50);
        this.barrePV = this.add.sprite(900  , 150, 'healthBar').setScrollFactor(0, 0);
        this.barrePV.setScale(1.5);


        //Collisions du joueur
        this.player.refreshBody();
        this.physics.add.collider(this.player, carteCollider);
        carteCollider.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteHaies);
        carteHaies.setCollisionByExclusion(-1, true);
        
        this.physics.add.overlap(this.player, this.ratus, this.toucheRatus, null, this);
        this.physics.add.overlap(this.player, this.potion1, this.soins, null, this);
        carteVersCuisine.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersCuisine, this.goCuisine, null , this);
        carteVersQuarters.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersQuarters, this.goQuarters, null , this);


        //les debris
        this.physics.add.collider(this.player, this.debris1, this.pelle1, null, this);
        this.physics.add.collider(this.player, this.debris2, this.pelle2, null, this);
        this.physics.add.collider(this.player, this.debris3, this.pelle3, null, this);
        this.physics.add.collider(this.player, this.debris4, this.pelle4, null, this);
        this.physics.add.collider(this.player, this.debris5, this.pelle5, null, this);
        
        
        //collisions des balles
        this.physics.add.collider(this.bullets, this.rat1, this.killRat1, null, this);
        this.physics.add.collider(this.bullets, this.rat2, this.killRat2, null, this);
        this.physics.add.collider(this.bullets, this.rat3, this.killRat3, null, this);
        this.physics.add.collider(this.bullets, this.rat4, this.killRat4, null, this);
        this.physics.add.collider(this.bullets, this.rat5, this.killRat5, null, this);
        this.physics.add.collider(this.bullets, this.rat6, this.killRat6, null, this);
        this.physics.add.collider(this.bullets, this.rat7, this.killRat7, null, this);
        this.physics.add.collider(this.bullets, this.rat8, this.killRat8, null, this);
        this.physics.add.collider(this.bullets, this.miniBoss, this.hitBoss, null, this);
        //this.physics.add.collider(this.bullets, carteCollider, this.bulletWall, null, this);          //Test de collider entre les balles et les murs (inconcluant)

        //collisions des rats
        this.physics.add.collider(this.ratus, carteHaies);
        this.physics.add.collider(this.ratus, carteCollider);
        

        
        //collisions du mini Boss
        this.physics.add.collider(this.miniBoss, carteCollider);
        this.physics.add.collider(this.miniBoss, carteHaies);

        

        
        //limites du monde et camera
        this.physics.world.setBounds(0, 0, 1920, 1920);
        this.cameras.main.setBounds(0, 0, 1920, 1920);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player);
        
        //initialisation Lumière
        carteCollider.setPipeline('Light2D');
        carteGlobal.setPipeline('Light2D');
        carteHaies.setPipeline('Light2D');
        carteVersCuisine.setPipeline('Light2D');
        carteVersQuarters.setPipeline('Light2D');
        this.miniBoss.setPipeline('Light2D');
        this.ratus.getChildren().forEach((rat) => {
          rat.setPipeline('Light2D');
        });
        


        this.lights.enable().setAmbientColor(0x3333ff);

        this.light = this.lights.addLight(180, 80, 500).setColor(0xf1af0c).setIntensity(1);
        this.bossLight = this.lights.addLight(180, 80, 500).setColor(0xc643c4).setIntensity(1);
        this.miniBoss.setScale(1.5);


        //Déplacement des rats
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


        //Comportement mini Boss
        this.intervalBoss = setInterval(() => {
          const randNumber = Math.floor((Math.random() * 4) + 1);
            switch(randNumber) {
              case 1:
                this.miniBoss.setVelocityX(150);
                break;
              case 2:
                this.miniBoss.setVelocityX(-150);
                break;
              case 3:
                this.miniBoss.setVelocityY(-150);
                break;
              case 4:
                this.miniBoss.setVelocityY(150);
                break;
              
            }
          }, 2000);

        
    }

    update(){
        //lumière
        this.player.update();
        this.light.x = this.player.x;
        this.light.y = this.player.y;

        this.bossLight.x = this.miniBoss.x;
        this.bossLight.y = this.miniBoss.y;

        
        // Barre de vie
        if (this.playerHP == 5){
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

          this.scene.start("menu");
          return;
        }
        
        if (this.ratsvivants <=0){
          clearInterval(this.intervalMoveRatus);
        }
        

    }



    //#############FONCTIONS###########//
    
    
    
    //Fonctions de collision joueur/ennemi
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



    //Fonctions pour tuer les ennemis
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



    hitBoss(){
      
      if (this.pvMiniBoss >0){
        this.pvMiniBoss -= 1;
      }else{
        this.miniBoss.destroy();
        this.bossLight.setIntensity(0);
        this.thune += 100;
        clearInterval(this.intervalBoss);
        this.scene.start("menu");

      }
      


    }


    pelle1(){
      if (this.havePelle == true){
        this.debris1.destroy();
      }
    
    }
    pelle2(){
      if (this.havePelle == true){
        this.debris2.destroy();
      }
   
    }
    pelle3(){
      if (this.havePelle == true){
        this.debris3.destroy();
      }
    
    }
    pelle4(){
      if (this.havePelle == true){
        this.debris4.destroy();
      }

    }
    pelle5(){
      if (this.havePelle == true){
        this.debris5.destroy();
      }
      
    }


    ramasseGun(){
      this.haveGun = true;
      this.pistol.destroy();
      console.log("j'ai le gun");
      
    }



    

    /*bulletWall(){   // test de collider entre murs et balles

      this.bullets.bulletHitWall();


    }*/

    soins(){
      console.log("touchepotion");
      
      this.playerHP += 1;
      this.potion1.destroy(true);
      console.log(this.playerHP);

    }



  














    //Fonctions de changement de scene
    goCuisine(){
      this.scene.stop();
      clearInterval(this.intervalMoveRatus);
      clearInterval(this.intervalBoss);
      this.scene.start("kitchen",{
        playerHP : this.playerHP,
        thune : this.thune,
        havePelle : this.havePelle,
        haveGun : this.haveGun
      })

    }

    goQuarters(){
      this.scene.stop();
      clearInterval(this.intervalMoveRatus);
      clearInterval(this.intervalBoss);
      this.scene.start("quarters",{
        playerHP : this.playerHP,
        thune : this.thune,
        havePelle : this.havePelle,
        haveGun : this.haveGun
      })

    }
}