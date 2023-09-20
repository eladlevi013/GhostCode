import { createUIElements, collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import GhostlyCabniBaseLevel from './GhostlyCabinBaseLevel.js';

// constants
const collectables_locations = [{type: "cheese", x:275, y:250}, {type: "cheese", x:150, y:250}, {type: "cheese", x:275, y:400},
  {type: "cheese", x:425, y:400}, {type: "cheese", x:425, y:600}, {type: "cheese", x:550, y:600}];
const players_locations = [{type: "mouse", x:275, y:600}, {type: "mouse", x:425, y:250, flip:true}];

export default class Level20 extends GhostlyCabniBaseLevel {
  constructor() {
    super(20,6, collectables_locations, {best: 4, minumum: 6});
  }

  create() {
    const map = this.make.tilemap({ key: 'map20' });
    const tileset = map.addTilesetImage('tileset', 'tileset_wood');
    const grassLayer = map.createLayer('grass', tileset, -8, -10);
    this.add.image(0, 0, 'wood').setOrigin(0).setScale(1, 0.99).setDepth(-1);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createUIElements(this);
    createCollectables(this, collectables_locations);
    this.createWorldProps({x: 70, y: 80});
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {}
}
