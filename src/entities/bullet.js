import Player from "../entities/hero.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    upfire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        
        this.setVelocityY(-300);
        
    }

    downfire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        
        this.setVelocityY(300);
        
    }

    leftfire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        
        this.setVelocityX(-300);
        
    }

    rightfire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        
        this.setVelocityX(300);
        
    }

    hitwall ()
    {
        this.setActive(false);
        this.setVisible(false);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.y >= 1920)
        {
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.x <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.x >= 1920)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}