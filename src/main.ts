import "babel-polyfill";
import Phaser from 'phaser';
import config from './config';
import './dev/run'

const game = new Phaser.Game(config);

export default game;
