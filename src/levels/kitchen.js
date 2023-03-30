import Player from "../entities/hero.js";

export default class kitchen extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "kitchen" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_sprite001", "src/assets/Sprite-0001.png");
    // chargement de la carte
    this.load.tilemapTiledJSON("cuisine", "src/assets/cuisine.json");

    this.load.spritesheet("img_perso", "src/assets/spriteTest.png", {
        frameWidth: 32,
        frameHeight: 64
      });
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
        "map",
        tileset
        );

    // les plateformes sont solides
    const carteMurs = carteDuNiveau.createLayer(
        "murs",
        tileset
        );

    
  

    this.player = new Player(this, 1376, 1888, 'img_perso');
    this.player.refreshBody();
    this.physics.add.collider(this.player, carteMurs);
    carteMurs.setCollisionByExclusion(-1, true);
    this.physics.world.setBounds(0, 0, 1920, 1920);
    this.player.setScale(1.5);
    this.player.setSize(20,40);
    this.player.setOffset(12,24);

    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.startFollow(this.player);
}

  update(){
    this.player.update();


  }
}