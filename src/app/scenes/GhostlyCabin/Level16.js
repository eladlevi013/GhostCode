import { createUIElements, collideTileMapLayer } from '../../utils/uiHandler.js';
import { createPlayer } from '../../utils/player.js';
import { createCollectables } from '../../utils/collectablesHandler.js';
import GhostlyCabniBaseLevel from './GhostlyCabinBaseLevel.js';

// constants
const collectables_locations = [{type: "cheese", x: 175, y: 300}, 
{type: "cheese", x: 347, y: 300}, {type: "cheese", x: 519, y: 300}];
const players_locations = [{type: "mouse", x:170, y:620, name: "mouse[0]"}, 
  {type: "mouse", x:342, y:620, name: "mouse[1]"}, {type: "mouse", x: 514, y: 620, name: "mouse[2]"}];

export default class Level16 extends GhostlyCabniBaseLevel {
  constructor() {
    super(16,3, collectables_locations, {best: 3, minumum: 4});
  }

  create() {
    const map = this.make.tilemap({ key: 'map16' });
    const tileset = map.addTilesetImage('tileset', 'tileset_wood');
    const grassLayer = map.createLayer('grass', tileset, -8, -10);
    this.add.image(0, 0, 'wood').setOrigin(0).setScale(1, 0.99).setDepth(-1);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createUIElements(this);
    createCollectables(this, collectables_locations);
    this.createWorldProps({x: 100, y: 90});
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
