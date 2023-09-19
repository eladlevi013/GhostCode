import { collideTileMapLayer } from '../../utils/gameUiHandler.js';
import { createPlayer } from '../../utils/player.js';
import { createCollectables } from '../../utils/collectablesHandler.js';
import SpookyWoodsBaseLevel from './SpookyWoodsBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 360, y: 220},
{type: "gem", x: 480, y: 505}, {type: "gem", x: 222, y: 505}];
const players_locations = [{type: "ghost", x: 222, y: 720}];

export default class Level3 extends SpookyWoodsBaseLevel {
  constructor() {
    super(3,3, collectables_locations, {best: 5, minumum: 6});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map3' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);
    
    // creating world props
    this.createWorldProps(true, false);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createCollectables(this, collectables_locations);

    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
