import { PLAYER_TYPES } from '../../phaserUtils/player/playerConstants.js';
import { collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheHauntedForestBaseLevel from './TheHauntedForestBaseLevel.js';

// constants
const COLLECTABLES_LOCATIONS = [
  {type: "gem", x: 455, y: 320},
  {type: "gem", x: 350, y: 143},
  {type: "gem", x: 243, y: 320},
  {type: "gem", x: 350, y: 497},
  {type: "gem", x: 540, y: 497}
];
const PLAYERS_LOCATIONS = [{type: PLAYER_TYPES.GHOST, x: 140, y: 503}];

export default class Level8 extends TheHauntedForestBaseLevel {

  constructor() {
    super(8, 5, COLLECTABLES_LOCATIONS, {best: 4, minimum: 6});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map8' });
    const tileset = map.addTilesetImage('tileset', 'tileset_dark');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);
    // creating world props
    this.createWorldProps(false, false);
    // creating player, gems and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
