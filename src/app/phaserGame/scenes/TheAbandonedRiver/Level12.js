import { collideTileMapLayer } from '../../phaserUtils/gameUiHandler';
import { createPlayer } from '../../phaserUtils/player/playerCreator.js';
import { createCollectables } from '../../phaserUtils/collectablesHandler.js';
import TheAbandenRiverBaseLevel from './TheAbandonedRiverBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 222, y: 300},
{type: "gem", x: 490, y: 310}, {type: "gem", x: 222, y: 505}];
const players_locations = [{type: "ghost", x: 222, y: 720, name: 'Herold'}, 
  {type: "ghost", x: 490, y: 720, name: 'Henri'}];

export default class Level12 extends TheAbandenRiverBaseLevel {
  constructor() {
    super(12,3, collectables_locations, {best: 2, minumum: 3});
  }

  create() {

    // creating tilemap from json
    const map = this.make.tilemap({ key: 'map12' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const grassLayer = map.createLayer('grass', tileset, 0, 0);

    // creating player, gems and UI elements
    createPlayer(this, players_locations);
    createCollectables(this, collectables_locations); 

    // creating world props
    this.createWorldProps([{x: 425, y: 400}], [{x: 210, y: 140}], true, true);
    
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {
  }
}