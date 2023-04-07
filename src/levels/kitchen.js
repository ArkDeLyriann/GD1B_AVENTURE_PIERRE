import Player from "../entities/hero.js";
import menu from "/src/levels/menuPrincipal.js";
import Rat from "/src/entities/rats.js";

export default class kitchen extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "kitchen" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  init(data){
    this.playerHP = data.playerHP
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

    this.enemy = new Rat(this, 50*32, 40*32, 'rats')
    this.physics.add.collider(this.player, this.enemy, this.toucheRatus, null, this);

    this.barrePV = this.add.sprite(300 , 150, 'healthBar').setScrollFactor(0, 0);
    this.barrePV.setScale(1.5);

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

  goOutside(){
        
    this.scene.start("global", {
      playerHP : this.playerHP,
      x:17*32, 
      y:22*32
    });

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
    


}