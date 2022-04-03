game.bootstrap = (() => {
  const scripts = [
    { src: ['src/utils/objectEquivalence.js', 'src/utils/unitizeVector.js'], id: 'utils'},
    { src: ['src/render/graphics.js'], id: 'graphics' },
    { src: ['src/components/component.js'], id: 'component' },
    { 
      src: [
        'src/components/position.js', 'src/components/momentum.js', 'src/components/gridPosition.js',
        'src/components/appearence.js', 'src/components/controllable.js', 'src/components/pushable.js',
      ],
      id: 'components'
    },
    { src: ['src/entities/entity.js'], id: 'entity' },
    { 
      src: [
        'src/entities/bigblue.js', 'src/entities/flag.js', 'src/entities/floor.js', 'src/entities/grass.js', 'src/entities/hedge.js',
        'src/entities/liquid.js', 'src/entities/rock.js', 'src/entities/wall.js', 'src/entities/wordBigBlue.js', 
        'src/entities/wordFlag.js', 'src/entities/wordIs.js', 'src/entities/wordKill.js', 'src/entities/wordLava.js',
        'src/entities/wordPush.js', 'src/entities/wordRock.js', 'src/entities/wordSink.js', 'src/entities/wordStop.js', 
        'src/entities/wordWall.js', 'src/entities/wordWater.js', 'src/entities/wordWin.js', 'src/entities/wordYou.js'
      ],
      id: 'entities'
    },
    { src: ['src/systems/system.js'], id: 'system' },
    { 
      src: [
        'src/systems/render.js', 'src/systems/gridSystem.js', 'src/systems/physics.js', 'src/systems/keyboardInput.js'
      ],
      id: 'systems' },
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
