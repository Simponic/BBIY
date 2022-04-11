// Pretty much a copy of my centipede code
game.graphics = (
  (context) => {
    context.imageSmoothingEnabled = false;
    const clear = () => {
      context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    };
    
    const Sprite = ({image, spriteX, spriteY, spriteWidth, spriteHeight, timePerFrame, cols, rows, numFrames, color, drawFunction}) => {
      timePerFrame = timePerFrame ?? 100;
      numFrames = numFrames ?? 1;
      cols = cols ?? numFrames;
      rows = rows ?? 1;
      spriteX = spriteX ?? 0;
      spriteY = spriteY ?? 0;

      let currentFrame = 0;
      let lastTime = performance.now();

      let draw;
      if (!drawFunction) {
        draw = (_elapsedTime, {x, y, rot, width, height}) => {
          if (numFrames > 1) {
            if (performance.now()-lastTime > timePerFrame) {
              lastTime = performance.now();
              currentFrame = (currentFrame + 1) % numFrames;
            }
          }
          context.save();
          context.translate(x+width/2, y+height/2);
          context.rotate(rot * Math.PI / 180);
          context.translate(-x-width/2, -y-height/2);
          const row = currentFrame % rows;
          const col = Math.floor(currentFrame / rows);
          context.drawImage(image, spriteX+col*spriteWidth, spriteY+row*spriteHeight, spriteWidth, spriteHeight, x, y, width, height);

					// apply color to sprite 
					if (color) {
						context.globalAlpha=0.7;
						context.globalCompositeOperation="source-atop";
						context.fillStyle=color;
						context.fillRect(x, y, width, height);
					}

          context.restore();
        };
      } else {
        draw = (elapsedTime, drawSpec) => drawFunction(elapsedTime, drawSpec, context);
      }
      return { draw };
    }

    return { clear, Sprite };
  }
)(game.canvas.context);
