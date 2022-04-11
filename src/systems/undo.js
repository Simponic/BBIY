game.system.Undo = (entitiesGrid) => {
  const states = [];

  const update = (elapsedTime, entities, changedIds) => {
    if (changedIds.size) {
      lastUndid = false;
      const state = {};
      for (let id in entities) {
        if (entities[id].hasComponent("gridPosition")) {
          state[id] = JSON.parse(JSON.stringify(entities[id].components));
        }
      }
      states.push(state);
    }
    return new Set();
  }

  const undo = (entities) => {
    states.map((state) => console.log(state[65].gridPosition));
    let state = states.slice(0, -1).pop();
    for (let id in state) {
      for (let componentName in state[id]) {
        entities[id].addComponent({name: componentName, ...state[id][componentName]});
      }
    }
    if (states.length > 1) {
      states.pop();
    }
  }

  return { update, undo };
}