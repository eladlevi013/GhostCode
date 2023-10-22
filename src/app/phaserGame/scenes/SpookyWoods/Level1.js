import { PLAYER_TYPES } from '../../phaserUtils/player/playerConstants.js';
import { collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import SpookyWoodsBaseLevel from './SpookyWoodsBaseLevel.js';

// constants
const COLLECTABLES_LOCATIONS = [
  {type: "gem", x: 351, y: 180},
  {type: "gem", x: 351, y: 340}, 
  {type: "gem", x: 351, y: 500}
];

const PLAYERS_LOCATIONS = [
  {type: PLAYER_TYPES.GHOST, x: 351, y: 700}
];

export default class Level1 extends SpookyWoodsBaseLevel {
  constructor() {
    super(1, 3, COLLECTABLES_LOCATIONS, {best: 1, minimum: 3});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map1' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);
    this.createWorldProps();
    // creating player, gems and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
    this.setIsLoading(false);
  }

  update() {}
}
