game.createBorderParticles = (spawnerSpec) => {
  const particleSpawner = game.Entity();
  const spawnFunction = (particleSpec) => {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        particleSpec.y = 0;
        particleSpec.dy = -Math.abs(particleSpec.dy);
        break;
      case 1:
        particleSpec.x = 1;
        particleSpec.dx = Math.abs(particleSpec.dx);
        break;
      case 2:
        particleSpec.y = 1;
        particleSpec.dy = Math.abs(particleSpec.dy);
        break;
      case 3:
        particleSpec.x = 0;
        particleSpec.dx = -Math.abs(particleSpec.dx);
        break;
    }
    return particleSpec;
  };
  particleSpawner.addComponent(game.components.Particles({
    spec: {
      spawnFunction,
      colors: ["#666666", "#777777", "#888888", "#999999"],
      maxSpeed: 0.20,
      minRadius: 1,
      maxRadius: 3,
      minLife: 100,
      maxLife: 300,
      minAmount: 20,
      maxAmount: 50,
      ...spawnerSpec,
    }
  }));
  particleSpawner.addComponent(game.components.LoadPriority({priority: 1}));
  particleSpawner.addComponent(game.components.Alive());
  return particleSpawner;
}
