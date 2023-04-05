import menu from "/src/levels/menuPrincipal.js";
import global from "/src/levels/global.js";
import kitchen from "/src/levels/kitchen.js";
import quarters from "/src/levels/quarters.js";
//import chapel from "/src/levels/chapel.js";



var config = {
    type: Phaser.CANVAS,
    width: GAME_WIDTH, // largeur en pixels
    height: GAME_HEIGHT, // hauteur en pixels
    physics: {
      // définition des parametres physiques
      default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
      arcade: {
        debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
      }
    },
    scene: [menu, global, kitchen, quarters]
  };
  
  // création et lancement du jeu
  var game = new Phaser.Game(config);
  game.scene.start("menu");
