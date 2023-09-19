import { collideTileMapLayer } from '../../utils/gameUiHandler.js';
import { createPlayer } from '../../utils/player.js';
import { createCollectables } from '../../utils/collectablesHandler.js';
import SpookyWoodsBaseLevel from './SpookyWoodsBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 435, y: 375},
  {type: "gem", x: 435, y: 550}, {type: "gem", x: 330, y: 550}];
const players_locations = [{type: "ghost", x: 222, y: 740}];

export default class Level4 extends SpookyWoodsBaseLevel {
  constructor() {
    super(4,3, collectables_locations,  {best: 4, minumum: 5});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map4' });
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
