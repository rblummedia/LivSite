import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isConfetti = false;
  attempts = 0;
  noButtonX = 200;
  noButtonY = 60;
  mouseX = 0;
  mouseY = 0;
  confettiPieces: number[] = [];
  escapeDistance = 150;

  // Larger boundary box for button movement
  boxWidth = 800;
  boxHeight = 500;

  ngOnInit() {
    this.confettiPieces = Array(10).fill(0).map((_, i) => i);
    this.initializeButtonPosition();
  }

  initializeButtonPosition() {
    // Position the No button to the right of the Yes button initially
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Yes button is centered, No button should be to its immediate right
    this.noButtonX = centerX + 120;
    this.noButtonY = centerY + 45;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.checkAndEscapeButton();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.initializeButtonPosition();
  }

  checkAndEscapeButton() {
    const buttonCenterX = this.noButtonX + 50;
    const buttonCenterY = this.noButtonY + 25;

    const distance = Math.sqrt(
      Math.pow(this.mouseX - buttonCenterX, 2) +
      Math.pow(this.mouseY - buttonCenterY, 2)
    );

    if (distance < this.escapeDistance) {
      this.moveNoButton();
    }
  }

  moveNoButton() {
    this.attempts++;

    const buttonWidth = 100;
    const buttonHeight = 50;
    const safeMargin = 20;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const minX = Math.max(safeMargin, centerX - this.boxWidth / 2);
    const maxX = Math.min(window.innerWidth - buttonWidth - safeMargin, centerX + this.boxWidth / 2);
    const minY = Math.max(safeMargin, centerY - this.boxHeight / 2);
    const maxY = Math.min(window.innerHeight - buttonHeight - safeMargin, centerY + this.boxHeight / 2);

    let buttonX = Math.random() * (maxX - minX) + minX;
    let buttonY = Math.random() * (maxY - minY) + minY;

    this.noButtonX = buttonX;
    this.noButtonY = buttonY;
  }

  onYes() {
    this.isConfetti = true;
  }

  restart() {
    this.isConfetti = false;
    this.attempts = 0;
    this.initializeButtonPosition();
  }
}