import 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from './constants/positions';
import { About } from './scenes/about-scene';
import { Help } from './scenes/help-scene';
import { LoadingScene } from './scenes/load-scene';
import { MenuScene } from './scenes/menu-scene';
import { SceneOne } from './scenes/scene-one';
import GameConfig = Phaser.Types.Core.GameConfig;

class App extends Phaser.Game {

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

function startApp(): void {

  const scaleConfig = {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'content',
    fullscreenTarget: 'content'
  };

  const scenes = [
    LoadingScene,
    About,
    Help,
    MenuScene,
    SceneOne
  ];

  const config: GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#fff',
    scale: scaleConfig,
    scene: scenes,
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    banner: false
  };

  // tslint:disable-next-line:no-unused-expression-chai
  new App(config);
}

window.onload = () => {
  startApp();
};

document.addEventListener('deviceready', () => {
  if (window.cordova) {
    this.scale.refresh();
  }
});

document.addEventListener('orientationchange', () => {
  this.scale.refresh();
});
