import Player from "../entities/hero.js";
import menu from "/src/levels/menuPrincipal.js";

export default class kitchen extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "kitchen" //  ici on précise le nom de la classe en tant qu'identifiant
    });
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

    
  

    this.player = new Player(this, 1376, 1888, 'boug');
    this.player.refreshBody();
    this.physics.add.collider(this.player, carteMurs);
    carteMurs.setCollisionByExclusion(-1, true);
    this.physics.world.setBounds(0, 0, 1920, 1920);

    this.barrePV = this.add.sprite(275 , 150, 'healthBar',0).setScrollFactor(0, 0);
    //this.player.setScale(1.5);
    //this.player.setSize(20,40);
    //this.player.setOffset(0,24);

    carteSortie.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, carteSortie, this.goOutside, null , this);

    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.startFollow(this.player);

    carteCuisine.setPipeline('Light2D');
    carteMurs.setPipeline('Light2D');
    carteSortie.setPipeline('Light2D');
    this.player.setPipeline('Light2D');
    
    
    this.lights.enable().setAmbientColor(0x333333);

    this.light = this.lights.addLight(180, 80, 800).setColor(0xf1af0c).setIntensity(1.3);
}

  update(){
    this.player.update();
    this.light.x = this.player.x;
    this.light.y = this.player.y;

  }

  goOutside(){
        
    this.scene.start("global", {
      x:17*32, 
      y:22*32
    });

  }
  
    


}