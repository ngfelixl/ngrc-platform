import { Component, ViewChild, ElementRef, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngrc-plot-yt',
  templateUrl: './plot-yt.component.html',
  styleUrls: [ './plot-yt.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotYtComponent implements OnInit {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;
  @Input() data: {};
  @Input() title = 'Sending values';
  @Input() xLabel = '';
  @Input() yLabel = '';
  @Input() tics = [4, 4];
  @Input() minYRange = [0, 180];
  ctx: CanvasRenderingContext2D;
  size: number[] = [0, 0];
  offset: number[] = [0, 0];
  plotSize: number[] = [0, 0];
  xMin = 0;
  xMax = 1;
  yRange = [0, 1];
  cropDataPointsAfter = 200; // [s]
  dataArray = [];
  colors = ['#940', '#f00', '#0f0', '#00f', '#494'];

  constructor() {}

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 1 * canvas.width;
    canvas.height = canvas.width;
    this.ctx = canvas.getContext('2d');

    this.size = [canvas.width, canvas.height];
    this.plotSize = [canvas.width * 0.9, canvas.height * 0.8];
    this.offset = [canvas.width * 0.1, canvas.height * 0.1];
    this.drawTitle();
    this.drawAxis();
    this.paintLoop();
  }

  drawTitle() {
    this.ctx.textAlign = 'center';
    this.ctx.font = '24px roboto, sans-serif, helvetica';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillText(this.title, this.size[0] / 2, this.size[1] * 0.05);
    this.ctx.fill();
  }

  private paintLoop() {
    if (this.data) {
      const data = Object.values(this.data);
      this.ctx.clearRect(0, this.offset[1] - 2, this.size[0], this.size[1]);
      this.dataArray.push(data);
      if (this.dataArray.length > this.cropDataPointsAfter) {
        this.dataArray.shift();
      }
      this.drawData();
      this.drawAxis();
    }
    requestAnimationFrame(this.paintLoop.bind(this));
  }

  private drawData() {
    const flat = this.dataArray.reduce((a, b) => a.concat(b));
    this.yRange = [
      Math.min(...flat, this.minYRange[0]),
      Math.max(...flat, this.minYRange[1])
    ];

    if (this.dataArray[0]) {
      for (let i = 0; i < this.dataArray[0].length; i++) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.colors[i];
        let coords = this.coord(this.dataArray[0][i], 0);
        this.ctx.moveTo(coords[0], coords[1]);
        for (let j = 1; j < this.dataArray.length; j++) {
          coords = this.coord(this.dataArray[j][i], j);
          this.ctx.lineTo(coords[0], coords[1]);
        }
        this.ctx.stroke();
      }
    }
  }

  private coord(value: number, index: number): number[] {
    const range = this.yRange[1] - this.yRange[0];
    return [
      index * this.plotSize[0] / this.dataArray.length + this.offset[0],
      // this.offset[1] + this.plotSize[1]
      this.offset[1] + this.plotSize[1] - value * (this.plotSize[1] / range)
    ];
  }

  private drawAxis() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(this.offset[0], this.offset[1]);
    this.ctx.lineTo(this.offset[0], this.offset[1] + this.plotSize[1]);
    this.ctx.lineTo(this.offset[0] + this.plotSize[0], this.offset[1] + this.plotSize[1]);
    this.ctx.stroke();
  }
}
