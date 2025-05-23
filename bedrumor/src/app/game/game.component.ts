import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  isJumping = false;
  gameRunning = false;
  gameOver = false;
  obstacleInterval: any;

  constructor(private router: Router) {}

  goHome() {
    console.log('home');
    this.router.navigate(['/home']);
  }

  startGame() {
    this.gameRunning = true;
    this.gameOver = false;
    this.obstacleInterval = setInterval(() => {
      this.checkCollision();
    }, 10);
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      setTimeout(() => {
        this.isJumping = false;
      }, 500); // Duration of jump
    }
  }

  checkCollision() {
    const dino = document.querySelector('.dino') as HTMLElement;
    const obstacle = document.querySelector('.obstacle') as HTMLElement;

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Check if dinosaur and obstacle overlap
    if (
      dinoRect.left < obstacleRect.left + obstacleRect.width &&
      dinoRect.left + dinoRect.width > obstacleRect.left &&
      dinoRect.top < obstacleRect.top + obstacleRect.height &&
      dinoRect.height + dinoRect.top > obstacleRect.top
    ) {
      this.endGame();
    }
  }

  endGame() {
    this.gameRunning = false;
    this.gameOver = true;
    clearInterval(this.obstacleInterval);
  }

  resetGame() {
    this.startGame();
  }
}
