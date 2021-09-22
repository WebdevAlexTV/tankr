import k from "../kaboom";

const TURN_SPEED = 50;
const SHOOT_COOLDOWN = 5;

let lastShot = 0;

const level = [
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
  "                                   ",
];

const main = () => {
  /**
   * Level
   */
  k.addLevel(level, {
    width: 64,
    height: 64,
    pos: k.vec2(0, 0),
    " ": () => [k.sprite("sprites", { frame: 93 })],
  });

  k.gravity(0);

  /**
   * TANK
   */
  const tank = k.add([
    k.sprite("sprites", {
      frame: 268,
    }),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
    k.body(),
    k.area(),
    k.rotate(0),
    {
      canShoot: true
    }
  ]);

  const turret = k.add([
    k.sprite("sprites", {
      frame: 291,
    }),
    k.pos(tank.pos),
    k.origin("center"),
    k.rotate(0),
  ]);

  tank.action(() => {
    turret.pos = tank.pos;
  });

  // UI
  const meterOutline = k.add([
    k.rect(100, 8),
    k.outline(2),
    k.pos(8, k.height() - 16),
  ]);

  const meter = k.add([
    k.rect(100, 6),
    k.pos(8, k.height() - 15),
    k.color(0, 100, 0)
  ])

  /**
   * INPUT
   */
  k.keyDown("left", () => {
    tank.angle -= TURN_SPEED * k.dt();
    turret.angle -= TURN_SPEED * k.dt();
  });

  k.keyDown("right", () => {
    tank.angle += TURN_SPEED * k.dt();
    turret.angle += TURN_SPEED * k.dt();
  });

  k.keyDown("a", () => {
    turret.angle -= TURN_SPEED * k.dt();
  });

  k.keyDown("d", () => {
    turret.angle += TURN_SPEED * k.dt();
  });

  k.keyDown("up", () => {
    tank.move(dir(tank.angle).scale(20));
  });

  k.keyDown("down", () => {
    tank.move(dir(tank.angle - 180).scale(20));
  });

  k.keyPress("space", () => {
    if(tank.canShoot) {
      tank.canShoot = false
      lastShot = SHOOT_COOLDOWN;
      shoot(turret);
      k.shake(10);
    }
  });

  k.action(() => {
    if(lastShot > 0) {
      lastShot = Math.max(lastShot - k.dt(), 0);
      meter.width = Math.floor((SHOOT_COOLDOWN - lastShot) * 20)
    } else {
      if(!tank.canShoot) {
        tank.canShoot = true;
        meter.color.red = 0;
        meter.color.green = 100;
        meter.color.blue = 0;
      }
    }
  });

  /**
   * Handle the turret movement
   */
  /*k.action(() => {
    const mousePos = k.mouseWorldPos();
    if (mousePos.x === 0 && mousePos.y === 0) {
      return;
    }

    const turretPos = turret.pos;

    const targetDeg = Math.floor(
      (Math.atan2(mousePos.y - turretPos.y, mousePos.x - turretPos.x) * 180) /
        Math.PI
    );

    if (turret.angle - targetDeg !== 0) {
      if (Math.abs(turret.angle - targetDeg) < 180) {
        // Rotate current directly towards target.
        if (turret.angle < targetDeg) {
          turret.angle += TURN_SPEED * k.dt();
        } else {
          turret.angle -= TURN_SPEED * k.dt();
        }
      } else {
        // Rotate the other direction towards target.
        if (turret.angle < targetDeg) {
          turret.angle -= TURN_SPEED * k.dt();
        } else {
          turret.angle += TURN_SPEED * k.dt();
        }
      }
    }
  });*/

  /**
   * Destroy unused projectiles
   */
  k.action("projectile", (projectile) => {
    if (
      projectile.pos.x < -20 ||
      projectile.pos.x > k.width() + 20 ||
      projectile.pos.y < -20 ||
      projectile.pos.y > k.height() + 20
    ) {
      k.destroy(projectile);
    }
  });

  function shoot(turret) {
    console.log("shoot", dir(turret.angle).scale(10));
    const projectilePos = dir(turret.angle).scale(35);
    projectilePos.x += turret.pos.x - 2;
    projectilePos.y += turret.pos.y - 2;

    k.add([
      rect(8, 4),
      area(),
      pos(projectilePos),
      origin("center"),
      color(100, 100, 100),
      move(dir(turret.angle).scale(20), 100),
      rotate(turret.angle),
      // strings here means a tag
      "projectile",
    ]);
  }
};

export default main;

// turret 179
// maus -160
//

// turret -120
// maus - 160
// -120 - 160 => -280
