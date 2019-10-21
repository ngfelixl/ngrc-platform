import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ngrc-analog-value',
  template: '<canvas #canvas></canvas>',
  styles: ['canvas { width: 100%; max-width: 256px; }']
})
export class AnalogValueComponent implements AfterViewInit {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;
  @Input() value = 0;
  @Input() color = 'rgb(0, 96, 100)';
  ctx: CanvasRenderingContext2D;
  size: { x: number, y: number };

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.height = Math.round(canvas.width / 10);
    this.ctx = canvas.getContext('2d');
    this.size = { x: canvas.width, y: canvas.height };
    this.paintLoop();
  }

  paintLoop(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.size.x, this.size.y);

    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.size.x * (this.value / 100), this.size.y);

    // border
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;
    ctx.moveTo(0, 0);
    ctx.lineTo(this.size.x, 0);
    ctx.lineTo(this.size.x, this.size.y);
    ctx.lineTo(0, this.size.y);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(this.paintLoop.bind(this));
  }
}
