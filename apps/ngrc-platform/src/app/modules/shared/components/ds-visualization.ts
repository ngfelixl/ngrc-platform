import { Component, Input, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild, OnChanges      } from '@angular/core';
import { Controller } from '../../devices/models/controller';

@Component({
  selector: 'app-ds-visualization',
  template: `
    <canvas #background></canvas>
    <canvas #canvas class="content"></canvas>`,
  styles: [
    `
    :host { position: relative; width: 100%; height: 100%; max-width: 600px; }
    canvas { width: 100%; height: 100%; object-fit: contain; object-position: center center; }
    .content { position: absolute; top: 0; left: 0; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsVisualizationComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;
  @ViewChild('background', {static: true}) backgroundRef: ElementRef;
  @Input() data: Controller;

  ctx: CanvasRenderingContext2D;
  size: number[] = [0, 0];
  ar: number[];
  img: HTMLImageElement;
  stickImg: HTMLImageElement;

  constructor() { }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 2 * canvas.width;
    canvas.height = canvas.width / 3.1 * 2;
    this.createBackground(canvas.width, canvas.height);
    this.size = [canvas.width, canvas.height];
    this.ctx = canvas.getContext('2d');
    this.stickImg = new Image();
    this.stickImg.src = './assets/stick.png';
    this.stickImg.onload = this.paintLoop.bind(this);

  }

  createBackground(width: number, height: number) {
    const background = this.backgroundRef.nativeElement;
    background.width = width;
    background.height = height;
    const backgroundCtx = background.getContext('2d');
    this.img = new Image();
    this.img.src = './assets/dualshock.png';
    this.img.onload = () => backgroundCtx.drawImage(this.img, 0, 0, this.size[0], this.size[1]);
  }

  ngOnChanges(): void {
    this.paintLoop();
  }

  paintLoop(): void {
    if (this.data && this.ctx) {
      this.ctx.clearRect(0, 0, this.size[0], this.size[1]);
      this.drawSticks();
      this.drawButtons();
      this.drawTriggers();
    }
  }

  drawTriggers() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#eeeeee';
    this.ctx.fillRect(10, 10, 20, 60);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.rect(10, 10, 20, 60);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(10, 10 + this.data.l2 / 255 * 60);
    this.ctx.lineTo(30, 10 + this.data.l2 / 255 * 60);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = '#eeeeee';
    this.ctx.fillRect(this.size[0] - 30, 10, 20, 60);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.rect(this.size[0] - 30, 10, 20, 60);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(this.size[0] - 30, 10 + this.data.r2 / 255 * 60);
    this.ctx.lineTo(this.size[0] - 10, 10 + this.data.r2 / 255 * 60);
    this.ctx.stroke();
  }

  drawSticks() {
    let d = Math.sqrt(Math.pow(this.data.left.x - 128, 2) + Math.pow(this.data.left.y - 128, 2)) / 128 * 20;
    let targetPos = [
      this.size[0] * 0.272 + d * Math.sin((this.data.left.x - 128) / 128 * 20 / d),
      this.size[1] * 0.419 + d * Math.sin((this.data.left.y - 128) / 128 * 20 / d)
    ];
    this.ctx.strokeStyle = 'white';
    this.ctx.drawImage(this.stickImg, targetPos[0], targetPos[1], 80, 80);
    this.ctx.moveTo(this.size[0] * 0.272 + 40, this.size[1] * 0.419 + 40);
    this.ctx.lineTo(targetPos[0] + 40, targetPos[1] + 40);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.size[0] * 0.272 + 40, this.size[1] * 0.419 + 40, d, 0, 2 * Math.PI);
    this.ctx.stroke();

    d = Math.sqrt(Math.pow(this.data.right.x - 128, 2) + Math.pow(this.data.right.y - 128, 2)) / 128 * 20;
    targetPos = [
      this.size[0] * 0.595 + d * Math.sin((this.data.right.x - 128) / 128 * 20 / d),
      this.size[1] * 0.419 + d * Math.sin((this.data.right.y - 128) / 128 * 20 / d),
    ];
    this.ctx.drawImage(this.stickImg, targetPos[0], targetPos[1], 80, 80);
    this.ctx.moveTo(this.size[0] * 0.595 + 40, this.size[1] * 0.419 + 40);
    this.ctx.lineTo(targetPos[0] + 40, targetPos[1] + 40);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.size[0] * 0.595 + 40, this.size[1] * 0.419 + 40, d, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawButtons() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    if (this.data.x) { this.ctx.arc(this.size[0] * 0.815, this.size[1] * 0.419, 20, 0, 2 * Math.PI); }
    if (this.data.circle) { this.ctx.arc(this.size[0] * 0.887, this.size[1] * 0.3, 20, 0, 2 * Math.PI); }
    this.ctx.fill();
    this.ctx.beginPath();
    if (this.data.triangle) { this.ctx.arc(this.size[0] * 0.815, this.size[1] * 0.181, 20, 0, 2 * Math.PI); }
    if (this.data.square) { this.ctx.arc(this.size[0] * 0.74, this.size[1] * 0.3, 20, 0, 2 * Math.PI); }
    this.ctx.fill();

    this.ctx.beginPath();
    if (this.data.dpadup) { this.ctx.fillRect(this.size[0] * 0.163, this.size[1] * 0.173, 28, 28); }
    if (this.data.dpaddown) { this.ctx.fillRect(this.size[0] * 0.163, this.size[1] * 0.355, 28, 28); }
    this.ctx.fill();
    this.ctx.beginPath();
    if (this.data.dpadright) { this.ctx.fillRect(this.size[0] * 0.22, this.size[1] * 0.264, 28, 28); }
    if (this.data.dpadleft) { this.ctx.fillRect(this.size[0] * 0.104, this.size[1] * 0.264, 28, 28); }
    this.ctx.fill();

    this.ctx.beginPath();
    if (this.data.l1) { this.ctx.fillRect(this.size[0] * 0.10, this.size[1] * 0.005, 100, 15); }
    if (this.data.r1) { this.ctx.fillRect(this.size[0] * 0.8, this.size[1] * 0.005, 100, 15); }
    this.ctx.fill();
  }
}

