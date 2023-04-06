export default class Rat extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.clavier = scene.input.keyboard.createCursorKeys();
        

        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
    }

    create(){
        this.body.setSize(24, 32);

        
    }

    update(){
        setScale()
        var mouvement = new Phaser.Math.Vector2(0, 0);
        // Mouvement
        
    
    
    
    
    }


}