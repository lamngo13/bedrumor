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
  isScrolled = false; // Track scroll state for header background

  constructor(private router: Router,
              private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Start the interval to update the GIF position
    this.intervalId = setInterval(() => this.updateGifPosition(), 16); // ~60 FPS
    //log version and github pages
    console.log("Version 4.2.2 on gh branch: fix_sizing -> dev ->...");
    console.log("Note: this branch was deployed with ghpages branch (or something directly modified with it).")
    console.log("The steps are to make a local branch, run ng deploy -- base-href=quote/quote, that creates ghpages branch,")
    console.log("then modify ghpages branch to manually make index.html href = /, then deploy that on the ui with gh pages.")
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
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Check if user has scrolled down more than 50 pixels
    this.isScrolled = window.scrollY > 50;
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

  // shop() {
  //   console.log('shop');
  //   this.router.navigate(['/shop']);
  // }
  shop() {
    window.open('https://bedrumor.bandcamp.com/merch', '_blank');
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
