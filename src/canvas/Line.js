export default class Line {
  constructor(options) {
    const defaultOptions = {};
    this.options = Object.assign({}, defaultOptions, options);

    this.points = [];
    this.dx = 0;
    this.dy = 0;
  }

  updateCell(){

  }


}