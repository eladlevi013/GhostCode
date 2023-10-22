import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js";
import { collideTileMapLayer } from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import TheHauntedForestBaseLevel from "./TheHauntedForestBaseLevel.js";

// Constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 497, y: 510 },
  { type: "gem", x: 497, y: 608 },
  { type: "gem", x: 597, y: 608 },
  { type: "gem", x: 597, y: 510 },
  { type: "gem", x: 200, y: 213 },
  { type: "gem", x: 200, y: 115 },
  { type: "gem", x: 100, y: 115 },
  { type: "gem", x: 100, y: 213 },
  { type: "gem", x: 497, y: 213 },
  { type: "gem", x: 597, y: 115 },
  { type: "gem", x: 497, y: 115 },
  { type: "gem", x: 597, y: 213 },
];
const PLAYERS_LOCATIONS = [{ type: PLAYER_TYPES.GHOST, x: 200, y: 510 }];

export default class Level6 extends TheHauntedForestBaseLevel {
  constructor() {
    super(10, 12, COLLECTABLES_LOCATIONS, { best: 6, minimum: 8 });
  }

  create() {
    // Creating tilemap from json
    const map = this.make.tilemap({ key: "map10" });
    const tileset = map.addTilesetImage("tileset", "tileset_dark");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // Creating world props
    this.createWorldProps(2, false);
    // Creating player, gems, and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // Making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
