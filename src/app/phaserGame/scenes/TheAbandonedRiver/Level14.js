import { collideTileMapLayer } from '../../phaserUtils/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheAbandonedRiverBaseLevel from './TheAbandonedRiverBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 222, y: 730}, {type: "gem", x: 222, y: 413}];
const players_locations = [{type: "ghost", x: 222, y: 625, name: "Herold"}, 
  {type: "fish", x: 190, y: 290, name: "Bob", flip: true}];

export default class Level14 extends TheAbandonedRiverBaseLevel {
  constructor() {
    super(14,2, collectables_locations, {best: 5, minumum: 6});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map14' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createCollectables(this, collectables_locations);

    // creating world props
    this.createWorldProps([{x: 140, y: 500}], 
      [{x: 480, y: 263}],
      true, true);

    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {
  }
}
