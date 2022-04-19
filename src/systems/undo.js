game.system.Undo = (entitiesGrid, logicSystem, gridSystem) => {
  const states = [];

  const update = (elapsedTime, entities, changedIds) => {
    if (changedIds.size) {
      const state = {};
      for (let id in entities) {
        if (entities[id].hasComponent("gridPosition")) {
          state[id] = JSON.parse(JSON.stringify(entities[id].components));
        }
      }
      states.push(state);
    }
    return new Set();
  };

  const undo = (entities) => {
    let state = states.slice(0, -1).pop();
    if (states.length > 1) {
      states.pop();
    }
    for (let id in state) {
      for (let componentName in state[id]) {
        entities[id].addComponent({name: componentName, ...state[id][componentName]});
      }
    }
    gridSystem.update(0, entities, new Set());
    logicSystem.parseRules(entities);
  };

  return { update, undo };
};
