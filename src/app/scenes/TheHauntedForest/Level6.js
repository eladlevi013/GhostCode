import { collideTileMapLayer } from '../../utils/gameUiHandler.js';
import { createPlayer } from '../../utils/player.js';
import { createCollectables } from '../../utils/collectablesHandler.js';
import TheHauntedForestBaseLevel from './TheHauntedForestBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 497, y: 440},
  {type: "gem", x: 200, y: 143}, {type: "gem", x: 497, y: 143}];
const players_locations = [{type: "ghost", x: 200, y: 440}];

export default class Level6 extends TheHauntedForestBaseLevel {

  constructor() {
    super(6,3, collectables_locations, {best: 3, minumum: 4});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map6' });
    const tileset = map.addTilesetImage('tileset', 'tileset_dark');
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
