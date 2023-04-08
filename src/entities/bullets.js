import Player from "/src/entities/hero.js";
import Bullet from "/src/entities/bullet.js";

export default class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 6,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBulletUP (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {  
            bullet.upfire(x, y);
        }
    }
    fireBulletDOWN (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {  
            bullet.downfire(x, y);
        }
    }
    fireBulletLEFT (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {  
            bullet.leftfire(x, y);
        }
    }
    fireBulletRIGHT (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {  
            bullet.rightfire(x, y);
        }
    }

    bulletHitWall()
    {   
        let bullet = this.getFirstDead(false);
        
        bullet.hitwall();
    }
}