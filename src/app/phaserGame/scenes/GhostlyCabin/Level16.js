import { createUIElements, collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import GhostlyCabniBaseLevel from './GhostlyCabinBaseLevel.js';
import { PLAYER_TYPES } from '../../phaserUtils/player/playerConstants.js';

// Constants
const COLLECTABLES_LOCATIONS = [
  {type: "cheese", x: 175, y: 300}, 
  {type: "cheese", x: 347, y: 300}, 
  {type: "cheese", x: 519, y: 300}
];

// Assuming PLAYER_TYPES is available globally or imported
const PLAYERS_LOCATIONS = [
  {type: PLAYER_TYPES.MOUSE, x:170, y:620, name: "mouse[0]"}, 
  {type: PLAYER_TYPES.MOUSE, x:342, y:620, name: "mouse[1]"}, 
  {type: PLAYER_TYPES.MOUSE, x: 514, y: 620, name: "mouse[2]"}
];

export default class Level16 extends GhostlyCabniBaseLevel {
  constructor() {
    super(16, 3, COLLECTABLES_LOCATIONS, {best: 3, minimum: 4});
  }

  create() {
    const map = this.make.tilemap({ key: 'map16' });
    const tileset = map.addTilesetImage('tileset', 'tileset_wood');
    const grassLayer = map.createLayer('grass', tileset, -8, -10);
    this.add.image(0, 0, 'wood').setOrigin(0).setScale(1, 0.99).setDepth(-1);
    // Creating player, UI elements and collectables
    createPlayer(this, PLAYERS_LOCATIONS);
    createUIElements(this);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    this.createWorldProps({x: 100, y: 90});
    // Making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
