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

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {  
            if(this.direction = "up"){
                bullet.upfire(x, y);
            }else if(this.direction = "down"){
                bullet.downfire(x, y);
            }else if(this.direction = "left"){
                bullet.leftfire(x, y);
            }else if(this.direction = "right"){
                bullet.rightfire(x, y);
            }
            
        }
    }
}