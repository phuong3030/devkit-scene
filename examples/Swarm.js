import scene, communityart;

/**
  * @requires scene 0.0.2
  */
exports = scene(function() {
  // Add the background
  scene.addBackground(communityart('swarm/bg1'));
  // scene.addBackground(communityart('swarm/bg2'), { distance: 0.5 });
  // scene.addBackground(communityart('swarm/bg3'), { distance: 0.25 });

  // Add the player
  var player = scene.addPlayer(communityart('spaceship'), {
    vy: -250,
    followTouches: { x: true, xMultiplier: 0.3 },
    zIndex: 10,
    cameraFunction: scene.camera.fullyOn
  });
  player.onTick(function(dt) {
    if (Math.abs(player.vx) > 750 && player.view._currentAnimationName !== 'roll') {
      player.view.startAnimation('roll');
    }
  });

  // Show the game score
  scene.showScore(10, 10);

  // Make the spawners
  var enemies = scene.addGroup();
  // scene.addSpawner(
  //   new scene.shape.Line({ x: 30, y: -100, x2: scene.screen.width - 200 }),
  //   function (x, y, index) {
  //     var enemyType = randRangeI(3);
  //     var enemySpeeds = [20, 25, 30];
  //     var enemy = enemies.addActor(communityart('swarm/enemy_type' + enemyType), x, y, {
  //       vy: enemySpeeds[enemyType]
  //     });
  //     enemy.onContainedBy(scene.screen.bottom, enemy.destroy);

  //     this.spawnDelay = randRange(500, 1000 - Math.min(scene.totalDt, 500));
  //   }
  // );

  var bullets = scene.addGroup();
  scene.addSpawner(new scene.spawner.Timed(
    player,
    function (x, y, index) {
      var bullet = bullets.addActor(communityart('swarm/laser'), x, y, {
        vy: -2500
      });

      bullet.onEntered(scene.camera.topWall, function() { bullet.destroy(); });
    },
    75, true
  ));

  // Collision rules
  scene.onCollision(bullets, enemies, function(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
    scene.addScore(1);
  });
  scene.onCollision(player, enemies, function() {
    player.destroy
  });

  // Add the camera to follow the player
  scene.camera.follow(
    player,
    new scene.shape.Rect(0, scene.screen.height - 100, scene.screen.width, scene.screen.height - 100)
  );


  // EXTRA: Ultra swarm
  // scene.addTimer(function() {
  //   var text = scene.addText('Ultra swarm!');
  //   scene.addTimeout(function() { text.destroy() }, 1000);

  //   for (var i = 0; i < scene.totalDt / (360 * 1000); i++) {
  //     enemies.spawn();
  //   }
  // }, 60 * 1000);


  // // EXTRA: Boss
  // var bossBullets = scene.addGroup();
  // scene.onCollision(player, bossBullets, player.destroy);

  // var spawnBossBullet = function(x, y, index) {
  //   bossBullets.addActor(communityart('swarm/particleCircle'), x, y, { vy: 25 });
  // };

  // // spawn him
  // scene.addTimeout(function() {
  //   var boss = enemies.addActor(communityart('swarm/enemy_boss'), x, y);

  //   // Move the boss left and right
  //   animation(boss).then({ y: 100 }, 300);
  //   animation(boss, { loop: true })
  //     .then({ x: 100 }, 1000)
  //     .then({ x: scene.screen.width - 100 }, 1000);

  //   // Add as a spawner to bossBullets
  //   var bossBulletSpawner = bossBullets.addSpawner(boss, spawnBossBullet);

  //   // Remove as a spawner, once the boss is dead
  //   boss.onDestroy(function() {
  //     bossBullets.removeSpawner(bossBulletSpawner);
  //   });
  // }, 60 * 1000 * 2);
});
