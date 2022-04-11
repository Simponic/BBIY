game.createBorderParticles = ({colors, maxAmount, minAmount, minLife, maxLife, minRadius, maxRadius, maxSpeed}) => {
  const particles = game.Entity();
  let particleSpecs = Array(randomInRange(minAmount, maxAmount)).fill(0).map(() => {
    const particle = {
      x: Math.random(),
      y: Math.random(),
      dx: Math.random() * maxSpeed - maxSpeed / 2,
      dy: Math.random() * maxSpeed - maxSpeed / 2,
      radius: randomInRange(minRadius, maxRadius),
      color: colors[randomInRange(0, colors.length-1)],
      lifetime: randomInRange(minLife, maxLife),
      elapsed: 0,
    };
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        particle.y = 0;
        particle.dy = -Math.abs(particle.dy);
        break;
      case 1:
        particle.x = 1;
        particle.dx = Math.abs(particle.dx);
        break;
      case 2:
        particle.y = 1;
        particle.dy = Math.abs(particle.dy);
        break;
      case 3:
        particle.x = 0;
        particle.dx = -Math.abs(particle.dx);
        break;
    }
    return particle;
  });
  game.sprites.borderParticle = game.graphics.Sprite({
    drawFunction: (elapsedTime, {x, y, width, height}, context) => {
      particleSpecs.map((spec) => spec.elapsed += elapsedTime);
      particleSpecs = particleSpecs.filter((spec) => spec.lifetime > spec.elapsed);
      if (particleSpecs.length === 0) {
        particles.removeComponent("alive");
      }
      particleSpecs.map((spec) => {
        const position = {x: (spec.x * width) + x + spec.dx * spec.elapsed, y: (spec.y * height) + y + spec.dy * spec.elapsed};
        const fill = context.fillStyle;
        context.fillStyle = spec.color;
        context.beginPath();
        context.arc(position.x, position.y, spec.radius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = fill;
      });
    }
  })
  particles.addComponent(game.components.LoadPriority({priority: 1}));
  particles.addComponent(game.components.Alive());
  particles.addComponent(game.components.Sprite({spriteName: "borderParticle"}))
  return particles;
}