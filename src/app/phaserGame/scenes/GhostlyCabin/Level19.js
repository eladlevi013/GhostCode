import { createUIElements, collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import GhostlyCabniBaseLevel from './GhostlyCabinBaseLevel.js';

// constants
const collectables_locations = [{type: "cheese", x:545, y:500}, 
  {type: "cheese", x:545, y:350}, {type: "cheese", x:125, y:400}];
const players_locations = [{type: "mouse", x:125, y:675}, {type: "mouse",
  x:265, y:675}, {type: "mouse", x:405, y:675}, {type: "mouse", x:545, y:675}];

export default class Level19 extends GhostlyCabniBaseLevel {
  constructor() {
    super(19,3, collectables_locations, {best: 2, minumum: 3});
  }

  create() {
    const map = this.make.tilemap({ key: 'map19' });
    const tileset = map.addTilesetImage('tileset', 'tileset_wood');
    const grassLayer = map.createLayer('grass', tileset, -8, -10);
    this.add.image(0, 0, 'wood').setOrigin(0).setScale(1, 0.99).setDepth(-1);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createUIElements(this);
    createCollectables(this, collectables_locations);
    this.createWorldProps({x: 70, y: 80}, 
      [{x:365, y:300}, {x:225, y:400}, {x:85, y:500}], 
      [{x: 253, y: 300}, {x: 393, y: 200}, {x: 533, y: 200}]);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {}
}
