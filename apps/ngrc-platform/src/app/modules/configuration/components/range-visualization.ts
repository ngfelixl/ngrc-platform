import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, Input, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'ngrc-range-visualization',
  template: '<canvas #canvas></canvas>',
  styles: [`:host, canvas { width: 100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeVisualizationComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;
  @Input() min = 0;
  @Input() max = 0;
  @Input() value = 90;
  @Input() directValue;
  ctx: CanvasRenderingContext2D;
  size: number[];
  offset: number[] = [8, 12];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.height = Math.round(canvas.width / 2);
    this.ctx = canvas.getContext('2d');
    this.size = [canvas.width - this.offset[0] * 2, canvas.height - this.offset[1] * 2];
    this.paintLoop();
  }

  ngOnChanges() {
    if (this.ctx) {
      this.paintLoop();
    }
  }

  paintLoop(): void {
    const ctx = this.ctx;
    const size = this.size;
    const offset = this.offset;
    const radius = size[1];
    const origin = [radius + offset[0], radius + offset[1]];
    const radians = [this.min / 180 * Math.PI, this.max / 180 * Math.PI];
    ctx.clearRect(0, 0, size[0] + 2 * offset[0], size[1] + 2 * offset[1]);

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(origin[0], origin[1], radius, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#ccc';
    ctx.arc(origin[0], origin[1], radius, this.min / 180 * Math.PI, Math.PI + this.min / 180 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#ccc';
    ctx.arc(origin[0], origin[1], radius, - this.max / 180 * Math.PI, Math.PI - this.max / 180 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.clearRect(0, size[1] + offset[1], size[0] + 2 * offset[0], offset[1]);

    ctx.beginPath();
    ctx.strokeStyle = '#aaa';
    ctx.moveTo(0 + offset[0], origin[1]);
    ctx.lineTo(0 + 2 * radius + offset[0], origin[1]);
    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(origin[0], offset[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    ctx.arc(origin[0], origin[1], radius, Math.PI, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#f00';
    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(origin[0] - radius * Math.cos(radians[0]), origin[1] - radius * Math.sin(radians[0]));

    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(origin[0] + radius * Math.cos(radians[1]), origin[1] - radius * Math.sin(radians[1]));
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#888';
    ctx.setLineDash([10, 10]);
    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(
      origin[0] + radius * Math.cos((- radians[0] + Math.PI + radians[1]) / 2),
      origin[1] - radius * Math.sin((- radians[0] + Math.PI + radians[1]) / 2)
    );
    ctx.stroke();
    ctx.setLineDash([]);

    if (this.directValue) {
      ctx.beginPath();
      ctx.strokeStyle = 'blue';
      ctx.moveTo(origin[0], origin[1]);
      ctx.lineTo(origin[0], origin[1] + offset[1] - 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#ccc';
      ctx.moveTo(offset[0], origin[1]);
      ctx.lineTo(offset[0], origin[1] + offset[1] - 2);
      ctx.lineTo(origin[0] + radius, origin[1] + offset[1] - 2);
      ctx.lineTo(origin[0] + radius, origin[1]);
      ctx.stroke();
    }

    // requestAnimationFrame(this.paintLoop.bind(this));
  }
}
