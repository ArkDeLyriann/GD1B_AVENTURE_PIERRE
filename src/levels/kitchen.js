export default class niveau1 extends Phaser.Scene {
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

    
  

    this.player = this.physics.add.sprite(1376, 1888, "img_perso");
    this.player.refreshBody();
    this.physics.add.collider(this.player, carteMurs);
    carteMurs.setCollisionByExclusion(-1, true);

    this.clavier = this.input.keyboard.createCursorKeys();
    this.player.setScale(1.25);
    this.player.setSize(24,48);
    this.player.setOffset(6,6);
}

  update(){
    this.player.update();
  }
}