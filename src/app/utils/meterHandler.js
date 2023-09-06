export function createMeter(scene) {
    scene.meterStarting = null;
    scene.distanceText = null;
    scene.graphics = scene.add.graphics();
    
    const lineWidth = 5;
    const dashLength = 10;
    const dashGap = 1;
  
    function calculateDashedLinePoints(startX, startY, angle, numDashes) {
      const points = [];
      for (let i = 0; i < numDashes; i++) {
        const x = startX + Math.cos(angle) * (dashLength + dashGap) * i;
        const y = startY + Math.sin(angle) * (dashLength + dashGap) * i;
        points.push(x, y);
      }
      return points;
    }
  
    // on click, show starting point
    scene.input.on('pointerdown', () => {
      if(scene.input.y > 100)
      {
        const closestPlayer = findClosestPlayer(scene);
        const x = closestPlayer.distance < 45
          ? closestPlayer.player.x - 9
          : scene.input.x + 5;
        const y = closestPlayer.distance < 45
          ? closestPlayer.player.y - 12
          : scene.input.y - 5;
        scene.meterStarting = scene.add.sprite(x, y, 'meter_point')
          .setOrigin(0).setScale(0.07).setDepth(10);
      }
    });
  
    // on move, show updated meter
    scene.input.on('pointermove', () => {
      if (scene.meterStarting) {
        // distance between gem and input is less than 45 stick to gem
        const cloestGem = findClosestGem(scene);
        let currLocationGemFlag = false;
        let currLocation = scene.input;
        if(cloestGem.distance < 40)
        {
          currLocation = cloestGem.gem;
          currLocationGemFlag = true;
        }

        scene.graphics.clear();
        scene.graphics.lineStyle(lineWidth, 0x000000);
        const startX = scene.meterStarting.x + 10;
        const startY = scene.meterStarting.y + 10;
        let angle = Math.atan2(currLocation.y - startY, currLocation.x - startX);
        angle = Math.round(angle / (Math.PI / 12)) * (Math.PI / 12);
        const numDashes = Math.floor(Phaser.Math.Distance.Between(startX, startY, currLocation.x, currLocation.y) / (dashLength + dashGap));
        const dashedLinePoints = calculateDashedLinePoints(startX, startY, angle, numDashes);
  
        scene.graphics.beginPath().setDepth(10);
        scene.graphics.moveTo(startX, startY);
  
        // Loop through the dashed line points to create the dashed line effect
        for (let i = 0; i < dashedLinePoints.length; i += 4) {
          scene.graphics.moveTo(dashedLinePoints[i], dashedLinePoints[i + 1]);
          scene.graphics.lineTo(dashedLinePoints[i + 2], dashedLinePoints[i + 3]);
        }
        scene.graphics.strokePath();
  
        const degrees = Math.round((Phaser.Math.RadToDeg(angle) + 90) / 5) * 5;
        let distance = Phaser.Math.Distance.Between(startX + 10, startY + 10, currLocation.x, currLocation.y);
  
        if (scene.distanceText) {
          scene.distanceText.setText(`Distance: ${parseInt(distance.toFixed(2) / 20)}\nAngle: ${parseInt(degrees)}`);
          scene.distanceText.setPosition(currLocation.x + 10, currLocation.y + 10);
        } else {
          scene.distanceText = scene.add.text(currLocation.x + 10, currLocation.y + 10, `Distance: ${distance.toFixed(2) / 20}`, { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
        }
      }
    });
  
    scene.input.on('pointerup', () => {
      scene.input.setDefaultCursor('url(assets/cursors/finger_up.cur), auto');
      if (scene.meterStarting) {
        scene.graphics.clear();
        scene.meterStarting.destroy();
        scene.meterStarting = null;
        if (scene.distanceText) {
          scene.distanceText.destroy();
          scene.distanceText = null;
        }
      }
    });
  }

  function calculateDistance(pointA, pointB) {
    return Phaser.Math.Distance.Between(
      pointA.x, pointA.y,
      pointB.x, pointB.y
    );
  }
  
  function findClosestPlayer(scene) {
    // Finding the closest ghost and mouse
    const closestGhost = findClosestPlayerFromGroup(scene.players.ghosts, scene.input);
    const closestMouse = findClosestPlayerFromGroup(scene.players.mice, scene.input);
  
    // Find the closest player overall, mouse or ghost
    let closestPlayer = closestGhost;
    if (closestMouse && closestMouse.distance < closestGhost.distance) {
      closestPlayer = closestMouse;
    }
  
    return closestPlayer;
  }
  
  function findClosestPlayerFromGroup(players, startingPoint) {
    let closestPlayer = null;
    let closestDistance = Infinity;
  
    for (let i = 0; i < players.length; i++) {
      const distance = calculateDistance(startingPoint, players[i]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPlayer = players[i];
      }
    }
    
    return { player: closestPlayer, distance: closestDistance };
  }
  
// function that gets array of gems and returns the closest gem to the input
export function findClosestGem(scene) {
    let closestGem = null;
    let closestDistance = Infinity;
  
    for (let i = 0; i < scene.gems.length; i++) {
      const distance = calculateDistance(scene.input, scene.gems[i]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestGem = scene.gems[i];
      }
    }
  
    return { gem: closestGem, distance: closestDistance };
  }
  