game.system.Logic = (entitiesGrid) => {
  "use strict";
  let currentVerbRules = [];
  let previousVerbState = {
    controllable: new Set(),
    win: new Set(),
  };
  const isWord = (entity) => entity.hasComponent("gridPosition") && (entity.hasComponent("verb") || entity.hasComponent("noun"));
  
  const getFirstWordEntity = (gridPosition) => {
    if (!equivalence(gridPosition, clamp(gridPosition, game.config.xDim, game.config.yDim))) {
      return null;
    }
    for (let entity of entitiesGrid[gridPosition.y][gridPosition.x].values()) {
      if (isWord(entity)) {
        return entity;
      }
    }
    return null;
  };

  const verbActionsToComponent = {
    "stop": game.components.Stop(),
    "push": game.components.Pushable(),
    "you": game.components.Controllable({controls: ['left', 'right', 'up', 'down']}),
    "burn": game.components.Burn(),    
    "sink": game.components.Sink(),
    "win": game.components.Win(),
  };

  const nounsToEntityCreators = {
    "rock": game.createRock,
    "wall": game.createWall,
    "bigblue": game.createBigBlue,
    "flag": game.createFlag,
    "lava": game.createLava,
    "water": game.createWater,
  };
  
  const doOnRule = (rule, entities, direction) => {
    const [applyee, application] = [entities[rule[0]], entities[rule[1]]];
    const changedEntityIds = [];
    if (applyee.hasComponent("noun")) {
      const entityName = applyee.components.noun.select;
      if (application.hasComponent("verb")) {
        const verb = application.components.verb.action;
        if (direction == "apply") {
          currentVerbRules.push(rule);
        }
        for (let id in entities) {
          const entity = entities[id];
          if (entity.hasComponent("alive") && entity.hasComponent("name") && entity.components.name.selector == entityName) {
            changedEntityIds.push(id);
            const component = verbActionsToComponent[verb];
            if (component) {
              if (direction == "apply") {              
                if (verb == "you") {
                  if (!previousVerbState.controllable.has(id)) {
                    const newYouParticleSpawner = game.createBorderParticles({colors: ["#ffc0cb", "#ffb6c1", "#ffc1cc", "#ffbcd9", "#ff1493"], minAmount: 80, maxAmount: 150, maxSpeed: 0.5});
                    newYouParticleSpawner.addComponent(game.components.Position(entity.components.position));
                    newYouParticleSpawner.addComponent(game.components.Appearance({width: game.canvas.width / game.config.xDim, height: game.canvas.height / game.config.yDim}));
                    game.entities[newYouParticleSpawner.id] = newYouParticleSpawner;
                  }
                }
                if (verb == "win") {
                  if (!previousVerbState.win.has(id)) {
                    game.assets.win.play();
                  }
                }
                entity.addComponent(component);
              } else if (direction == "deapply") {
                if (entity.hasComponent("controllable")) {
                  previousVerbState.controllable.add(id);
                }
                if (entity.hasComponent("win")) {
                  previousVerbState.win.add(id);
                }
                entity.removeComponent(component.name);
              }
            }
          }
        }
        if (direction == "apply") {
          if (changedEntityIds.some((id) => previousVerbState.controllable.has(id))) {
            previousVerbState.controllable = new Set();
          }
        }
      }
      if (application.hasComponent("noun")) {
        const applicationEntityName = application.components.noun.select;
        for (let id in entities) {
          const entity = entities[id];
          if (entity.hasComponent("name") && entity.components.name.selector == entityName) {
            const e = nounsToEntityCreators[applicationEntityName]();
            ["name", "sprite", "burnable", "sinkable"].map((name) => {
              if (e.hasComponent(name)) {
                entity.components[name] = e.components[name];
              }
            });
          }
        }
      }
    };
    return changedEntityIds;
  };
  
  const parseRules = (entities) => {
    currentVerbRules.map((rule) => doOnRule(rule, entities, "deapply"));
    currentVerbRules = [];
    const isWordGridPositions = [];
    const changedEntityIds = new Set();
    entitiesGrid.forEach((row) => row.forEach((entitiesInCell) => {
      for (let entity of entitiesInCell.values()) {
        if (isWord(entity) && entity.hasComponent("verb") && entity.components.verb.action == "Is") {
          isWordGridPositions.push(entity.components.gridPosition);
        }
      }
    }));
    let newRules = [];
    isWordGridPositions.forEach((gridPosition) => {
      const east = getFirstWordEntity({y: gridPosition.y, x: gridPosition.x - 1});
      const west = getFirstWordEntity({y: gridPosition.y, x: gridPosition.x + 1});
      const north = getFirstWordEntity({x: gridPosition.x, y: gridPosition.y - 1});
      const south = getFirstWordEntity({x: gridPosition.x, y: gridPosition.y + 1});

      if (east && west) {
        newRules.push([east.id, west.id]);
      }
      if (north && south) {
        newRules.push([north.id, south.id]);
      }
    });
    newRules = newRules.sort((a, b) => (entities[b[1]].hasComponent("noun") ? 1 : -1) - (entities[a[1]].hasComponent("noun") ? 1 : -1));
    newRules.map((rule) => doOnRule(rule, entities, "apply").map((id) => changedEntityIds.add(id)));
    return changedEntityIds;
  };
  
  const update = (_elapsedTime, entities, changedIds) => {
    for (let id of changedIds) {
      const changed = entities[id];
      if (changed.hasComponent("verb") || changed.hasComponent("noun")) {
        return parseRules(entities);
      }
    }
    return new Set();
  };

  return { update, parseRules };
};
