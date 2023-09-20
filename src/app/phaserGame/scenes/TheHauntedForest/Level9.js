import { createUIElements, collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheHauntedForestBaseLevel from './TheHauntedForestBaseLevel.js';

// constants
let x = 45;
let y = 50;
const collectables_locations = [{type: "gem", x: 300 + x, y: 300 + y}, {type: "gem", x: 500 + x, y: 300 +y},
 {type: "gem", x: 500 + x, y: 600 + y}, {type: "gem", x: 100 + x, y: 600 + y}, {type: "gem", x: 100 + x, y: 110 +y}];
const players_locations = [{type: "ghost", x: 300 + x, y: 400 + y}];

export default class Level9 extends TheHauntedForestBaseLevel {

  constructor() {
    super(9,5, collectables_locations, {best: 3, minumum: 5});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map9' });
    const tileset = map.addTilesetImage('tileset', 'tileset_dark');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);
    
    // creating world props
    this.createWorldProps(false, false);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createCollectables(this, collectables_locations);

    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
