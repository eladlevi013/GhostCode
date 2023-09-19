import { createUIElements, collideTileMapLayer } from '../../utils/uiHandler.js';
import { createPlayer } from '../../utils/player.js';
import { createCollectables } from '../../utils/collectablesHandler.js';
import { handlingCode } from '../../utils/codeHandler.js';
import TheAbandonedRiverBaseLevel from './TheAbandonedRiverBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 222, y: 150},
{type: "gem", x: 490, y: 200}, {type: "gem", x: 222, y: 445}];
const players_locations = [{type: "ghost", x: 222, y: 720, name: "Herold"}, 
  {type: "ghost", x: 490, y: 720, name: "Henri"}];

export default class Level13 extends TheAbandonedRiverBaseLevel {
  constructor() {
    super(13,3, collectables_locations, {best: 3, minumum: 4});
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map13' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createCollectables(this, collectables_locations);

    // creating world props
    this.createWorldProps([{x: 145, y: 550}, {x: 425, y: 400}, {x: 145, y: 250}], 
      [{x: 475, y: 270}, {x: 210, y: 330}, {x: 475, y: 530}],
      true, true);

    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {
  }
}
