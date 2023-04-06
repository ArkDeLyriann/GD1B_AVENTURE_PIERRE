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


    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.startFollow(this.player);
    

    }

    update(){


        this.player.update();
    
    
    }
   
    goSuite(){
        
        this.scene.start("global",{
            x:48*32, 
            y:8*32
          });

    }

    goBack(){
        
        this.scene.start("global",{
            x:51*32, 
            y:20*32
          });

    }


}