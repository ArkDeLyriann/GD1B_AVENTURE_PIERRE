import Player from "../entities/hero.js";
import kitchen from "/src/levels/kitchen.js";
import menu from "/src/levels/menuPrincipal.js";
import global from "/src/levels/global.js";

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
    

    }

    update(){


        this.player.update();

        this.light.x = this.player.x;
        this.light.y = this.player.y;

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
            thune : this.thune
          });

    }

    goBack(){
        
        this.scene.start("global",{
            x:51*32, 
            y:20*32,
            playerHP : this.playerHP,
            thune : this.thune
          });

    }


}