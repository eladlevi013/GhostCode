import { collideTileMapLayer } from '../../utils/uiHandler.js';
import { createPlayer } from '../../utils/player.js';
import { createCollectables } from '../../utils/collectablesHandler.js';
import SpookyWoodsBaseLevel from './SpookyWoodsBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 351, y: 180},
  {type: "gem", x: 351, y: 340}, {type: "gem", x: 351, y: 500}];
const players_locations = [{type: "ghost", x: 351, y: 700}];

export default class Level1 extends SpookyWoodsBaseLevel {

  constructor() {
    super(1,3, collectables_locations, {best: 1, minumum: 3});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map1' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);
    
    // creating world props
    this.createWorldProps();

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createCollectables(this, collectables_locations);

    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);

    // level finished loading
    this.setIsLoading(false);
  }

  update() {}
}
