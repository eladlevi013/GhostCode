import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js"; // Import PLAYER_TYPES if it is used
import {
  createUIElements,
  collideTileMapLayer,
} from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import TheHauntedForestBaseLevel from "./TheHauntedForestBaseLevel.js";

// Constants should be in UPPER_SNAKE_CASE
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 497, y: 643 },
  { type: "gem", x: 200, y: 143 },
  { type: "gem", x: 497, y: 143 },
];

const PLAYERS_LOCATIONS = [{ type: PLAYER_TYPES.GHOST, x: 200, y: 643 }];

export default class Level7 extends TheHauntedForestBaseLevel {
  constructor({ reduxDispatch }) {
    super(7, 3, COLLECTABLES_LOCATIONS, { best: 3, minimum: 6 }, reduxDispatch);
  }

  create() {
    // Creating tilemap from json
    const map = this.make.tilemap({ key: "map7" });
    const tileset = map.addTilesetImage("tileset", "tileset_dark");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // Creating world props
    this.createWorldProps(1, false);
    // Creating player, gems, and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // Making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
