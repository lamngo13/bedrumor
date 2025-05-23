import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrl: './second.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SecondComponent {

  images = [
    'assets/img/image0.jpeg',
    'assets/img/image1.jpeg',
    'assets/img/image3.jpeg',
    'assets/img/image4.jpeg',
    'assets/img/image5.jpeg',
    'assets/img/image6.jpeg',
    'assets/img/image7.jpeg',
    'assets/img/IMG_1586.jpg',
    'assets/img/IMG_1658.jpg',
    'assets/img/IMG_1661.jpg',
    'assets/img/IMG_2044.jpg',
    'assets/img/IMG_2047.jpg',
    'assets/img/howse.jpg',
  ]
  currentImage = 0;
  
    constructor(private router: Router,
      private elementRef: ElementRef
    ) {}

  //   ngAfterViewInit() {
  //     this.elementRef.nativeElement.ownerDocument
  //         .body.style.backgroundColor = '#494b57';
  // }

  ngOnDestroy() {
    // Reset the background color when this component is destroyed
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = ''; // Reset to default or specify a default color
  }

  
    goHome() {
      console.log('home');
      this.router.navigate(['/home']);
    }

    prevImage() {
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
    }
  
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }

}
