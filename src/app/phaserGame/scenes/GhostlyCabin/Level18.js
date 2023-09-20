import { createUIElements, collideTileMapLayer } from '../../phaserUtils/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import GhostlyCabniBaseLevel from './GhostlyCabinBaseLevel.js';

// constants
const collectables_locations = [{type: "cheese", x: 200, y: 250}, {type: "cheese", x: 340, y: 250}, {type: "cheese", x: 480, y: 250},
{type: "cheese", x: 200, y: 650}, {type: "cheese", x: 340, y: 650}, {type: "cheese", x: 480, y: 650}];
const players_locations = [{type: "mouse", x:200, y:450}, {type: "mouse", x:340, y:450}, {type: "mouse", x:480, y:450}];

export default class Level18 extends GhostlyCabniBaseLevel {
  constructor() {
    super(18,6, collectables_locations, {best: 3, minumum: 4});
  }

  create() {
    const map = this.make.tilemap({ key: 'map18' });
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
