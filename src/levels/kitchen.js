import Player from "../entities/hero.js";
import menu from "/src/levels/menuPrincipal.js";
import Rat from "/src/entities/rats.js";
import Bullet from "/src/entities/bullet.js";
import Bullets from "/src/entities/bullets.js";

export default class kitchen extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "kitchen" //  ici on précise le nom de la classe en tant qu'identifiant
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

  create() {
    

    // on load le tiled
    const carteDuNiveau = this.add.tilemap("cuisine");
    // on load l'image liée au tiled
    const tileset = carteDuNiveau.addTilesetImage(
    "Sprite-0001",
    "Phaser_sprite001"
    );

    // création du background a partir du tiles
    const carteCuisine = carteDuNiveau.createLayer(
        "fond",
        tileset
        );

    // les plateformes sont solides
    const carteMurs = carteDuNiveau.createLayer(
        "collision",
        tileset
        );
    const carteSortie = carteDuNiveau.createLayer(
      "sortie",
      tileset
      );

    
  
    // Joueur


    this.player = new Player(this, 1376, 1888, 'boug');
    this.player.refreshBody();
    this.physics.add.collider(this.player, carteMurs);
    carteMurs.setCollisionByExclusion(-1, true);
    this.physics.world.setBounds(0, 0, 1920, 1920);

    this.physics.add.overlap(this.player, this.ratus, this.toucheRatus, null, this);


     //Création des balles
     this.bullets = new Bullets(this);


     //commande PanPan
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
    

    //LA PELLE
    this.pelle = this.physics.add.sprite(5*32, 10*32, 'pelle');

    this.physics.add.overlap(this.player, this.pelle, this.ramassePelle, null, this);

    // rats


    this.ratus = this.add.group();
    this.rat1 = new Rat(this, 35*32, 6*32, 'rats');
    this.rat2 = new Rat(this, 45*32, 8*32, 'rats');
    this.rat3 = new Rat(this, 47*32, 48*32, 'rats');
    this.rat4 = new Rat(this, 47*32, 43*32, 'rats');
    this.rat5 = new Rat(this, 42*32, 39*32, 'rats');
    this.rat6 = new Rat(this, 23*32, 32*32, 'rats');
    this.rat7 = new Rat(this, 23*32, 23*32, 'rats');
    this.rat8 = new Rat(this, 32*32, 35*32, 'rats');
    this.rat9 = new Rat(this, 15*32, 46*32, 'rats');
    this.rat10 = new Rat(this, 5*32, 20*32, 'rats');

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



    //débris
    this.lesDebris = this.add.group();

    this.debris1 = this.physics.add.staticSprite(1312, 1728, 'debris');
    this.debris2 = this.physics.add.staticSprite(1312, 1696, 'debris');
    this.debris3 = this.physics.add.staticSprite(928, 1472, 'debris');
    this.debris4 = this.physics.add.staticSprite(928, 1440, 'debris');
    this.debris5 = this.physics.add.staticSprite (1088, 480, 'debris');
    this.debris6 = this.physics.add.staticSprite (1120, 480, 'debris');
    this.debris7 = this.physics.add.staticSprite (1152, 480, 'debris');


    this.lesDebris.add(this.debris1);
    this.lesDebris.add(this.debris2);
    this.lesDebris.add(this.debris3);
    this.lesDebris.add(this.debris4);
    this.lesDebris.add(this.debris5);
    this.lesDebris.add(this.debris6);
    this.lesDebris.add(this.debris7);


    this.physics.add.collider(this.player, this.debris1, this.pelle1, null, this);
    this.physics.add.collider(this.player, this.debris2, this.pelle2, null, this);
    this.physics.add.collider(this.player, this.debris3, this.pelle3, null, this);
    this.physics.add.collider(this.player, this.debris4, this.pelle4, null, this);
    this.physics.add.collider(this.player, this.debris5, this.pelle5, null, this);
    this.physics.add.collider(this.player, this.debris6, this.pelle6, null, this);
    this.physics.add.collider(this.player, this.debris7, this.pelle7, null, this);


    this.physics.add.collider(this.ratus, carteMurs);
    this.physics.add.overlap(this.player, this.ratus, this.toucheRatus, null, this);
    

    //hud
    

    this.barrePV = this.add.sprite(300 , 150, 'healthBar').setScrollFactor(0, 0);
    this.barrePV.setScale(1.5);

    carteSortie.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, carteSortie, this.goOutside, null , this);


    //camera
    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.startFollow(this.player);

    //lights

    carteCuisine.setPipeline('Light2D');
    carteMurs.setPipeline('Light2D');
    carteSortie.setPipeline('Light2D');
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



  soins(){
    console.log("touchepotion");
    
    this.playerHP += 1;
    this.potion1.destroy(true);
    console.log(this.playerHP);

  }

  ramassePelle(){
    this.havePelle = true;
    this.pelle.destroy();
  }

  goOutside(){
    
    clearInterval(this.intervalMoveRatus);
    this.scene.start("global", {
      playerHP : this.playerHP,
      x:17*32, 
      y:22*32,
      thune : this.thune,
      havePelle : this.havePelle,
      haveGun : this.haveGun
    });

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
  pelle6(){
    if (this.havePelle == true){
      this.debris6.destroy();
    }
    
  }
  pelle7(){
    if (this.havePelle == true){
      this.debris7.destroy();
    }
    
  }


}