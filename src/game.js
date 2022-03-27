const context = document.getElementById('game-canvas').getContext('2d');
context.imageSmoothingEnabled = false;

console.log("HELLO")
game.initialize = () => {
  context.clearRect(0, 0, game.width, game.height);
  context.drawImage(game.assets.bigblue, 0, 0, game.width, game.height);

  console.log("BITCH")
}
