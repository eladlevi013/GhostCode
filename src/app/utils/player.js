// regardless of the player type, the player will move forward
// regardless of the player type, the player will move forward
export function movePlayerForward(steps = 0, scene, player, playerType = "ghost") {
console.log("steps: " + steps + " playerType: " + playerType + " player: " + player);

  return new Promise((resolve) => {
    let velocity = null;

    if (scene.movingTimer) {
      scene.movingTimer = null;
    }
    
    // moving the player by player type
    if(playerType == "fish")
    {
      const speed = scene.speed == 1 ? 200 : 400;
      velocity = new Phaser.Math.Vector2(speed, 0).rotate(player.getAt(0).rotation);
      player.body.setVelocity(velocity.x, velocity.y);
    }
    else
    {
      const speed = scene.speed == 1 ? 200 : 400;
      velocity = new Phaser.Math.Vector2(0, -1 * speed).rotate(player.getAt(0).rotation);
      player.body.setVelocity(velocity.x, velocity.y);
    }

    // walking animation by player type
    if (playerType == "mouse")
      player.anims.play('mouse_walk');

    scene.movingTimer = scene.time.delayedCall(100 * steps, () => {
      player.body.setVelocity(0, 0);
      scene.movingTimer = null;
      // idle animation by player type
      if(playerType == "mouse")
        player.anims.play('mouse_idle');

      // Update the meter's starting point based on the player's movement
      if (scene.meterStarting) {
        scene.meterStarting.x += velocity.x * steps;
        scene.meterStarting.y += velocity.y * steps;
      }

      resolve();
    });
  });
}

// regardless of the player type, the player will rotate
export function rotatePlayerTo(angle = 0, scene, player) {
  // Pause the player's animation
  const isPlaying = player.getAt(0).anims.isPlaying;
  if (isPlaying) {
    player.getAt(0).anims.pause();
  }

  return new Promise((resolve) => {
    const targetRotation = player.getAt(0).rotation + Phaser.Math.DegToRad(angle);
    scene.tweens.add({
      targets: player.getAt(0),
      rotation: targetRotation,
      duration: 500,
      ease: 'Linear',
      onComplete: () => {
        // Resume the player's animation if it was playing
        if (isPlaying) {
          player.getAt(0).anims.resume();
        }
        resolve();
      },
    });
  });
}

// creating animations for the mouse
export function createMouseAnimations(scene)
{
  scene.anims.create({
    key: 'mouse_idle',
    frameRate: 10,
    frames: scene.anims.generateFrameNames('mouse',
      {prefix: 'idle_0', start: 0, end: 17, suffix: '.png'}),
    repeat: -1
  });
  scene.anims.create({
    key: 'mouse_walk',
    frameRate: 10,
    frames: scene.anims.generateFrameNames('mouse', 
      {prefix: 'walk_0', start: 0, end: 7, suffix: '.png'}),
    repeat: -1
  });
}

// creating animations for the ghost
export function createGhostAnimations(scene, index)
{
  scene.anims.create({
    key: 'ghost_appear',
    frameRate: 10,
    frames: scene.anims.generateFrameNames('ghost',
      {prefix: 'appear_00', start: 1, end: 6, suffix: '.png'}),
    repeat: 0
  });
  scene.anims.create({
    key: 'ghost_idle',
    frameRate: 20,
    frames: scene.anims.generateFrameNames('ghost',
      {prefix: 'idle_00', start: 1, end: 19, suffix: '.png'}),
    repeat: -1
  });
}

export function createFishAnimations(scene) {
  scene.anims.create({
    key: 'fish_idle',
    frames: scene.anims.generateFrameNumbers('fish', { start: 0, end: 19 }),
    frameRate: 20,
    repeat: -1
  });
  scene.anims.create({
    key: 'fish_swimming',
    frames: scene.anims.generateFrameNumbers('fish_swimming', { start: 0, end: 14 }),
    frameRate: 20,
    repeat: -1
  });
}

export function createPlayer(scene, locations)
{
  // saving the players in the scene
  scene.players = {ghosts: [], mice: [], fish: null};

  // itearting array while creating the players
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];

    if (locations[i].type === "ghost") {
      createGhostAnimations(scene, i);
      const container = scene.add.container(location.x, location.y);
      container.setSize(60,60).setDepth(1);
      const player = scene.physics.add.sprite(0, 0, 'ghost')
        .setOrigin(0.5, 0.55);
      player.setScale(locations[i].scale ? locations[i].scale : 0.18)
        .setDepth(1).setSize(340, 340).setOffset(160, 260);
      player.anims.play('ghost_appear').on('animationcomplete', () => {
        player.anims.play('ghost_idle');
      });
      const text = scene.add.text(2, 55, locations[i].name, {
        fontSize: '17px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 2
      }).setOrigin(0.5);
      container.add([player, text]);
      container.name = locations[i].name;
      scene.physics.world.enable([container, player]);
      scene.physics.world.enableBody(container);
      scene.players.ghosts.push(container);
    }
    else if(locations[i].type === "mouse")
    {
      createMouseAnimations(scene, i);
      const container = scene.add.container(location.x, location.y);
      container.setSize(100,100).setDepth(1);
      const player = scene.physics.add.sprite(0,0, 'mouse')
        .setOrigin(0.5,0.55);
      player.setScale(0.22);
      player.setSize(450, 450).setDepth(1);
      if(locations[i].flip)
        player.rotation = Phaser.Math.DegToRad(180);
      player.anims.play('mouse_idle');
      const text = scene.add.text(2, 55, locations[i].name, {
        fontSize: '17px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 2
      }).setOrigin(0.5);
      container.add([player, text]);
      scene.physics.world.enableBody(container);
      scene.players.mice.push(container);
    }
    else if(locations[i].type === "fish") {
      createFishAnimations(scene);
      const container = scene.add.container(location.x, location.y);
      container.setSize(10,10).setDepth(1);
      const player = scene.physics.add.sprite(0, 0, 'fish')
        .setOrigin(0.5, 0.55);
      player.setScale(0.2).setDepth(1);
      player.flipX = locations[i].flip;
      player.anims.play('fish_idle');
      const text = scene.add.text(2, 35, locations[i].name, {
        fontSize: '17px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 2
      }).setOrigin(0.5);
      container.add([player, text]);
      container.name = locations[i].name;
      scene.physics.world.enableBody(container);
      scene.players.fish = container;
    }
  }
}
