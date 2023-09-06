import { createUIElements, collideTileMapLayer } from '../../utils/uiHandler.js';
import { createPlayer } from '../../utils/player.js';
import { createCollectables } from '../../utils/collectablesHandler.js';
import { handlingCode } from '../../utils/codeHandler.js';
import TheAbandonedRiverBaseLevel from './TheAbandonedRiverBaseLevel.js';

// constants
const collectables_locations = [{type: "gem", x: 222, y: 730},
{type: "gem", x: 490, y: 413}, {type: "gem", x: 222, y: 413}];
const players_locations = [{type: "ghost", x: 222, y: 625, name: "Herold"}, 
  {type: "ghost", x: 490, y: 720, name: "Henri"}];

export default class Level14 extends TheAbandonedRiverBaseLevel {
  constructor() {
    super(14,3, collectables_locations, {best: 6, minumum: 7});
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

    // fish animation
    this.anims.create({
      key: 'fish_idle',
      frames: this.anims.generateFrameNumbers('fish', { start: 0, end: 19 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'fish_swimming',
      frames: this.anims.generateFrameNumbers('fish_swimming', { start: 0, end: 14 }),
      frameRate: 20,
      repeat: -1
    });
    this.players.fish = this.physics.add.sprite(190, 290, 'fish').setScale(0.2).setDepth(1).play('fish_idle');
    this.players.fish.flipX = true;

    // creating world props
    this.createWorldProps([{x: 425, y: 600}, {x: 140, y: 500}], 
      [{x: 480, y: 490}, {x: 480, y: 263}],
      true, true);

    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
  
  update() {
  }
}
