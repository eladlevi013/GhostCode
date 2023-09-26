import { PLAYER_TYPES } from '../../phaserUtils/player/playerConstants.js';
import { collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheHauntedForestBaseLevel from './TheHauntedForestBaseLevel.js';

// constants
const COLLECTABLES_LOCATIONS = [
  {type: "gem", x: 497, y: 440},
  {type: "gem", x: 200, y: 143}, 
  {type: "gem", x: 497, y: 143}
];

const PLAYERS_LOCATIONS = [{type: PLAYER_TYPES.GHOST, x: 200, y: 440}];

export default class Level6 extends TheHauntedForestBaseLevel {
  constructor() {
    super(6, 3, COLLECTABLES_LOCATIONS, {best: 3, minimum: 4});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map6' });
    const tileset = map.addTilesetImage('tileset', 'tileset_dark');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);
    // creating world props
    this.createWorldProps(true, false);
    // creating player, gems, and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
