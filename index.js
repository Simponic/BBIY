const express = require('express');
const path = require('path');
const fs = require('fs');

const MAP_LAYERS=2;

const app = express();
app.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.route('/levels').get((req, res) => {
  fs.readFile(path.join(__dirname, 'levels-all.bbiy'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const levels = [];
    const lines = data.split('\r\n');
    do {
      const levelName = lines.shift();
      if (!levelName) {
        break;
      }
      const [xDim, yDim] = lines.shift().split(' x ').map((x) => parseInt(x));

      let level = Array(yDim).fill(null).map(() => Array(xDim).fill(null).map(() => []));
      for (let i = 0; i < MAP_LAYERS; i++) {
        for (let y = 0; y < yDim; y++) {
          const line = lines.shift().split('');
          for (let x = 0; x < xDim; x++) {
            if (line[x] !== ' ') {
              level[y][x].push(line[x]);
            }
          }
        }
      }
      levels.push({
        levelName,
        gridSize: {xDim, yDim},
        level,
      });
    } while (lines.length);

    // Send the array of objects
    res.send(levels);
  });
});

app.use(express.static('.'));

app.listen(3000, () => {
  console.log('Listening on 3000');
});
