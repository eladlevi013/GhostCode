import Phaser from "phaser";
import { handlingCode } from "../phaserUtils/codeProcessHandler";
import { PLAYER_TYPES } from "../phaserUtils/player/playerConstants";

export default class BaseLevel extends Phaser.Scene {
  constructor(
    levelNumber,
    totalCollectables,
    collectables,
    worldName,
    ranking,
    reduxDispatch
  ) {
    console.log("BaseLevel: " + levelNumber + " " + worldName);
    super({ key: `level${levelNumber}` });
    this.worldName = worldName;
    this.level = levelNumber;
    this.players = { ghosts: [], mice: [] };
    this.movingTimer = null;
    this.collectablesCounter = 0;
    this.totalCollectables = totalCollectables;
    this.meter = null;
    this.meterFlag = false;
    this.meterStarting = null;
    this.collectables = collectables;
    this.ranking = ranking;
    this.lineNumber = 0;
    this.reduxDispatch = reduxDispatch;
  }

  preload() {
    // Preloading the maps
    this.load.tilemapTiledJSON("map1", "assets/levels/spooky_woods/map1.tmj");
    this.load.tilemapTiledJSON("map2", "assets/levels/spooky_woods/map2.tmj");
    this.load.tilemapTiledJSON("map3", "assets/levels/spooky_woods/map3.tmj");
    this.load.tilemapTiledJSON("map4", "assets/levels/spooky_woods/map4.tmj");
    this.load.tilemapTiledJSON("map5", "assets/levels/spooky_woods/map5.tmj");
    this.load.tilemapTiledJSON(
      "map6",
      "assets/levels/the_haunted_forest/map1.tmj"
    );
    this.load.tilemapTiledJSON(
      "map7",
      "assets/levels/the_haunted_forest/map1.tmj"
    );
    this.load.tilemapTiledJSON(
      "map8",
      "assets/levels/the_haunted_forest/map2.tmj"
    );
    this.load.tilemapTiledJSON(
      "map9",
      "assets/levels/the_haunted_forest/map2.tmj"
    );
    this.load.tilemapTiledJSON(
      "map10",
      "assets/levels/the_haunted_forest/map2.tmj"
    );
    this.load.tilemapTiledJSON(
      "map11",
      "assets/levels/the_abandoned_river/map1.tmj"
    );
    this.load.tilemapTiledJSON(
      "map12",
      "assets/levels/the_abandoned_river/map1.tmj"
    );
    this.load.tilemapTiledJSON(
      "map13",
      "assets/levels/the_abandoned_river/map1.tmj"
    );
    this.load.tilemapTiledJSON(
      "map14",
      "assets/levels/the_abandoned_river/map2.tmj"
    );
    this.load.tilemapTiledJSON(
      "map15",
      "assets/levels/the_abandoned_river/map2.tmj"
    );
    this.load.tilemapTiledJSON("map16", "assets/levels/ghostly_cabin/map1.tmj");
    this.load.tilemapTiledJSON("map17", "assets/levels/ghostly_cabin/map1.tmj");
    this.load.tilemapTiledJSON("map18", "assets/levels/ghostly_cabin/map1.tmj");
    this.load.tilemapTiledJSON("map19", "assets/levels/ghostly_cabin/map1.tmj");
    this.load.tilemapTiledJSON("map20", "assets/levels/ghostly_cabin/map1.tmj");
    // Loading tilesets
    this.load.image("tiles", "assets/levels/tileset.png");
    this.load.image(
      "tileset_dark",
      "assets/levels/the_haunted_forest/tileset_dark.png"
    );
    this.load.image(
      "tileset_wood",
      "assets/levels/ghostly_cabin/tileset_wood.png"
    );
    // Loading players
    this.load.atlas(
      PLAYER_TYPES.GHOST,
      "assets/players/ghost/ghost.png",
      "assets/players/ghost/ghost.json"
    );
    this.load.atlas(
      PLAYER_TYPES.MOUSE,
      "assets/players/mouse/mouse.png",
      "assets/players/mouse/mouse.json"
    );
    this.load.spritesheet("fish", "assets/fish/anchovy_idle.png", {
      frameWidth: 503,
      frameHeight: 169,
    });
    this.load.spritesheet("fish_swimming", "assets/fish/anchovy_swimming.png", {
      frameWidth: 503,
      frameHeight: 169,
    });
    // Collectables
    this.load.spritesheet("gem", "assets/gems/gem.png", {
      frameWidth: 196,
      frameHeight: 256,
    });
    this.load.image("cheese_1", "assets/cheese/cheese_1.png");
    this.load.image("cheese_2", "assets/cheese/cheese_2.png");
    // Level props
    this.load.image("tree", "assets/trees/tree.png");
    this.load.image("tree_dark", "assets/trees/tree_dark.png");
    this.load.image("tant", "assets/other/tant.png");
    this.load.atlas(
      "lantern",
      "assets/lantern/lantern.png",
      "assets/lantern/lantern.json"
    );
    this.load.image("lantern_stand", "assets/lantern/lantern_stand.png");
    this.load.image("picnic_table", "assets/other/picnic_table.png");
    this.load.image("shadow", "assets/lantern/lantern_shadow.png");
    this.load.atlas("owl", "assets/owl/owl.png", "assets/owl/owl.json");
    this.load.atlas(
      "spider",
      "assets/spider/spider.png",
      "assets/spider/spider.json"
    );
    this.load.image("web_1", "assets/spider/spider_web/web_1.png");
    this.load.image("web_2", "assets/spider/spider_web/web_2.png");
    // UI Elements
    this.load.image("2x_button", "assets/UI/2x_button.png");
    this.load.image("1x_button", "assets/UI/1x_button.png");
    this.load.image("map_button", "assets/UI/map_button.png");
    this.load.image("wide_panel", "assets/UI/wide_panel.png");
    this.load.image("meter_point", "assets/meter/meter_point.png");
    this.load.image("retry_button", "assets/UI/retry_button.png");
    this.load.image("next_level_button", "assets/UI/arrow_forward_button.png");
    this.load.image("menu_button", "assets/UI/menu_button.png");
    this.load.image("star", "assets/UI/stars/star.png");
    this.load.image("star_empty", "assets/UI/stars/star_empty.png");
    this.load.image("key", "assets/keys/key_2.png");
    this.load.image("key_metal", "assets/keys/key_1.png");
    this.load.atlas(
      "fence",
      "assets/fence/wooden_fence/wooden_fence.png",
      "assets/fence/wooden_fence/wooden_fence.json"
    );
    this.load.atlas(
      "fence_metal",
      "assets/fence/metal_fence/metal_fence.png",
      "assets/fence/metal_fence/metal_fence.json"
    );
    this.load.image("wood", "assets/levels/ghostly_cabin/bg_wood.png");
  }

  parseCode(text) {
    handlingCode(this, text);
  }

  init(data) {
    this.collectablesCounter = 0;
  }

  startLevel(level) {
    this.collectablesCounter = 0;
    this.scene.start(`level${level}`);
  }
}
