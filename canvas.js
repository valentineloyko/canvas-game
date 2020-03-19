//creating main classes
class Canvas {
  constructor () {
    this.link = document.getElementById('canvas');
  }
}

class Brick {
  static get colors() {
    return [
      'yellow', 'red', 'green', 'blue', 'orange', 'gold', 'purple', 'darkRed'
    ];
  }
  constructor() {
    this.target = 80;
    this.width = 60;
    this.x = Math.floor(Math.random() * width) + 1;
    this.y = -this.width;
    this.speed = 1.2 + Math.random() * 0.9;
    this.color = Brick.colors[random(0, Brick.colors.length - 1)];

  }
}

//declaring game vars, arrays and funcs
let canvas = new Canvas();
canvas  = canvas.link;
ctx = this.canvas.getContext('2d');
var stopGame = true;
let score = 0;
width = canvas.width,
height = canvas.height;
let bricks = [];
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);

//setting interval for a new brick appearance
setInterval(() => {
  bricks.push(new Brick());
}, random(800, 1000));

//randomizing func
function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

// main game func
  function game() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Onclick handler
    function setupClickHandler() {
      var canvas = document.getElementById("canvas");  
      canvas.onclick = function(e) {
        var x = e.clientX;
        var y = e.clientY-90;
        var survivingBricks = [];
        for (var i = 0; i < bricks.length; i++) {
          var brick = bricks[i];
            //check to see if this brick has been clicked
            if (x > brick.x && x < (brick.x + brick.target) && y > brick.y && y < (brick.y + brick.target)) {
              //ths brick will disappear because it is not inserted into the new array
              console.log("Brick was clicked!! " + x + " " + y);
              //making it more fun by adding some sound
              play_single_sound();
              score += 1;
              document.getElementById("score").innerHTML= score;
            } else {
              survivingBricks.push(brick);
              }
        }
        bricks = survivingBricks;
        };
      }
    
      
    
    
    for (let i = 0; i < bricks.length; i++) {
      let brick = bricks[i];
      brick.y += brick.speed;
      ctx.fillStyle = brick.color;
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, 60, 60);
      ctx.closePath();
      ctx.fill();
      setupClickHandler();   
    }

    if (stopGame) return;
      requestAnimationFrame(game);
  };

//shot sound if aimed brick
function play_single_sound() {
  document.getElementById('audiotag').play();
}

// start-end game controllers
function setupStartHandler() {
  if (stopGame===true) {
    bricks = [];
    score=0;
    document.getElementById("score").innerHTML= score;
    stopGame=false;
    game();
  }
}

function setupStopHandler() {
  if (stopGame===false) {
    bricks = [];
    stopGame = true;
  }
}