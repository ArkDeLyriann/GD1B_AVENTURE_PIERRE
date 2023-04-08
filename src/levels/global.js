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
        

        //Création des balles
        this.bullets = new Bullets(this);


        //commande PanPan
        this.input.on('pointerdown', (pointer ) => {
          console.log(this.player.direction);


          if(this.player.direction == 'up'){
            this.bullets.fireBulletUP(this.player.x, this.player.y);
          }else  if(this.player.direction == 'down'){
            this.bullets.fireBulletDOWN(this.player.x, this.player.y);
          }else  if(this.player.direction == 'left'){
            this.bullets.fireBulletLEFT(this.player.x, this.player.y);
          }else if(this.player.direction == 'right'){
            this.bullets.fireBulletRIGHT(this.player.x, this.player.y);
          }

      });

        

        
        //Création du mini Boss
        this.miniBoss = new miniBoss(this, 25*32, 13*32, 'boss1');
        
        
        //Création des rats
        this.ratus = this.add.group();
        this.ratus.add(new Rat(this, 19*32, 39*32, 'rats'));
        this.ratus.add(new Rat(this, 30*32, 35*32, 'rats'));
        this.ratus.add(new Rat(this, 50*32, 40*32, 'rats'));
        //this.ratus.add(new Rat(this, 1200, 2000, 'rats'));
        //this.ratus.add(new Rat(this, 1200, 2000, 'rats'));

        


        this.barrePV = this.add.sprite(300 , 150, 'healthBar').setScrollFactor(0, 0);
        this.barrePV.setScale(1.5);


        //Collisions du joueur
        this.player.refreshBody();
        this.physics.add.collider(this.player, carteCollider);
        carteCollider.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteHaies);
        carteHaies.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.ratus, this.toucheRatus, null, this);
        this.physics.add.collider(this.player, this.potion1, this.soins, null, this);
        carteVersCuisine.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersCuisine, this.goCuisine, null , this);
        carteVersQuarters.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersQuarters, this.goQuarters, null , this);
        
        
        //collisions des balles
        this.physics.add.collider(this.bullets, this.ratus, this.killRat, null, this);
        //this.physics.add.collider(this.bullets, carteCollider, this.bulletWall, null, this);

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
          //console.log(this.barrePV);
      //    this.barrePV.anims.play('full');
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



    //#############FONCTIONS###########//
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

    bulletWall(){

      this.bullets.bulletHitWall();


    }

    soins(){

      this.playerHP += 1;
      this.potion1.disableBody(true);

    }
    goCuisine(){
      this.scene.stop();
        
      this.scene.start("kitchen",{
        playerHP : this.playerHP
      })

    }

    goQuarters(){
        
      this.scene.start("quarters",{
        playerHP : this.playerHP
      })

    }
}