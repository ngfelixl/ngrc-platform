import { Component, Input, ChangeDetectionStrategy, AfterViewInit,
  ElementRef, ViewChild, OnChanges, HostBinding } from '@angular/core';
import { Controller } from '@ngrc/dualshock-shared';

@Component({
  selector: 'ngrc-ds-visualization',
  template: `
    <canvas #canvas></canvas>
    `,
  styleUrls: [ './ds-visualization.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsVisualizationComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;
  @HostBinding('class.disconnected')
  @Input() disconnected = false;
  @Input() data: Controller;

  private ctx: CanvasRenderingContext2D;
  private size: number[] = [0, 0];
  private img: HTMLImageElement;
  private stickImg: HTMLImageElement;

  constructor() { }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 2 * canvas.width;
    canvas.height = canvas.width / 3.1 * 2;
    this.size = [canvas.width, canvas.height];
    this.ctx = canvas.getContext('2d');
    this.stickImg = new Image();
    this.stickImg.src = './assets/stick.png';
    this.stickImg.onload = this.paintLoop.bind(this);
    this.img = new Image();
    this.img.src = './assets/dualshock.png';
    this.img.onload = this.paintLoop.bind(this);
  }

  ngOnChanges(): void {
    this.paintLoop();
  }

  drawBackground() {
    this.ctx.drawImage(this.img, 0, 0, this.size[0], this.size[1]);
  }

  paintLoop(): void {
    if (this.data && this.ctx) {
      this.ctx.clearRect(0, 0, this.size[0], this.size[1]);
      this.drawBackground();
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
    this.ctx.moveTo(10, 10 + this.data.triggers.l2 / 255 * 60);
    this.ctx.lineTo(30, 10 + this.data.triggers.l2 / 255 * 60);
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
    this.ctx.moveTo(this.size[0] - 30, 10 + this.data.triggers.r2 / 255 * 60);
    this.ctx.lineTo(this.size[0] - 10, 10 + this.data.triggers.r2 / 255 * 60);
    this.ctx.stroke();
  }

  drawSticks() {
    let d = Math.sqrt(Math.pow(this.data.sticks.left.x - 128, 2) + Math.pow(this.data.sticks.left.y - 128, 2)) / 128 * 20;
    let targetPos = [
      this.size[0] * 0.272 + d * Math.sin((this.data.sticks.left.x - 128) / 128 * 20 / d),
      this.size[1] * 0.419 + d * Math.sin((this.data.sticks.left.y - 128) / 128 * 20 / d)
    ];
    this.ctx.strokeStyle = 'white';
    this.ctx.drawImage(this.stickImg, targetPos[0], targetPos[1], 80, 80);
    this.ctx.moveTo(this.size[0] * 0.272 + 40, this.size[1] * 0.419 + 40);
    this.ctx.lineTo(targetPos[0] + 40, targetPos[1] + 40);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.size[0] * 0.272 + 40, this.size[1] * 0.419 + 40, d, 0, 2 * Math.PI);
    this.ctx.stroke();

    d = Math.sqrt(Math.pow(this.data.sticks.right.x - 128, 2) + Math.pow(this.data.sticks.right.y - 128, 2)) / 128 * 20;
    targetPos = [
      this.size[0] * 0.595 + d * Math.sin((this.data.sticks.right.x - 128) / 128 * 20 / d),
      this.size[1] * 0.419 + d * Math.sin((this.data.sticks.right.y - 128) / 128 * 20 / d),
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
    if (this.data.buttons.x) { this.ctx.arc(this.size[0] * 0.815, this.size[1] * 0.419, 20, 0, 2 * Math.PI); }
    if (this.data.buttons.circle) { this.ctx.arc(this.size[0] * 0.887, this.size[1] * 0.3, 20, 0, 2 * Math.PI); }
    this.ctx.fill();
    this.ctx.beginPath();
    if (this.data.buttons.triangle) { this.ctx.arc(this.size[0] * 0.815, this.size[1] * 0.181, 20, 0, 2 * Math.PI); }
    if (this.data.buttons.square) { this.ctx.arc(this.size[0] * 0.74, this.size[1] * 0.3, 20, 0, 2 * Math.PI); }
    this.ctx.fill();

    this.ctx.beginPath();
    if (this.data.buttons.dpadup) { this.ctx.fillRect(this.size[0] * 0.163, this.size[1] * 0.173, 28, 28); }
    if (this.data.buttons.dpaddown) { this.ctx.fillRect(this.size[0] * 0.163, this.size[1] * 0.355, 28, 28); }
    this.ctx.fill();
    this.ctx.beginPath();
    if (this.data.buttons.dpadright) { this.ctx.fillRect(this.size[0] * 0.22, this.size[1] * 0.264, 28, 28); }
    if (this.data.buttons.dpadleft) { this.ctx.fillRect(this.size[0] * 0.104, this.size[1] * 0.264, 28, 28); }
    this.ctx.fill();

    this.ctx.beginPath();
    if (this.data.buttons.l1) { this.ctx.fillRect(this.size[0] * 0.10, this.size[1] * 0.005, 100, 15); }
    if (this.data.buttons.r1) { this.ctx.fillRect(this.size[0] * 0.8, this.size[1] * 0.005, 100, 15); }
    this.ctx.fill();
  }
}

