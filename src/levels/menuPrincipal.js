import Player from "../entities/hero.js";

export default class menuPrincipal extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "menu" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload() {

      this.load.spritesheet("healthBar", "src/assets/libear.png",{
        frameWidth: 128,
        frameHeight: 32,

      })
      this.load.image("Phaser_sprite001", "src/assets/Sprite-0001.png");
      this.load.spritesheet("boss1", "src/assets/boss_1.png", {
        frameWidth: 64,
        frameHeight: 96
      });
      this.load.spritesheet("rats", "src/assets/rats.png", {
        frameWidth: 64,
        frameHeight: 64
      });
      this.load.image("menu", "src/assets/menu.jpg");
      // chargement de la carte
      this.load.tilemapTiledJSON("cuisine", "src/assets/cuisine.json");
      // chargement de la carte
      this.load.tilemapTiledJSON("quartiers", "src/assets/quartiers.json");
      this.load.tilemapTiledJSON("global", "src/assets/global.json");
      this.load.spritesheet("boug", "src/assets/spriteSheetBoug.png", {
          frameWidth: 32,
          frameHeight: 64
        });

    
    }

    create() {

        this.add.image(1200, 720, 'menu');

        this.anims.create({
          key: "fullHP",
          frames: this.anims.generateFrameNumbers("healtBar", { start: 0, end: 0 }),
          frameRate: 4,
          repeat: -1
        });
        this.anims.create({
          key: "1hpPerdu",
          frames: this.anims.generateFrameNumbers("healthBar", { start: 1, end: 1 }),
          frameRate: 4,
          repeat: -1
        });
        this.anims.create({
          key: "2hpPerdus",
          frames: this.anims.generateFrameNumbers("healthBar", { start: 2, end: 2 }),
          frameRate: 4,
          repeat: -1
        });
        this.anims.create({
          key: "3hpPerdus",
          frames: this.anims.generateFrameNumbers("healthBar", { start: 3, end: 3 }),
          frameRate: 4,
          repeat: -1
        });
        this.anims.create({
          key: "4hpPerdus",
          frames: this.anims.generateFrameNumbers("healthBar", { start: 4, end: 4 }),
          frameRate: 4,
          repeat: -1
        });
        this.anims.create({
          key: "ded",
          frames: this.anims.generateFrameNumbers("healthBar", { start: 5, end: 5 }),
          frameRate: 4,
          repeat: -1
        });



        this.anims.create({
            key: "iddle_left",
            frames: this.anims.generateFrameNumbers("boug", { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
          });
        
        this.anims.create({
            key: "iddle_right",
            frames: this.anims.generateFrameNumbers("boug", { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
          });
    
        this.anims.create({
            key: "move_left",
            frames: this.anims.generateFrameNumbers("boug", { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
          });
        
         this.anims.create({
            key: "move_right",
            frames: this.anims.generateFrameNumbers("boug", { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
          });

        
          this.anims.create({
            key: "rat_Up",
            frames: this.anims.generateFrameNumbers("rats", { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
          });
        
        this.anims.create({
            key: "rat_Down",
            frames: this.anims.generateFrameNumbers("rats", { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
          });
    
        this.anims.create({
            key: "rat_left",
            frames: this.anims.generateFrameNumbers("rats", { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
          });
        
         this.anims.create({
            key: "rat_right",
            frames: this.anims.generateFrameNumbers("rats", { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
          });
        
        this.clavier = this.input.keyboard.createCursorKeys();
    
    }

    update(){
        if (this.clavier.space.isDown) {
            this.scene.stop();
            this.game.scene.start("global");

        }
    }


}