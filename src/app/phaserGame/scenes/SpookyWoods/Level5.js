import { collideTileMapLayer } from '../../phaserUtils/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import SpookyWoodsBaseLevel from './SpookyWoodsBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 340, y: 300},
  {type: "gem", x: 395, y: 505}, {type: "gem", x: 285, y: 505}];
const players_locations = [{type: "ghost", x: 92, y: 700}];

export default class Level5 extends SpookyWoodsBaseLevel {
  constructor() {
    super(5,3, collectables_locations, {best: 13, minumum: 14});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map5' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);
    
    // creating world props
    this.createWorldProps(false, false);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createCollectables(this, collectables_locations);

    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
