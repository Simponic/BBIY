game.createBorderParticles = () => {
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
      colors: ["#16f7c9", "#0d6e5a", "#2fa18a", "#48cfb4", "#58877d", "#178054", "#2cdb92"],
      maxSpeed: 0.20,
      minRadius: 1,
      maxRadius: 3,
      minLife: 100,
      maxLife: 300,
      minAmount: 20,
      maxAmount: 50,
    }
  }));
  particleSpawner.addComponent(game.components.LoadPriority({priority: 1}));
  particleSpawner.addComponent(game.components.Alive());
  return particleSpawner;
}
