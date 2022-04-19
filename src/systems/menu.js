game.system.Menu = () => {
  let state;

  const menuElement = document.getElementById("menu"); 

  const escapeEventListener = (e) => {
    if (e.key == "Escape") {
      setState('main');
    }
  };

  const setState = (newState) => {
    state = newState;
    draw();
  };

  const bringUpMenu = () => {
    game.running = false;
    game.assets.music.pause();
    window.addEventListener("keydown", escapeEventListener);
    setState("main");
  };

  const hide = () => {
    menuElement.style.display = "none";
    game.startLoop();
  };

  const listenFor = (action, elementId) => {
    const element = document.getElementById(elementId);
    element.innerHTML = "Listening...";
    const handleKey = (event) => {
      window.removeEventListener("keydown", handleKey);
      if (event.key == "Escape") {
        element.innerHTML = menu.controls[action];
        return;
      }
      game.controls[action] = event.key;
      localStorage.setItem("controls", JSON.stringify(game.controls));
      element.innerHTML = event.key;
    };
    window.addEventListener("keydown", handleKey);
  };

  const setLevel = (index) => {
    game.loadLevelIndex(index);
    hide();
  };

  const draw = () => {
    menuElement.style.display = "block";
    menuElement.innerHTML = `<h1><span style='color: blue'>Big Blue</span> Is <span style='color: green'>You</h1>`;
    if (state == "main") {
      menuElement.innerHTML += `
        <div class='menu-button' onclick='game.systems.menu.setState("controls")'>Change Controls</div>
        <div class='menu-button' onclick='game.systems.menu.setState("credits")'>Credits</div>
        <div class='menu-button' onclick='game.systems.menu.setState("levelSelect")'>Select Level</div>
      `;
    }
    else if (state == "controls") {
      menuElement.innerHTML += `
        <div>
          <p>
            Move left: <button id="moveLeft" onfocus='game.systems.menu.listenFor("left", "moveLeft")'>${game.controls.left}</button>
            <br>
            Move right: <button id="moveRight" onfocus='game.systems.menu.listenFor("right", "moveRight")'>${game.controls.right}</button>
            <br>
            Move up: <button id="moveUp" onfocus='game.systems.menu.listenFor("up", "moveUp")'>${game.controls.up}</button>
            <br>
            Move down: <button id="moveDown" onfocus='game.systems.menu.listenFor("down", "moveDown")'>${game.controls.down}</button>
            <br>
            Undo: <button id="undo" onfocus='game.systems.menu.listenFor("undo", "undo")'>${game.controls.undo}</button>
            <br>
            Reset: <button id="reset" onfocus='game.systems.menu.listenFor("reset", "reset")'>${game.controls.reset}</button>
          </p>
        </div>
      `;
    } else if (state == "credits") {
      menuElement.innerHTML += `
        <div>
          <p>
            Sprites from Baba Is You, as hosted <a href="https://www.spriters-resource.com/pc_computer/babaisyou/sheet/115231/">here</a>, and a few custom ones.
            <br>
            Background is from <a href="https://i.pinimg.com/originals/b2/2a/a2/b22aa22b2f3f55b6468361158d52e2e7.gif">PinImg</a>.
            <br>
            Music is <a href="https://www.youtube.com/watch?v=yQjAF3frudY">Fluffing A Duck</a> by Kevin MacLeod.
            <br>
            Other sound effects generated on <a href="https://www.sfxr.me/">SFXR</a>.
            <br>
            Developed by Logan Hunt, Ethan Payne
          </p>
        </div>
      `;
    } else if (state == "levelSelect") {
      menuElement.innerHTML += `
        <div>
          <p> Select a level to play: </p>
          ${
            game.levels.map((level, index) => {
              return `<div class='menu-button' onclick='game.systems.menu.setLevel(${index});'>${level.levelName}</div>`;
            }).join("")
          }
      `;
    }
    if (!game.win) {
      menuElement.innerHTML += "<div class='menu-button' onclick='game.systems.menu.hide()'>Resume Game</div>";
    }
    if (state !== "main") {
      menuElement.innerHTML += "<div class='menu-button' onclick='game.systems.menu.setState(\"main\")'>Back</div>";
    }
  };
    
  return { bringUpMenu, setState, listenFor, hide, setLevel, state };
};
