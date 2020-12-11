import MainScene from '~src/game/main';
import game from '../main';
import createCreator from './creators';
import computer from './normal';

const start = () => {
  const scene = game.scene.scenes[0] as MainScene;
  scene.gameCore.addPlayer(computer);
  scene.gameCore.addPlayer(computer);
  const creator = createCreator(scene);
  const mech1 = creator.createMech(0);
  scene.gameCore.addMech('computer', mech1);
  const mech2 = creator.createMech(1);
  scene.gameCore.addMech('computer', mech2);
  const mech3 = creator.createMech(2);
  scene.gameCore.addMech('computer', mech3);
};

setTimeout(start, 1000);
