import {
  createUIElements,
  collideTileMapLayer,
} from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import GhostlyCabniBaseLevel from "./GhostlyCabinBaseLevel.js";
import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js";

// constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 175, y: 220 },
  { type: "gem", x: 347, y: 220 },
  { type: "gem", x: 519, y: 220 },
  { type: "gem", x: 175, y: 420 },
  { type: "gem", x: 347, y: 420 },
  { type: "gem", x: 519, y: 420 },
];

const PLAYERS_LOCATIONS = [
  { type: PLAYER_TYPES.GHOST, x: 170, y: 620, name: "ghosts[0]" },
  { type: PLAYER_TYPES.GHOST, x: 342, y: 620, name: "ghosts[1]" },
];

export default class Level17 extends GhostlyCabniBaseLevel {
  constructor({ reduxDispatch }) {
    super(
      17,
      6,
      COLLECTABLES_LOCATIONS,
      { best: 3, minimum: 4 },
      reduxDispatch
    );
  }

  create() {
    const map = this.make.tilemap({ key: "map17" });
    const tileset = map.addTilesetImage("tileset", "tileset_wood");
    const grassLayer = map.createLayer("grass", tileset, -8, -10);
    this.add.image(0, 0, "wood").setOrigin(0).setScale(1, 0.99).setDepth(-1);
    // creating player, gems and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createUIElements(this);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    this.createWorldProps({ x: 472, y: 570 }, [], []);
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
