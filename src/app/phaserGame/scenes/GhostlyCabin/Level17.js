import { createUIElements, collideTileMapLayer } from '../../phaserUtils/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import GhostlyCabniBaseLevel from './GhostlyCabinBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 175, y: 220},
{type: "gem", x: 347, y: 220}, {type: "gem", x: 519, y: 220},
{type: "gem", x: 175, y: 420}, {type: "gem", x: 347, y: 420},
{type: "gem", x: 519, y: 420}];
const players_locations = [{type: "ghost", x:170, y:620}, 
  {type: "ghost", x:342, y:620}];

export default class Level17 extends GhostlyCabniBaseLevel {
  constructor() {
    super(17,6, collectables_locations, {best: 3, minumum: 4});
  }

  create() {
    const map = this.make.tilemap({ key: 'map17' });
    const tileset = map.addTilesetImage('tileset', 'tileset_wood');
    const grassLayer = map.createLayer('grass', tileset, -8, -10);
    this.add.image(0, 0, 'wood').setOrigin(0).setScale(1, 0.99).setDepth(-1);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createUIElements(this);
    createCollectables(this, collectables_locations);
    this.createWorldProps({x: 472, y: 570}, [], []);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {}
}
