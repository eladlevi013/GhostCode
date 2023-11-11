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
  { type: "cheese", x: 200, y: 250 },
  { type: "cheese", x: 340, y: 250 },
  { type: "cheese", x: 480, y: 250 },
  { type: "cheese", x: 200, y: 650 },
  { type: "cheese", x: 340, y: 650 },
  { type: "cheese", x: 480, y: 650 },
];

const PLAYERS_LOCATIONS = [
  { type: PLAYER_TYPES.MOUSE, x: 200, y: 450, name: "mice[0]" },
  { type: PLAYER_TYPES.MOUSE, x: 340, y: 450, name: "mice[1]" },
  { type: PLAYER_TYPES.MOUSE, x: 480, y: 450, name: "mice[2]" },
];

export default class Level18 extends GhostlyCabniBaseLevel {
  constructor({ reduxDispatch }) {
    super(
      18,
      6,
      COLLECTABLES_LOCATIONS,
      { best: 3, minimum: 4 },
      reduxDispatch
    );
  }

  create() {
    const map = this.make.tilemap({ key: "map18" });
    const tileset = map.addTilesetImage("tileset", "tileset_wood");
    const grassLayer = map.createLayer("grass", tileset, -8, -10);
    this.add.image(0, 0, "wood").setOrigin(0).setScale(1, 0.99).setDepth(-1);
    // creating player, gems and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createUIElements(this);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    this.createWorldProps({ x: 70, y: 80 });
    // making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }

  update() {}
}
