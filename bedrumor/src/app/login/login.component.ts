import { Component, ViewEncapsulation, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
//import { supabase } from '../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  isLoggedIn = false;
  password = 'fp'; // TODO env

  images = [
    'assets/img/logo1.jpg',
    'assets/img/unnamed (14).jpg',
  ];

  currentImage = 0;
  lightboxOpen = false;
  currentLightboxImage = 0;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '';
  }

  goHome() { this.router.navigate(['/home']); }
  goLogin() { this.router.navigate(['/login']); }

  tryLogin() {
    const userInput = (document.getElementById('passwordInput') as HTMLInputElement).value;
    if (userInput === this.password) {
      this.isLoggedIn = true;
      alert('Login successful!');
    } else {
      alert('Incorrect password.');
    }
  }

  genupload()  {
    console.log('Generating upload image...');
    this.fileInput.nativeElement.click();
    // TODO implement upload image generation
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      console.log('No file selected');
      return;
    }

    this.selectedFile = input.files[0];
    console.log('Selected file:', this.selectedFile);
    console.log("now attempting to send to backend...");
  }

  //  async uploadSadHeart() {
  //   try {
  //     // Step 1: Fetch file from assets
  //     const response = await fetch('assets/img/sadheart.png');
  //     const blob = await response.blob();

  //     // Convert Blob → File
  //     const file = new File([blob], 'sadheart.png', { type: 'image/png' });

  //     // Step 2: Upload to Supabase
  //     const { data, error } = await supabase
  //       .storage
  //       .from('images')            // bucket name
  //       .upload('sadheart.png', file, {
  //         upsert: true
  //       });

  //     if (error) {
  //       console.error('Upload failed:', error);
  //       return;
  //     }

  //     console.log('Upload success:', data);

  //     // Step 3: Get public URL
  //     const { data: urlData } = supabase
  //       .storage
  //       .from('images')
  //       .getPublicUrl('sadheart.png');

  //     console.log('Public URL:', urlData.publicUrl);

  //   } catch (e) {
  //     console.error('Error uploading:', e);
  //   }
  // }

  prevImage() {
    this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  openLightbox(index: number) {
    this.currentLightboxImage = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = 'auto';
  }

  prevLightboxImage() {
    this.currentLightboxImage = (this.currentLightboxImage - 1 + this.images.length) % this.images.length;
  }

  nextLightboxImage() {
    this.currentLightboxImage = (this.currentLightboxImage + 1) % this.images.length;
  }


  // -----------------------------
  // ✅ OPEN THE INLINE DIALOG
  // -----------------------------
  openPasswordDialog() {
    const ref = this.dialog.open(PasswordDialogComponent, {
      width: '300px'
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      if (result === this.password) {
        this.isLoggedIn = true;
        alert('Login successful!');
      } else {
        alert('Incorrect password.');
      }
    });
  }
}


/* =======================================================
   ✅ INLINE DIALOG COMPONENT (AOT-SAFE, SAME FILE)
   ======================================================= */

@Component({
  standalone: true,
  template: `
    <h3>Enter Password</h3>
    <input matInput [(ngModel)]="password" type="password" autofocus />

    <div style="margin-top: 16px; text-align: right;">
      <button mat-button (click)="close()">OK</button>
    </div>
  `,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, FormsModule]
})
export class PasswordDialogComponent {
  password = '';
  ref = inject(MatDialogRef<PasswordDialogComponent>);

  close() {
    this.ref.close(this.password);
  }
}
