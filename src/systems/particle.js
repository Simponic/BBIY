game.system.Particle = () => {
  "use strict"; 
  const particleSpawners = {};
  
  const particleSpawner = ({colors, maxAmount, minAmount, minLife, maxLife, minRadius, maxRadius, maxSpeed, spawnFunction}) => {
    return Array(randomInRange(minAmount, maxAmount)).fill(0).map(() => {
      let particleSpec = {
        x: Math.random(),
        y: Math.random(),
        dx: Math.random() * maxSpeed - maxSpeed / 2,
        dy: Math.random() * maxSpeed - maxSpeed / 2,
        radius: randomInRange(minRadius, maxRadius),
        color: colors[randomInRange(0, colors.length-1)],
        lifetime: randomInRange(minLife, maxLife),
        elapsed: 0,
      };
      if (spawnFunction) {
        particleSpec = {...particleSpec, ...spawnFunction(particleSpec)};
      }
      return particleSpec;
    });
  }

  const update = (elapsedTime, entities, _changedIds) => {
    for (let id in entities) {
      const entity = entities[id];
      if (entity.hasComponent("particles")) {
        if (!particleSpawners[entity.id]) {
          particleSpawners[entity.id] = particleSpawner(entity.components.particles.spec.spec);
          entities[id].particleSprite = game.graphics.Sprite({
            drawFunction: (elapsedTime, {x, y, width, height}, context) => {
              let particleSpawner = particleSpawners[entity.id];
              particleSpawner.map((particleSpec) => particleSpec.elapsed += elapsedTime);
              particleSpawners[id] = particleSpawner.filter((particleSpec) => particleSpec.lifetime > particleSpec.elapsed);
              particleSpawner = particleSpawners[id];
              if (particleSpawner.length === 0) {
                entities[id].removeComponent("alive");
              }
              particleSpawner.map((particleSpec) => {
                const position = {x: (particleSpec.x * width) + x + particleSpec.dx * particleSpec.elapsed, y: (particleSpec.y * height) + y + particleSpec.dy * particleSpec.elapsed};
                const fill = context.fillStyle;
                context.fillStyle = particleSpec.color;
                context.beginPath();
                context.arc(position.x, position.y, particleSpec.radius, 0, 2 * Math.PI);
                context.fill();
                context.fillStyle = fill;
              });
            }
          });
        }
      }
    }
    return new Set();
  };

  return { update };
};
