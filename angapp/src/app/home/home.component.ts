import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  language: string = 'en';
  gifPosition = {x: 0, y: 0};
  min_image_distance = 5;
  smoothing_value = 0.04;
  cursorPosition = { x: 0, y: 0 };
  intervalId: any;
  imageSrc = "assets/img/sadheart.png";
  happy_heart_distance = 100;

  constructor(private router: Router,
              private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Start the interval to update the GIF position
    this.intervalId = setInterval(() => this.updateGifPosition(), 16); // ~60 FPS
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorPosition.x = event.clientX + window.scrollX;
    this.cursorPosition.y = event.clientY + window.scrollY;
    // const cursorX = event.clientX + window.scrollX;
    // const cursorY = event.clientY + window.scrollY;

    // // Calculate the distance between the cursor and the GIF's current position
    // const distanceX = cursorX - this.gifPosition.x;
    // const distanceY = cursorY - this.gifPosition.y;
    // const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

    // // Move only if beyond the threshold distance
    // if (distance > this.min_image_distance) {
    //   // Update the position incrementally towards the cursor
    //   this.gifPosition.x += distanceX * this.smoothing_value;
    //   this.gifPosition.y += distanceY * this.smoothing_value;
    // }
  }

  updateGifPosition() {
    // Calculate the distance between the cursor and the GIF's current position
    const distanceX = this.cursorPosition.x - this.gifPosition.x;
    const distanceY = this.cursorPosition.y - this.gifPosition.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Move only if beyond the threshold distance
    if (distance > this.min_image_distance) {
      // Update the position incrementally towards the cursor
      this.gifPosition.x += distanceX * this.smoothing_value;
      this.gifPosition.y += distanceY * this.smoothing_value;
    }

    //display sad or happy heart based on happy_heart_distance
    if (distance < this.happy_heart_distance) {
      this.imageSrc = "assets/img/heart.png";
    } else {
      this.imageSrc = "assets/img/sadheart.png";
  }
}

  second() {
    console.log('second');
    this.router.navigate(['/second']);
  }

  shop() {
    console.log('shop');
    this.router.navigate(['/shop']);
  }

  game() {
    console.log('game');
    this.router.navigate(['/game']);
  }

  toggleLangugae() {  
    console.log('toggleLangugae');
    if (this.language === 'en') {
      this.language = 'sp';
    } else {
      this.language = 'en';
    }
  }

//   ngAfterViewInit() {
//     this.elementRef.nativeElement.ownerDocument
//         .body.style.backgroundColor = '#494b57';
// }

}
