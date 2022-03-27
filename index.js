const express = require('express');
const path = require('path');

const app = express();
app.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static('.'));

app.listen(3000, () => {
  console.log('Listening on 3000');
});
