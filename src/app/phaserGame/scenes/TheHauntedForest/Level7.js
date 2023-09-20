import { collideTileMapLayer } from '../../phaserUtils/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheHauntedForestBaseLevel from './TheHauntedForestBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 497, y: 643},
  {type: "gem", x: 200, y: 143}, {type: "gem", x: 497, y: 143}];
const players_locations = [{type: "ghost", x: 200, y: 643}];

export default class Level6 extends TheHauntedForestBaseLevel {

  constructor() {
    super(7,3, collectables_locations, {best: 3, minumum: 6});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map7' });
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
