var JS_SNAKE = {};

JS_SNAKE.game = (function () {
  var ctx;
  JS_SNAKE.width = 200;
  JS_SNAKE.height = 200;
  JS_SNAKE.blockSize = 10;
  var frameLength = 500; //new frame every 0.5 seconds
  var snake;

  function init() {
    $('body').append('<canvas id="jsSnake">');
    var $canvas = $('#jsSnake');
    $canvas.attr('width', JS_SNAKE.width);
    $canvas.attr('height', JS_SNAKE.height);
    var canvas = $canvas[0];
    ctx = canvas.getContext('2d');
    snake = JS_SNAKE.snake();
    gameLoop();
  }

  function gameLoop() {
    ctx.clearRect(0, 0, JS_SNAKE.width, JS_SNAKE.height);
    snake.advance();
    snake.draw(ctx);
    setTimeout(gameLoop, frameLength); //do it all again
  }

  return {
    init: init
  };
})();


JS_SNAKE.snake = function () {
  var posArray = [];
  posArray.push([6, 4]);
  posArray.push([5, 4]);
  posArray.push([4, 4]);
  var direction = 'right';

  function drawSection(ctx, position) {
    var x = JS_SNAKE.blockSize * position[0];
    var y = JS_SNAKE.blockSize * position[1];
    ctx.fillRect(x, y, JS_SNAKE.blockSize, JS_SNAKE.blockSize);
  }

  function draw(ctx) {
    ctx.save();
    ctx.fillStyle = '#33a';
    for(var i = 0; i < posArray.length; i++) {
      drawSection(ctx, posArray[i]);
    }
    ctx.restore();
  }

  function advance() {
    var nextPosition = posArray[0].slice(); //copy head of snake
    nextPosition[0] += 1; //add 1 to the x position

    //add the new position to the beginning of the array
    posArray.unshift(nextPosition);
    //and remove the last position
    posArray.pop();
  }

  return {
    draw: draw,
    advance: advance
  };
};


$(document).ready(function () {
  JS_SNAKE.game.init();
});
