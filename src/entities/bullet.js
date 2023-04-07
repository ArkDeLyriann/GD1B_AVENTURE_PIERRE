import Player from "../entities/hero.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        if(this.direction = "up"){
            this.setVelocityY(-300);
        }else if(this.direction = "down"){
            this.setVelocityY(300);
        }else if(this.direction = "left"){
            this.setVelocityX(-300);
        }else if(this.direction = "up"){
            this.setVelocityX(-300);
        }
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}