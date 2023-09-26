import { createUIElements, collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import { PLAYER_TYPES } from '../../phaserUtils/player/playerConstants.js';

import GhostlyCabniBaseLevel from './GhostlyCabinBaseLevel.js';

// constants
const COLLECTABLES_LOCATIONS = [
  {type: "cheese", x:275, y:250}, 
  {type: "cheese", x:150, y:250}, 
  {type: "cheese", x:275, y:400},
  {type: "cheese", x:425, y:400}, 
  {type: "cheese", x:425, y:600}, 
  {type: "cheese", x:550, y:600}
];

const PLAYERS_LOCATIONS = [
  {type: PLAYER_TYPES.MOUSE, x:275, y:600, name: "mouse[0]"},
  {type: PLAYER_TYPES.MOUSE, x:425, y:250, flip : true, name: "mouse[1]"},
];

export default class Level20 extends GhostlyCabniBaseLevel {
  constructor() {
    super(20,6, COLLECTABLES_LOCATIONS, {best: 4, minimum: 6});
  }

  create() {
    const map = this.make.tilemap({ key: 'map20' });
    const tileset = map.addTilesetImage('tileset', 'tileset_wood');
    const grassLayer = map.createLayer('grass', tileset, -8, -10);
    this.add.image(0, 0, 'wood').setOrigin(0).setScale(1, 0.99).setDepth(-1);
    createPlayer(this, PLAYERS_LOCATIONS);
    createUIElements(this);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    this.createWorldProps({x: 70, y: 80});
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {}
}
