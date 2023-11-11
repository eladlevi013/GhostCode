import { collideTileMapLayer } from "../../phaserUtils/UI/gameUiHandler.js";
import { createPlayer } from "../../phaserUtils/player/playerCreator.js";
import { createCollectables } from "../../phaserUtils/collectablesHandler.js";
import { PLAYER_TYPES } from "../../phaserUtils/player/playerConstants.js";
import TheAbandonedRiverBaseLevel from "./TheAbandonedRiverBaseLevel.js";

// Constants
const COLLECTABLES_LOCATIONS = [
  { type: "gem", x: 222, y: 150 },
  { type: "gem", x: 490, y: 200 },
  { type: "gem", x: 222, y: 445 },
];

const PLAYERS_LOCATIONS = [
  { type: PLAYER_TYPES.GHOST, x: 222, y: 720, name: "Herold" },
  { type: PLAYER_TYPES.GHOST, x: 490, y: 720, name: "Henri" },
];

export default class Level13 extends TheAbandonedRiverBaseLevel {
  constructor({ reduxDispatch }) {
    super(
      13,
      3,
      COLLECTABLES_LOCATIONS,
      { best: 3, minimum: 4 },
      reduxDispatch
    );
  }

  create() {
    // Creating tilemap from json
    const map = this.make.tilemap({ key: "map13" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const grassLayer = map.createLayer("grass", tileset, 0, 0);
    // Creating player, gems, and UI elements
    createPlayer(this, PLAYERS_LOCATIONS);
    createCollectables(this, COLLECTABLES_LOCATIONS);
    // Creating world props
    this.createWorldProps(
      [
        { x: 145, y: 550 },
        { x: 425, y: 400 },
        { x: 145, y: 250 },
      ],
      [
        { x: 475, y: 270 },
        { x: 210, y: 330 },
        { x: 475, y: 530 },
      ],
      true,
      true
    );

    // Making the grass layer collidable with the player
    grassLayer.setCollisionByExclusion([-1]);
    collideTileMapLayer(this, grassLayer);
  }
}
