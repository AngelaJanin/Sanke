window.addEventListener("load", function(evt) {
  let canvas = document.getElementById("the_canvas");
  let context = canvas.getContext("2d");
  let context_w = canvas.width;
  let context_h = canvas.height;
  let manzana_x;
  let manzana_y;
  let velocidad_x = 12;
  let velocidad_y = 0;
  let snake = [{x: 84, y: 84}];
  let score = 0;
  let direccion = false;
  let lastTime= Date.now();
  let current = 0;
  let elapsed= 0;
  let time= 0;
  let init= true;
  let gameover = false;

  main();
  creaManzana();

  document.addEventListener("keydown", cambiaDireccion);

  function main(){
    if(final()){
      reiniciar();
      return;
    }
    setTimeout(function onTick(){
      current = Date.now();
      elapsed = (current-lastTime)/1000;
      time += elapsed;
      direccion = false;
      render();
      pintaManzana();
      moverSnake();
      pintaSnake();
      main();
    }, 120)
  }
/** Función que pinta el tablero del juego
*   en un canvas de 768 px por 576
*/
  function render(){
    context.fillStyle = "#F08080";
    context.fillRect(0, 0, context_w, context_h);

    for(var i =0;i<=64; i++){
        context.beginPath();
        context.lineWidth ="2";
        context.strokeStyle="#FFB6C1";
        context.moveTo(i*12,0);
        context.lineTo(i*12,576);
        context.stroke();
      }

    for (var j =0; j <=64; j++){
      context.beginPath();
      context.lineWidth ="2";
      context.strokeStyle="#FFB6C1";
      context.moveTo(0,j*12);
      context.lineTo(768,j*12);
      context.stroke();
    }
  }

    function pintaSnake(){
      snake.forEach(pintaPartesSnake)
    }

    function pintaPartesSnake(parte){
      context.fillStyle = '#00CED1';
      context.strokeStyle = ' 	#008B8B';
      context.fillRect(parte.x, parte.y, 12, 12);
      context.strokeRect(parte.x, parte.y, 12, 12);
    }

    function pintaManzana(){
      context.fillStyle = '#DC143C';
      context.strokeStyle = '#8B0000';
      context.fillRect(manzana_x, manzana_y, 12, 12);
      context.strokeRect(manzana_x, manzana_y, 12, 12);
    }

/** Función que maneja el array del snake para modificar
*  su tamaño después de haber comido la manzana y cuando
*  se modifica las variables de velocidad según la coordenada
*/
    function moverSnake(){
        const cabeza = {x: snake[0].x + velocidad_x, y: snake[0].y + velocidad_y};
        snake.unshift(cabeza);
        time=0;
      //}


      const feed = snake[0].x === manzana_x && snake[0].y === manzana_y;
      if(feed){
        score = score + 10;
        document.getElementById('score').innerHTML = score;
        creaManzana();
      } else{
        snake.pop();
      }
    }

/** Función que verifica si el snake cayó en colisión
*   revisa su pocisión para saber si chocó con ella misma
*   o si chocó con los bordes del canvas
*/
    function final(){
      for(let i = 4; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          gameover = true;
          return true;
        }
      }
        const colisionIzq = snake[0].x < 0;
        const colisionDer = snake[0].x > context_w -12;
        const colisionArr = snake[0].y < 0;
        const colisionAba = snake[0].y > context_h -12;
        gameover = true;
        return colisionIzq || colisionDer || colisionArr || colisionAba
    }

    function reiniciar(){
      if(gameover = true){
        alert("Perdiste :(");
        location.reload();
      }
    }

    function random(min, max){
      return Math.round((Math.random() * (max-min) + min) / 12) *  12;
    }

    function creaManzana(){
      manzana_x = random(0, context_w - 12);
      manzana_y =  random(0, context_h - 12);

      snake.forEach(function nuevaManzana(part){
        const snakeManzana = part.x == manzana_x && part.y == manzana_y;
        if(snakeManzana){
          creaManzana();
        }
      });
    }

/** Modifica la pocisión del snake conforme la tecla
*   que haya sido presionada.
* @param {object} Keydown
*/
    function cambiaDireccion(event){
      let Izquierda = 37;
      let Derecha = 39;
      let Arriba = 38;
      let Abajo = 40;

      if(direccion){
        return;
      }
      direccion = true;
      let keyPressed = event.keyCode;
      let irArr = velocidad_y === -12;
      let irAba = velocidad_y === 12;
      let irDer = velocidad_x === 12;
      let irIzq =  velocidad_x === -12;

      if(keyPressed === Izquierda && !irDer){
        velocidad_x = -12;
        velocidad_y = 0;
      }

      if(keyPressed === Arriba && !irAba){
        velocidad_x = 0;
        velocidad_y = -12;
      }

      if(keyPressed === Derecha && !irIzq){
        velocidad_x = 12;
        velocidad_y = 0;
      }

      if(keyPressed === Abajo && !irArr){
        velocidad_x = 0;
        velocidad_y= 12;
      }
    }
});
