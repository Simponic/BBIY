game.bootstrap = (function() {
  const scripts = [
    { src: ['src/game.js'], id: 'game' },
  ];
  const assets = {
    bigblue: 'assets/image/bigblue.png',
  };

  const loadScripts = function(onDone) {
    while (scripts.length) {
      let script = scripts.shift();
      require(script.src, () => {
        onDone(script);
      });
    }
    console.log('scripts loaded');
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
    loadScripts((script) => {
      game.initialize();
    });
  })
  
})();