import MainScene from '~src/scenes/main-scene';
import game from '../main';
import createCreater from './mech';
import computer from './normal';

const start = () => {
  const scene = game.scene.scenes[0] as MainScene;
  scene.gameCore.addPlayer(computer);
  scene.gameCore.addPlayer(computer);
  const creater = createCreater(game, scene);
  const mech = creater.createMech(0);
  scene.gameCore.addMech('computer', mech);
};

setTimeout(start, 1000);
