export function createMeter(scene) {
  const LINE_WIDTH = 5;
  const DASH_LENGTH = 10;
  const DASH_GAP = 1;
  const DISTANCE_FACTOR = 20;

  let meterStarting = null;
  let distanceText = null;
  const graphics = scene.add.graphics();

  function calculateDashedLinePoints(startX, startY, angle, numDashes) {
    const points = [];

    for (let i = 0; i < numDashes; i++) {
      const x = startX + Math.cos(angle) * (DASH_LENGTH + DASH_GAP) * i;
      const y = startY + Math.sin(angle) * (DASH_LENGTH + DASH_GAP) * i;
      points.push(x, y);
    }

    return points;
  }

  function handlePointerDown() {
    if (scene.input.y > 100) {
      const closestPlayer = findClosestPlayer(scene);
      const x = closestPlayer.distance < 45 ? closestPlayer.player.x - 9 : scene.input.x + 5;
      const y = closestPlayer.distance < 45 ? closestPlayer.player.y - 12 : scene.input.y - 5;
      meterStarting = scene.add.sprite(x, y, 'meter_point')
        .setOrigin(0).setScale(0.07).setDepth(10);
    }
  }

  function handlePointerMove() {
    if (meterStarting) {
      const cloestCollectable = findClosesCollectable(scene);
      let currLocationGemFlag = false;
      let currLocation = scene.input;

      if (cloestCollectable.distance < 40) {
        currLocation = cloestCollectable.gem;
        currLocationGemFlag = true;
      }

      graphics.clear();
      graphics.lineStyle(LINE_WIDTH, 0x000000);
      const startX = meterStarting.x + 10;
      const startY = meterStarting.y + 10;
      let angle = Math.atan2(currLocation.y - startY, currLocation.x - startX);
      angle = Math.round(angle / (Math.PI / 12)) * (Math.PI / 12);
      const numDashes = Math.floor(Phaser.Math.Distance.Between(startX, startY, currLocation.x,
        currLocation.y) / (DASH_LENGTH + DASH_GAP));
      const dashedLinePoints = calculateDashedLinePoints(startX, startY, angle, numDashes);
      graphics.beginPath().setDepth(10);
      graphics.moveTo(startX, startY);

      for (let i = 0; i < dashedLinePoints.length; i += 4) {
        graphics.moveTo(dashedLinePoints[i], dashedLinePoints[i + 1]);
        graphics.lineTo(dashedLinePoints[i + 2], dashedLinePoints[i + 3]);
      }

      graphics.strokePath();
      const degrees = Math.round((Phaser.Math.RadToDeg(angle) + 90) / 5) * 5;
      let distance = Phaser.Math.Distance.Between(startX + 10, startY + 10, currLocation.x, currLocation.y);

      if (distanceText) {
        distanceText.setText(`Distance: ${parseInt(distance.toFixed(2) / DISTANCE_FACTOR)}\nAngle: ${parseInt(degrees)}`);
        distanceText.setPosition(currLocation.x + 10, currLocation.y + 10);
      } else {
        distanceText = scene.add.text(currLocation.x + 10, currLocation.y + 10, `Distance: 
          ${distance.toFixed(2) / DISTANCE_FACTOR}`, { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
      }
    }
  }

  function handlePointerUp() {
    scene.input.setDefaultCursor('url(assets/cursors/finger_up.cur), auto');
    
    if (meterStarting) {
      graphics.clear();
      meterStarting.destroy();
      meterStarting = null;

      if (distanceText) {
        distanceText.destroy();
        distanceText = null;
      }
    }
  }

  scene.input.on('pointerdown', handlePointerDown);
  scene.input.on('pointermove', handlePointerMove);
  scene.input.on('pointerup', handlePointerUp);
}

function calculateDistance(pointA, pointB) {
  return Phaser.Math.Distance.Between(
    pointA.x, pointA.y,
    pointB.x, pointB.y
  );
}

function findClosestPlayer(scene) {
  const players = scene.players;
  let closestPlayer = null;
  let closestDistance = Infinity;

  Object.keys(players).forEach((key) => {
      players[key]?.forEach((player) => {
        const distance = calculateDistance(scene.input, player);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestPlayer = player;
        }
      });
  });

  return { player: closestPlayer, distance: closestDistance };
}
  
export function findClosesCollectable(scene) {
  const collectables = scene.collectables;
  let closestCollectable = null;
  let closestDistance = Infinity;

  collectables.forEach((collectable) => {
    const distance = calculateDistance(scene.input, collectable);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCollectable = collectable;
    }
  });

  return { gem: closestCollectable, distance: closestDistance };
}