import Player from "../entities/hero.js";

export default class Rat extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.setScale(0.75);

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
    }

    create(){


    }

    update(){
        
    }


}