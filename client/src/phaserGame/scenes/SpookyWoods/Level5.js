import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js";
import { collideTileMapLayer } from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import SpookyWoodsBaseLevel from "./SpookyWoodsBaseLevel.js";

// constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 285, y: 300 },
  { type: "gem", x: 410, y: 300 },
  { type: "gem", x: 285, y: 505 },
];

const PLAYERS_LOCATIONS = [{ type: PLAYER_TYPES.GHOST, x: 92, y: 700 }];

export default class Level5 extends SpookyWoodsBaseLevel {
  constructor({ reduxDispatch }) {
    super(
      5,
      3,
      COLLECTABLES_LOCATIONS,
      { best: 13, minimum: 14 },
      reduxDispatch
    );
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: "map5" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // creating world props
    this.createWorldProps(false, false);
    // creating player, gems, and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
