import {
  createUIElements,
  collideTileMapLayer,
} from "../../phaserUtils/UI/gameUiHandler.js";
import BaseLevel from "../BaseLevel";

export default class TheAbandonedRiverBaseLevel extends BaseLevel {
  constructor(levelNumber, totalCollectables, gems, ranking, reduxDispatch) {
    super(
      levelNumber,
      totalCollectables,
      gems,
      "The Abandoned River",
      ranking,
      reduxDispatch
    );
  }

  createWorldProps(
    fenceLocations,
    keysLocations,
    treeFrame = true,
    tantArea = true
  ) {
    // adding props to the map
    this.add
      .image(600 - 128, -270, "tree")
      .setOrigin(0)
      .setScale(0.8)
      .setDepth(5);
    this.add
      .image(700 - 128, -150, "tree")
      .setOrigin(0)
      .setScale(0.8)
      .setDepth(5);
    this.add
      .image(550 - 128, -330, "tree")
      .setOrigin(0)
      .setScale(0.8)
      .setDepth(4);
    // adding trees
    this.add
      .image(730 - 128, 0, "tree")
      .setOrigin(0)
      .setScale(0.8)
      .setDepth(5);
    this.add
      .image(700 - 128, 120, "tree")
      .setOrigin(0)
      .setScale(0.8)
      .setDepth(5);
    this.add
      .image(690 - 128, 250, "tree")
      .setOrigin(0)
      .setScale(0.9)
      .setDepth(5);
    this.add
      .image(710 - 128, 360, "tree")
      .setOrigin(0)
      .setScale(0.8)
      .setDepth(5);
    this.add
      .image(690 - 128, 500, "tree")
      .setOrigin(0)
      .setScale(0.7)
      .setDepth(5);
    this.add
      .image(730 - 128, 600, "tree")
      .setOrigin(0)
      .setScale(0.7)
      .setDepth(5);
    // left side trees
    this.add.image(60, -330, "tree").setOrigin(0).setScale(0.8).setDepth(1);
    this.add.image(0, -200, "tree").setOrigin(0).setScale(0.8).setDepth(2);
    this.add.image(-50, -100, "tree").setOrigin(0).setScale(0.8).setDepth(3);
    this.add.image(-50, 30, "tree").setOrigin(0).setScale(0.8).setDepth(4);
    this.add.image(-50, 130, "tree").setOrigin(0).setScale(0.8).setDepth(5);
    this.add.image(-30, 250, "tree").setOrigin(0).setScale(0.8).setDepth(6);
    // add owl
    this.anims.create({
      key: "owl_awake",
      frameRate: 20,
      frames: this.anims.generateFrameNames("owl", {
        prefix: "owl_awake_0",
        start: 16,
        end: 19,
        suffix: ".png",
      }),
      repeat: -1,
    });
    this.add
      .sprite(60, 400, "owl")
      .setOrigin(0)
      .setScale(0.4)
      .play("owl_awake")
      .setDepth(7);
    this.add.image(-50, 350, "tree").setOrigin(0).setScale(0.8).setDepth(7);
    this.add.image(-30, 460, "tree").setOrigin(0).setScale(0.8).setDepth(8);
    this.add.image(-50, 600, "tree").setOrigin(0).setScale(0.7).setDepth(9);
    // creating UI elements
    createUIElements(this);
    // creating fence animation
    this.anims.create({
      key: "fence",
      frameRate: 10,
      frames: this.anims.generateFrameNames("fence", {
        prefix: "fence_0",
        start: 1,
        end: 6,
        suffix: ".png",
      }),
      repeat: 0,
    });

    // creating the fence
    let keys = [];
    let fences = [];
    let fenceCollider = [];
    let collectedKeys = 0;

    // creating the fence
    for (let i = 0; i < fenceLocations.length; i++) {
      let singleFenceGroup = this.physics.add.staticGroup();
      for (let j = 0; j < 8; j++) {
        const fence = singleFenceGroup
          .create(fenceLocations[i].x + j * 20, fenceLocations[i].y, "fence")
          .setScale(0.5)
          .setDepth(0);
        fence.body.setSize(20, 150);
      }
      fences.push(singleFenceGroup);
    }

    // making the fence collidable
    for (let i = 0; i < fences.length; i++) {
      fenceCollider.push([]);
      for (let j = 0; j < this.players.ghosts.length; j++) {
        fenceCollider[i].push(
          this.physics.add.collider(this.players.ghosts[j], fences[i])
        );
      }
    }

    // creating the keys on the game
    for (let i = 0; i < keysLocations.length; i++) {
      let key = this.physics.add
        .image(keysLocations[i].x, keysLocations[i].y, "key")
        .setOrigin(0)
        .setScale(0.4);

      const collectKey = (player, key) => {
        collectedKeys++;
        key.disableBody(true, true);
        this.time.addEvent({
          delay: 200,
          callback: () => {
            fences[collectedKeys - 1].playAnimation("fence");
            // make the fence not collidable
            for (let j = 0; j < this.players.ghosts.length; j++) {
              fenceCollider[collectedKeys - 1][j].destroy();
            }
          },
        });
      };

      // make the keys collidable
      for (let b = 0; b < this.players.ghosts.length; b++) {
        this.physics.add.overlap(
          this.players.ghosts[b].getAt(0),
          key,
          collectKey,
          null,
          this
        );
      }

      for (let b = 0; b < this.players.fish.length; b++) {
        this.physics.add.overlap(
          this.players.fish[b].getAt(0),
          key,
          collectKey,
          null,
          this
        );
      }
    }
  }
}
