export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.clavier = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,

            attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shovel: Phaser.input.Keyboard.KeyCodes.A,
        });
    }

    update(){
        // Mouvement
        if (this.clavier.left.isDown || this.pad?.left) {
            mouvement.x = -1;
            this.direction = "left"; 
        } 
        else if (this.clavier.right.isDown || this.pad?.right) {
            mouvement.x = 1;
            this.direction = "right"; 
        } 
        else {
            mouvement.x = 0;

        }

        if (this.clavier.up.isDown || this.pad?.up) {
            mouvement.y = -1;
            this.direction = "up"; 
            this.facingUp = true;
        } 
        else if (this.clavier.down.isDown || this.pad?.down) {
            mouvement.y = 1;
            this.direction = "down";
            this.facingUp = false;

        } 
        else {
            mouvement.y = 0;
        }

        mouvement.normalize();
        this.setVelocity(mouvement.x * PLAYER_SPEED, mouvement.y * PLAYER_SPEED);

        this.x = Math.round(this.x);
        this.y = Math.round(this.y)
    }
}