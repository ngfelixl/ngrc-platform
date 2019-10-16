import { Component, Input, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

export interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-analog-stick-visualization',
  template: '<canvas #canvas></canvas>',
  styleUrls: [ './analog-stick-visualization.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalogStickVisualizationComponent implements AfterViewInit {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;

  @Input() data: Point;
  @Input() xlabel = 'xLabel';
  @Input() ylabel = 'yLabel';
  @Input() color = 'rgb(0, 96, 100)';
  @Input() accent = [255 / 256, 64 / 256 , 129 / 256];

  ctx: CanvasRenderingContext2D;
  size: number[] = [0, 0];
  offset = { top: 2, bottom: 30, left: 30, right: 2 };
  ar: number[];

  constructor() {
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.height = canvas.width;
    this.size = [canvas.width - this.offset.left - this.offset.right, canvas.height - this.offset.top - this.offset.bottom];
    this.ar = [this.size[0] / 256, this.size[1] / 256];
    this.ctx = canvas.getContext('2d');
    this.paintBackground();
    this.paintLoop();
  }

  paintBackground(): void {
    const ctx = this.ctx;
    const size = this.size;
    const ar = this.ar;
    const offset = this.offset;
    ctx.beginPath();
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.xlabel, this.x(128), this.y(256) + 28);

    ctx.rotate(-Math.PI  / 2);
    ctx.fillText(this.ylabel, - ar[1] * 128, 20);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  x(input: number): number {
    return this.ar[0] * input + this.offset.left;
  }
  y(input: number): number {
    return this.ar[0] * input + this.offset.top;
  }

  paintLoop(): void {
    const ctx = this.ctx;
    const dist = this.data ? 2 * Math.round(Math.sqrt(Math.pow(this.data.x - 128, 2) + Math.pow(this.data.y - 128, 2))) : 0;
    const size = this.size;
    const ar = this.ar;
    const offset = this.offset;
    const x = this.x.bind(this);
    const y = this.y.bind(this);
    const p = this.data ? {x: x(this.data.x), y: y(this.data.y)} : {x: x(128), y: y(128)};

    ctx.clearRect(offset.left - 2, offset.top - 2, ar[0] * 256 + 4, ar[1] * 256 + 4);

    // line to center
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${dist * this.accent[0]}, ${dist * this.accent[1]}, ${dist * this.accent[2]})`;
    ctx.lineWidth = dist / 128 * 3 + 1;
    ctx.moveTo(x(128), y(128));
    ctx.lineTo(p.x, p.y);
    ctx.closePath();
    ctx.stroke();

    // dashed axis lines
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#aaa';
    ctx.moveTo(x(0), p.y);
    ctx.lineTo(x(256), p.y);
    ctx.moveTo(p.x, y(0));
    ctx.lineTo(p.x, y(256));
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;
    ctx.moveTo(p.x, y(240));
    ctx.lineTo(p.x, y(256));
    ctx.moveTo(x(0), p.y);
    ctx.lineTo(x(14), p.y);

    ctx.moveTo(x(0) + 1, y(0) + 2);
    ctx.lineTo(x(256) - 2, y(0) + 2);
    ctx.lineTo(x(256) - 2, y(256) - 1);
    ctx.lineTo(x(0) + 1, y(256) - 1);
    ctx.lineTo(x(0) + 1, y(0) + 2);
    ctx.stroke();

    requestAnimationFrame(this.paintLoop.bind(this));
  }
}

