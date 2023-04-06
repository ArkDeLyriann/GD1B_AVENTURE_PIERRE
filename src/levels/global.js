import Player from "../entities/hero.js";
import kitchen from "/src/levels/kitchen.js";
import menu from "/src/levels/menuPrincipal.js";

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
        
        this.player.refreshBody();
        this.physics.add.collider(this.player, carteCollider);
        carteCollider.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteHaies);
        carteHaies.setCollisionByExclusion(-1, true);
        this.player.setScale(1);
        
        this.physics.world.setBounds(0, 0, 1920, 1920);
        this.cameras.main.setBounds(0, 0, 1920, 1920);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.player);

        carteVersCuisine.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersCuisine, this.goCuisine, null , this);
        carteVersQuarters.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, carteVersQuarters, this.goQuarters, null , this);


    }

    update(){

        this.player.update();

    }
    goCuisine(){
        
      this.scene.start("kitchen")

    }

    goQuarters(){
        
      this.scene.start("quarters")

    }
}