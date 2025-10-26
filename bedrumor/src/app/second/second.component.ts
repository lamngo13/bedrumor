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
    'assets/img/unnamed (14).jpg',
    'assets/img/unnamed (15).jpg',
    'assets/img/unnamed (17).jpg',
    'assets/img/unnamed (20).jpg',
    'assets/img/unnamed (21).jpg',
    'assets/img/unnamed (22).jpg',
    'assets/img/unnamed (23).jpg',
    'assets/img/unnamed (24).jpg'
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
