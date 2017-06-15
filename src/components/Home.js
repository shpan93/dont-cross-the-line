import React from 'react';

const directions = {
  LEFT: 37,
  TOP: 38,
  RIGHT: 39,
  BOTTOM: 40,
};

const cell = 15;
const rect = cell;
const lineWidth = 1;

class Raf {
  constructor() {
    this.time = new Date().getTime();
    this.frame = 0;
    this.fps = 1000 / 20;
    this.isAnimating = false;
  }

  updateStart() {
    if (this.isAnimating) return;
    this.startTime = new Date().getTime();
    this.isAnimating = true;
  }

  shouldUpdate(time = new Date().getTime()) {
    if(!this.isAnimating) return true;

    const result = time - this.startTime > this.fps;
    if (result) {
      this.updateFrame();
    }
    return result;
  }

  updateFrame() {
    this.startTime = 0;
    this.isAnimating = false;
    this.frame++;
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.defaultDx = cell;
    this.defaultDy = cell;


    this.x = 5 * cell;
    this.y = 5 * cell;
    this.dx = cell;
    this.dy = 0;
    this.height = 600;
    this.width = 1200;
    this.points = [];
    this.state = {
      direction: directions.LEFT,
    }
    this.raf = new Raf();
    this.endGame = false;
  }

  componentDidMount() {
    console.log('sdadas');
    this.animate();
    document.addEventListener('keydown', ::this.changeDirection)
  }

  animate() {
    if (this.raf.shouldUpdate()) {
      this.drawCanvas();
      this.raf.updateStart();
    }
    if(this.endGame) return;
    requestAnimationFrame(() => {
      this.animate();
    })
  }

  // getRandomColor() {
  //   const colors = '0123456789ABCDEF';
  //   const color = ['#'];
  //   for (let i = 0; i < 6; i++) {
  //     const random = colors[Math.ceil(Math.random() * colors.length)];
  //     color.push(random);
  //   }
  //   return color.join('')
  // }

  drawUserLine(ctx) {
    this.points.forEach(({ x, y, color = '#f10'})=> {
      this.drawCircle(ctx, x, y, color)
    })
  }

  drawCanvas() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid(ctx);
    this.drawUserLine(ctx);
    this.drawCircle(ctx);

    //
    // if (this.y + this.dy < 0 || this.y + this.dy >= this.height - rect) {
    //   this.dy = -this.dy;
    // }
    // if (this.x + this.dx < 0 || this.x + this.dx >= this.width - rect) {
    //   this.dx = -this.dx;
    // }

    // if (this.direction !== this.prevDirection) {
    //   console.log('here we are');
    //
    //   if (this.x % cell !== 0) {
    //     this.x = this.x - this.x % cell + cell;
    //   }
    //
    //   if (this.y % cell !== 0) {
    //     this.y = this.y - this.y % cell + cell;
    //   }
    //
    //   if (this.width % this.dx === 0 || this.height % this.dy === 0) {
    //     this.prevDirection = this.direction;
    //   }
    // }



    this.x += this.dx;
    this.y += this.dy;

    if (this.checkCrossedLine()) {
      console.info('We should definitely stop game here')
    }

    this.points.push({
      x: this.x,
      y: this.y,
    });
    if (this.points.length > 40) {
      this.points.shift();
    }


  }

  checkCrossedLine() {
    let result = false;
    if(
      this.x <= 0 ||
      this.x >= this.width ||
      this.y <= 0 ||
      this.y >= this.height
    ){
      console.info('Bumped to the edge')
      return false;
    }
    const points = this.points.filter((point, i)=> {
      if (
        (this.x === point.x)
        && (this.y === point.y)
      ) {
        result = true;
        this.points[i].color = '#000';
        return point;
      }
    });
    console.info('crossed points', points);
    return result;
  }

  drawCircle(ctx, x = this.x, y = this.y, color = '#FF0000') {
    ctx.beginPath();
    ctx.rect(x, y, rect, rect);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.strokeRect(x, y, rect, rect);
    ctx.closePath();
  }

  drawGrid(ctx) {
    const lines = this.width / cell;
    for (let i = 0; i < lines; i++) {
      this.drawLine(ctx, i * cell);
      this.drawLine(ctx, i * cell, true);
    }

  }

  drawLine(ctx, x, isHorizontal) {

    ctx.beginPath();
    if (isHorizontal) {
      ctx.rect(x, 0, 1, this.height);
    } else {
      ctx.rect(0, x, this.width, 1);
    }
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.closePath();
  }

  changeDirection(e) {
    this.directionChanged = true;
    this.prevDirection = this.direction;
    this.direction = e.keyCode;
    switch (e.keyCode) {
      case directions.LEFT:
        this.dx = -Math.abs(this.defaultDx);
        this.dy = 0;
        break;
      case directions.TOP:
        this.dx = 0;
        this.dy = -Math.abs(this.defaultDy);
        break;
      case directions.RIGHT:
        this.dx = Math.abs(this.defaultDx);
        this.dy = 0;
        break;
      case directions.BOTTOM:
        this.dx = 0;
        this.dy = Math.abs(this.defaultDy);
        break;
    }
  }

  render() {
    return (
      <div>
        <canvas
          style={{
            border: '1px solid red'
          }}
          height={this.height}
          width={this.width}
          ref={canvas => {
            this.canvas = canvas;
          }}>

        </canvas>
      </div>
    )
  }
}

export default Home;
