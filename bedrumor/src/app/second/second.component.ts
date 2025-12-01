import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { supabase } from '../supabase.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrl: './second.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SecondComponent {

  // images = [
  //   'assets/img/logo1.jpg',
  //   'assets/img/unnamed (14).jpg',
  //   // 'assets/img/unnamed (15).jpg',
  //   // 'assets/img/unnamed (17).jpg',
  //   // 'assets/img/unnamed (20).jpg',
  //   // 'assets/img/unnamed (21).jpg',
  //   // 'assets/img/unnamed (22).jpg',
  //   // 'assets/img/unnamed (23).jpg',
  //   // 'assets/img/unnamed (24).jpg'
  // ]

  images: { name: string; url: string }[] = [
    { name: 'logo1.jpg', url: 'assets/img/logo1.jpg' },
    { name: 'unnamed (14).jpg', url: 'assets/img/unnamed (14).jpg' }
  ];

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

  ngOnInit() {
    this.loadAllImages();
    console.log("second component load all images called")
  }

  ngOnDestroy() {
    // Reset the background color when this component is destroyed
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = ''; // Reset to default or specify a default color
  }

  async loadAllImages() {
    try {
      const { data: files, error } = await supabase
        .storage
        .from('images')
        .list('', {
          limit: 1000,
          offset: 0
        });

      if (error) {
        console.error('Failed to list images:', error);
        return;
      }

      if (!files) {
        console.error('No files returned.');
        return;
      }

      // Convert to objects containing name + public URL
      this.images = files
        .filter(f => !f.name.endsWith('/'))
        .map(f => {
          const { data } = supabase
            .storage
            .from('images')
            .getPublicUrl(f.name);

          return {
            name: f.name,
            url: data.publicUrl
          };
        });

      console.log('Loaded images:', this.images);

    } catch (e) {
      console.error('Error loading images:', e);
    }
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
