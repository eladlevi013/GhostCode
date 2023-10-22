import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js";
import { collideTileMapLayer } from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import TheHauntedForestBaseLevel from "./TheHauntedForestBaseLevel.js";

// constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 345, y: 350 },
  { type: "gem", x: 545, y: 350 },
  { type: "gem", x: 545, y: 650 },
  { type: "gem", x: 145, y: 650 },
  { type: "gem", x: 145, y: 160 },
];
const PLAYERS_LOCATIONS = [{ type: PLAYER_TYPES.GHOST, x: 345, y: 450 }];

export default class Level9 extends TheHauntedForestBaseLevel {
  constructor() {
    super(9, 5, COLLECTABLES_LOCATIONS, { best: 3, minimum: 5 });
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: "map9" });
    const tileset = map.addTilesetImage("tileset", "tileset_dark");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // creating world props
    this.createWorldProps(2, false);
    // creating player, gems, and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
