import Component from '../core/Component';

export default class Chart extends Component {
  constructor({ points = [], width = 300, height = 300 } = { }) {
    super();
    this.state = { width, height, points };
  }
  render() {
    const canvas = document.createElement('canvas');
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();

    const start = this.state.points[0];
    ctx.moveTo(start.x, start.y);

    let point;
    for (let i = 1, n = this.state.points.length; i < n; i++) {
      point = this.state.points[i];
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();

    return `
      <img alt="chart" src="${canvas.toDataURL()}">
    `;
  }
};
