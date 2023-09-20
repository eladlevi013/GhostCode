import { createUIElements, collideTileMapLayer } from '../../phaserUtils/UI/gameUiHandler.js';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheHauntedForestBaseLevel from './TheHauntedForestBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 455, y: 320},
  {type: "gem", x: 350, y: 143}, {type: "gem", x: 243, y: 320}, 
  {type: "gem", x: 350, y: 497}, {type: "gem", x: 540, y: 497}];
const players_locations = [{type: "ghost", x: 140, y: 503}];

export default class Level8 extends TheHauntedForestBaseLevel {

  constructor() {
    super(8,5, collectables_locations, {best: 4, minumum: 6});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map8' });
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
