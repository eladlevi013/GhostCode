import {
  createUIElements,
  collideTileMapLayer,
} from "../../phaserUtils/UI/gameUiHandler.js";
import BaseLevel from "../BaseLevel";

export default class TheHauntedForestBaseLevel extends BaseLevel {
  constructor(levelNumber, totalCollectables, gems, ranking) {
    super(levelNumber, totalCollectables, gems, "The Haunted Forest", ranking);
  }

  createWorldProps(treeFrame = 1, tantArea = true) {
    if (treeFrame > 0) {
      const treesReverseMargin = treeFrame === 1 ? 0 : 33;

      if (tantArea) {
        this.add
          .image(570 - 128, 300, "picnic_table")
          .setOrigin(0)
          .setScale(0.4);
        this.add
          .image(580 - 128, 100, "tant")
          .setOrigin(0)
          .setScale(0.3);
        // adding lantern
        this.lantern = this.add
          .sprite(698 - 128, 148, "lantern")
          .setOrigin(0)
          .setScale(0.1);
        this.anims.create({
          key: "lantern",
          frameRate: 10,
          repeat: -1,
          frames: this.anims.generateFrameNames("lantern", {
            prefix: "lantern_0",
            start: 1,
            end: 4,
            suffix: ".png",
          }),
        });
        this.lantern.anims.play("lantern");
        this.add
          .sprite(710 - 128, 130, "lantern_stand")
          .setOrigin(0)
          .setScale(0.1);
      }

      // Adding trees
      this.add
        .image(700 + treesReverseMargin, -330, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(640 + treesReverseMargin, -200, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(590 + treesReverseMargin, -100, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(590 + treesReverseMargin, 30, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(590 + treesReverseMargin, 130, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(610 + treesReverseMargin, 250, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(590 + treesReverseMargin, 350, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(1250 + treesReverseMargin, 460, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(590 + treesReverseMargin, 600, "tree_dark")
        .setOrigin(0)
        .setScale(0.7);
      // Left side trees
      this.add
        .image(10 - treesReverseMargin, -350, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(-70 - treesReverseMargin, -200, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(-100 - treesReverseMargin, -100, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(-90 - treesReverseMargin, 30, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(-90 - treesReverseMargin, 130, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(-70 - treesReverseMargin, 250, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      // Add owl
      this.anims.create({
        key: "owl_awake",
        frameRate: 20,
        repeat: -1,
        frames: this.anims.generateFrameNames("owl", {
          prefix: "owl_awake_0",
          start: 0,
          end: 19,
          suffix: ".png",
        }),
      });
      this.add
        .sprite(20 - treesReverseMargin / 2, 400, "owl")
        .setOrigin(0)
        .setScale(0.4)
        .play("owl_awake");
      this.add
        .image(-90 - treesReverseMargin, 350, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(-70 - treesReverseMargin, 460, "tree_dark")
        .setOrigin(0)
        .setScale(0.8);
      this.add
        .image(-90 - treesReverseMargin, 600, "tree_dark")
        .setOrigin(0)
        .setScale(0.7);
    }
    // creating UI elements
    createUIElements(this);
  }
}
