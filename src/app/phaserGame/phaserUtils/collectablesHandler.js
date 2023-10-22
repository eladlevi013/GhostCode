import { showFinishLevelPanel } from "./UI/levelFinishHandler.js";

export function createCollectables(scene, collectablesLocations, size = -1) {
  let cheese = scene.physics.add.group({});
  let gems = scene.physics.add.group({});
  createGemAnimation(scene);

  // creating collectables
  for (let i = 0; i < collectablesLocations.length; i++) {
    let location = collectablesLocations[i];

    if (collectablesLocations[i].type === "gem") {
      gems
        .create(location.x, location.y, "gem")
        .setScale(0.17)
        .anims.play("gemRotation");
    } else if (collectablesLocations[i].type === "cheese") {
      cheese
        .create(
          location.x,
          location.y,
          `cheese_${Math.floor(Math.random() * 2) + 1}`
        )
        .setScale(0.08);
    }
  }

  // making the gems collectable
  for (let i = 0; i < scene.players.ghosts.length; i++) {
    scene.physics.add.overlap(
      scene.players.ghosts[i].getAt(0),
      gems,
      (player, object) => collect(player, object, scene),
      null,
      scene
    );
  }

  // making the cheese collectable
  for (let i = 0; i < scene.players.mice.length; i++) {
    scene.physics.add.overlap(
      scene.players.mice[i].getAt(0),
      cheese,
      (player, object) => collect(player, object, scene),
      null,
      scene
    );
  }
}

// create gems animation
export function createGemAnimation(scene) {
  scene.anims.create({
    key: "gemRotation",
    frames: scene.anims.generateFrameNumbers("gem", { objectt: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
}

// collecting gems functionality
function collect(player, object, scene) {
  object.disableBody(true, true);
  scene.collectablesCounter += 1;

  // when level is over
  if (scene.collectablesCounter == scene.totalCollectables) {
    scene.time.delayedCall(100, () => {
      player.setVelocity(0, 0);
    });

    // open end game panel
    scene.time.delayedCall(
      600,
      () => {
        // calculate ranking
        let stars =
          scene.ranking.best >= scene.lineNumber.value
            ? 3
            : scene.ranking.minimum > scene.lineNumber.value
            ? 2
            : 1;
        // show finished level panel
        showFinishLevelPanel(scene, stars);
      },
      null,
      scene
    );
  }
}
