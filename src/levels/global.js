import Player from "../entities/hero.js";
import kitchen from "/src/levels/kitchen.js";
import menu from "/src/levels/menuPrincipal.js";
import Rat from "/src/entities/rats.js";
import miniBoss from "/src/entities/miniBoss.js";

export default class global extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "global" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    init(data){
      this.spawnX = data.x
      this.spawnY = data.y
    }

    preload(){
        this.load.image("Phaser_sprite001", "src/assets/Sprite-0001.png");
        this.load.spritesheet("healthBar", "src/assets/lifebar.png",{
        frameWidth: 128,
        frameHeight: 32,

      })
    }

    create(){

        this.playerHP = 5
        this.claPVr = this.input.keyboard.createCursorKeys();
        // on load le tiled
        const carteDuNiveau = this.add.tilemap("global");
        // on load l'image liée au tiled
        const tileset = carteDuNiveau.addTilesetImage(
        "Sprite-0001",
        "Phaser_sprite001"
        );
    
    
        // création du background a partir du tiles
        const carteGlobal = carteDuNiveau.createLayer(
          "fond",
          tileset
        );

        const carteHaies = carteDuNiveau.createLayer(
          "haies",
          tileset
          );

        // les plateformes sont solides
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

        if(this.spawnX && this.spawnY){
          this.player = new Player(this, this.spawnX, this.spawnY, 'boug');
        }
        else{this.player = new Player(this, 1216, 2208, 'boug');
        }
        
        

        this.ratus = this.add.group();

        this.miniBoss = new miniBoss(this, 25*32, 13*32, 'boss1');

        this.ratus.add(new Rat(this, 19*32, 39*32, 'rats'));
        this.ratus.add(new Rat(this, 30*32, 35*32, 'rats'));
        this.ratus.add(new Rat(this, 50*32, 40*32, 'rats'));
        this.ratus.add(new Rat(this, 1200, 2000, 'rats'));
        //this.ratus.add(new Rat(this, 1200, 2000, 'rats'));
        //this.ratus.add(new Rat(this, 1200, 2000, 'rats'));


        this.barrePV = this.add.sprite(300 , 150, 'healthBar',0).setScrollFactor(0, 0);
        this.barrePV.setScale(1.5);

        this.player.refreshBody();
        this.physics.add.collider(this.player, carteCollider);
        carteCollider.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteHaies);
        carteHaies.setCollisionByExclusion(-1, true);
        this.player.setScale(1);
        this.physics.add.collider(this.player, this.ratus, this.toucheRatus, null, this);
        
        this.physics.add.collider(this.ratus, carteCollider);
        this.physics.add.collider(this.ratus, carteHaies);

        this.physics.world.setBounds(0, 0, 1920, 1920);
        this.cameras.main.setBounds(0, 0, 1920, 1920);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player);

        carteVersCuisine.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersCuisine, this.goCuisine, null , this);
        carteVersQuarters.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersQuarters, this.goQuarters, null , this);
        
        
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

        this.bossLight.x = this.miniBoss.x;
        this.bossLight.y = this.miniBoss.y;

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

    toucheRatus(){
      if (this.player.alpha==1){
      this.playerHP -= 1;
      this.player.setAlpha(0.5);
      setTimeout(() => {
        this.player.setAlpha(1);
      }, 3000)
      }
      

    }
    goCuisine(){
        
      this.scene.start("kitchen")

    }

    goQuarters(){
        
      this.scene.start("quarters")

    }
}