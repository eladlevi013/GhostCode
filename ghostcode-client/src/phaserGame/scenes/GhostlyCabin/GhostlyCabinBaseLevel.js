import Phaser from "phaser";
import BaseLevel from "../BaseLevel.js";

export default class GhostlyCabniBaseLevel extends BaseLevel {
  constructor(levelNumber, totalCollectables, gems, ranking) {
    super(levelNumber, totalCollectables, gems, "Ghostly Cabin", ranking);
  }

  createWorldProps(lantern_location, fenceLocations = [], keysLocations = []) {
    this.anims.create({
      key: "spider",
      frameRate: 10,
      frames: this.anims.generateFrameNames("spider", {
        prefix: "idle_",
        start: 1,
        end: 24,
        suffix: ".png",
      }),
      repeat: -1,
    });
    this.add
      .image(525, 0, "web_2")
      .setOrigin(0)
      .setScale(0.1)
      .setDepth(1)
      .setRotation(Phaser.Math.DegToRad(0))
      .setAlpha(0.6);
    this.lantern = this.add
      .sprite(lantern_location.x, lantern_location.y, "lantern")
      .setOrigin(0)
      .setScale(0.17);
    // Calculate the initial offset between lantern and shadw
    var offsetX = 11;
    var offsetY = 76;
    this.shadow = this.add
      .sprite(this.lantern.x + offsetX, this.lantern.y + offsetY, "shadow")
      .setOrigin(0)
      .setScale(0.27)
      .setAlpha(0.4);
    this.anims.create({
      key: "lantern",
      frameRate: 10,
      frames: this.anims.generateFrameNames("lantern", {
        prefix: "lantern_0",
        start: 1,
        end: 4,
        suffix: ".png",
      }),
      repeat: -1,
    });
    this.lantern.anims.play("lantern");
    this.anims.create({
      key: "fence_metal",
      frameRate: 10,
      frames: this.anims.generateFrameNames("fence_metal", {
        prefix: "meta_spike_",
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
      for (let j = 0; j < 4; j++) {
        const fence = singleFenceGroup
          .create(
            fenceLocations[i].x + j * 28,
            fenceLocations[i].y,
            "fence_metal"
          )
          .setScale(0.5)
          .setDepth(0);
        fence.body.setSize(20, 150);
      }
      fences.push(singleFenceGroup);
    }

    // making the fence collidable
    for (let i = 0; i < fences.length; i++) {
      fenceCollider.push([]);
      for (let j = 0; j < this.players.mice.length; j++) {
        fenceCollider[i].push(
          this.physics.add.collider(this.players.mice[j], fences[i])
        );
      }
    }

    // creating the keys on the game
    for (let i = 0; i < keysLocations.length; i++) {
      let key = this.physics.add
        .image(keysLocations[i].x, keysLocations[i].y, "key_metal")
        .setOrigin(0)
        .setScale(0.35);

      const collectKey = (player, key) => {
        collectedKeys++;
        key.disableBody(true, true);
        this.time.addEvent({
          delay: 200,
          callback: () => {
            fences[collectedKeys - 1].playAnimation("fence_metal");
            // make the fence not collidable
            for (let j = 0; j < this.players.mice.length; j++) {
              fenceCollider[collectedKeys - 1][j].destroy();
            }
          },
        });
      };

      // make the keys collidable
      for (let b = 0; b < this.players.mice.length; b++) {
        this.physics.add.overlap(
          this.players.mice[b],
          key,
          collectKey,
          null,
          this
        );
      }
      if (this.players.fish)
        this.physics.add.overlap(
          this.players.fish,
          key,
          collectKey,
          null,
          this
        );
    }
  }

  update() {}
}
