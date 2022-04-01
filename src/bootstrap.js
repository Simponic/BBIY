game.bootstrap = (() => {
  const scripts = [
    { src: ['src/render/graphics.js'], id: 'render' },
    { src: ['src/components/component.js', 'src/components/position.js', 'src/components/appearence.js'], id: 'components' },
    { src: ['src/entities/entity.js'],      id: 'entity' },
    { src: ['src/entities/bigblue.js'],     id: 'entities' },
    { src: ['src/entities/flag.js'],        id: 'entities' },
    { src: ['src/entities/floor.js'],       id: 'entities' },
    { src: ['src/entities/grass.js'],       id: 'entities' },
    { src: ['src/entities/hedge.js'],       id: 'entities' },
    { src: ['src/entities/liquid.js'],      id: 'entities' },
    { src: ['src/entities/rock.js'],        id: 'entities' },
    { src: ['src/entities/wall.js'],        id: 'entities' },
    { src: ['src/entities/wordBigBlue.js'], id: 'entities' },
    { src: ['src/entities/wordFlag.js'],    id: 'entities' },
    { src: ['src/entities/wordIs.js'],      id: 'entities' },
    { src: ['src/entities/wordKill.js'],    id: 'entities' },
    { src: ['src/entities/wordLava.js'],    id: 'entities' },
    { src: ['src/entities/wordPush.js'],    id: 'entities' },
    { src: ['src/entities/wordRock.js'],    id: 'entities' },
    { src: ['src/entities/wordSink.js'],    id: 'entities' },
    { src: ['src/entities/wordStop.js'],    id: 'entities' },
    { src: ['src/entities/wordWall.js'],    id: 'entities' },
    { src: ['src/entities/wordWater.js'],   id: 'entities' },
    { src: ['src/entities/wordWin.js'],     id: 'entities' },
    { src: ['src/entities/wordYou.js'],     id: 'entities' },
    { src: ['src/systems/render.js'], id: 'systems' },
    { src: ['src/game.js'], id: 'game' },
  ];
  const assets = {};
  [
    "bigblue", "flag", "floor", "grass", "hedge", "liquid", "rock", 
    "wall", "wordBigBlue", "wordFlag", "wordIs", "wordKill", "wordLava", 
    "wordPush", "wordRock", "wordSink", "wordStop", "wordWall", "wordWater", 
    "wordWin", "wordYou"
  ].map((x) => assets[x] = `assets/image/${x}.png`);
  [
    "background-music", "death", "move", "win"
  ].map((x) => assets[x] = `assets/sound/${x}.mp3`);

  const loadScripts = function(onDone) {
    if (scripts.length) {
      let script = scripts.shift();
      require(script.src, () => {
        loadScripts(onDone);
      });
    } else {
      onDone();
    }
  }

  const loadAsset = (source) => {
    let fileExtension = source.substr(source.lastIndexOf('.') + 1);
    return fetch(source)
    .then((r) => r.blob())
    .then((r) => {
      let asset;
      if (["png", "jpg", "jpeg"].includes(fileExtension)) {
        asset = new Image();
      } else if (["mp3"].includes(fileExtension)) {
        asset = new Audio();
      }
      asset.src = URL.createObjectURL(r);
      asset.onload = () => URL.revokeObjectURL(asset.src);
      return asset;
    })
  }

  const loadAssets = function() {
    const promises = [];
    for (let key in assets) {
      promises.push(loadAsset(assets[key], (asset) => {
        game.assets[key] = asset;
      }, (error) => {
        console.log(error)
      }));
    }
    return Promise.all(Object.keys(assets).map((key) => {
      return loadAsset(assets[key]).then((asset) => game.assets[key] = asset);
    }));
  }

  game.assets = {};
  loadAssets().then(() => {
    loadScripts(() => game.initialize());
  })
})();
