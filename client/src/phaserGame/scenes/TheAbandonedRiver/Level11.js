import { collideTileMapLayer } from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js";
import TheAbandonedRiverBaseLevel from "./TheAbandonedRiverBaseLevel.js";

// Constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 222, y: 300 },
  { type: "gem", x: 490, y: 300 },
  { type: "gem", x: 222, y: 505 },
  { type: "gem", x: 490, y: 505 },
];

const PLAYERS_LOCATIONS = [
  { type: PLAYER_TYPES.GHOST, x: 222, y: 720, name: "Herold" },
  { type: PLAYER_TYPES.GHOST, x: 490, y: 720, name: "Henri" },
];

export default class Level11 extends TheAbandonedRiverBaseLevel {
  constructor({ reduxDispatch }) {
    super(
      11,
      4,
      COLLECTABLES_LOCATIONS,
      { best: 2, minimum: 3 },
      reduxDispatch
    );
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: "map11" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // creating player, gems and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // creating world props
    this.createWorldProps(true, true);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
