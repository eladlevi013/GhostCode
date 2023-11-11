import {
  createUIElements,
  collideTileMapLayer,
} from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js"; // Ensure you create and export this constant in the appropriate module
import TheAbandonedRiverBaseLevel from "./TheAbandonedRiverBaseLevel.js";

// Constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 222, y: 730 },
  { type: "gem", x: 490, y: 413 },
  { type: "gem", x: 222, y: 413 },
];

const PLAYERS_LOCATIONS = [
  { type: PLAYER_TYPES.GHOST, x: 222, y: 625, name: "Herold" },
  { type: PLAYER_TYPES.GHOST, x: 490, y: 720, name: "Henri" },
  { type: PLAYER_TYPES.FISH, x: 190, y: 290, name: "Bob", flip: true },
];

export default class Level15 extends TheAbandonedRiverBaseLevel {
  constructor({ reduxDispatch }) {
    super(
      15,
      3,
      COLLECTABLES_LOCATIONS,
      { best: 5, minimum: 6 },
      reduxDispatch
    );
  }

  create() {
    // Creating tilemap from json
    const map = this.make.tilemap({ key: "map15" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // Creating player, gems, and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // Creating world props
    this.createWorldProps(
      [
        { x: 425, y: 600 },
        { x: 140, y: 500 },
      ],
      [
        { x: 480, y: 490 },
        { x: 480, y: 263 },
      ],
      true,
      true
    );
    // Making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
