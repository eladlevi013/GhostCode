import { createUIElements, collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheHauntedForestBaseLevel from './TheHauntedForestBaseLevel.js';

// constants
let y = 70;
const collectables_locations = [
  {type: "gem", x: 497, y: 440 + y},
  {type: "gem", x: 497, y: 538 + y},
  {type: "gem", x: 597, y: 538 + y},
  {type: "gem", x: 597, y: 440 + y},
  {type: "gem", x: 200, y: 143 + y}, 
  {type: "gem", x: 200, y: 45 + y}, 
  {type: "gem", x: 100, y: 45 + y}, 
  {type: "gem", x: 100, y: 143 + y}, 
  {type: "gem", x: 497, y: 143 + y},
  {type: "gem", x: 597, y: 45 + y},
  {type: "gem", x: 497, y: 45 + y},
  {type: "gem", x: 597, y: 143 + y},
];
const players_locations = [{type: "ghost", x: 200, y: 440 + y}];

export default class Level6 extends TheHauntedForestBaseLevel {

  constructor() {
    super(10,12, collectables_locations, {best: 6, minumum: 8});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map10' });
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
