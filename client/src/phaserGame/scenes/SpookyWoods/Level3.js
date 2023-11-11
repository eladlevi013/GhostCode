import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js";
import { collideTileMapLayer } from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import SpookyWoodsBaseLevel from "./SpookyWoodsBaseLevel.js";

// constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 360, y: 220 },
  { type: "gem", x: 480, y: 505 },
  { type: "gem", x: 222, y: 505 },
];

const PLAYERS_LOCATIONS = [{ type: PLAYER_TYPES.GHOST, x: 222, y: 720 }];

export default class Level3 extends SpookyWoodsBaseLevel {
  constructor({ reduxDispatch }) {
    super(3, 3, COLLECTABLES_LOCATIONS, { best: 5, minimum: 6 }, reduxDispatch);
  }

  create() {
    // creating tilemap from json
    const map = this.make.tilemap({ key: "map3" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // creating world props
    this.createWorldProps(true, false);
    // creating player, gems and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
