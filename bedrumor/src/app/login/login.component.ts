import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  images = [
    'assets/img/logo1.jpg',
    'assets/img/unnamed (14).jpg',
  ]
  currentImage = 0;
  lightboxOpen = false;
  currentLightboxImage = 0;
  
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

    goLogin() {
      console.log('login');
      this.router.navigate(['/login']);
    }

    prevImage() {
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
    }
  
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }

    openLightbox(index: number) {
      this.currentLightboxImage = index;
      this.lightboxOpen = true;
      // Prevent body scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
      this.lightboxOpen = false;
      // Restore body scrolling
      document.body.style.overflow = 'auto';
    }

    prevLightboxImage() {
      this.currentLightboxImage = (this.currentLightboxImage - 1 + this.images.length) % this.images.length;
    }

    nextLightboxImage() {
      this.currentLightboxImage = (this.currentLightboxImage + 1) % this.images.length;
    }

}
