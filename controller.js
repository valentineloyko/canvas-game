class Controller {
  constructor (canvas) {
    this.canvas  = canvas.link;
  }
  
  // passing on funcs for start/stop the game
  start () {
   setupStartHandler();
  }

  stop () {
   setupStopHandler();
  }

}

let controller = new Controller(canvas);