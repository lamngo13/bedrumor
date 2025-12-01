import { Component, ViewEncapsulation, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
//import { createClient } from '@supabase/supabase-js'
import { SupabaseService } from '../supabase-client';

// const supabaseUrl = 'https://wlzjjwoawqfixjqwdrfc.supabase.co'
// //TODO env this
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDY1NjUsImV4cCI6MjA4MDA4MjU2NX0.zMJlHWJ1XZ1hfr_7FaDHaboF1FrOJgM_9Rbg3e6OR1I'
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDY1NjUsImV4cCI6MjA4MDA4MjU2NX0.zMJlHWJ1XZ1hfr_7FaDHaboF1FrOJgM_9Rbg3e6OR1I'
// const newsupakey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsempqd29hd3FmaXhqcXdkcmZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUwNjU2NSwiZXhwIjoyMDgwMDgyNTY1fQ.s04Wa8XsWYbCsDnzML4JpBKzojLgbVxcmSxspu3Uxs4'
// //^ use this one, but make sure to put it in gh env vars
// const supabase = createClient(supabaseUrl, newsupakey)

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
    public dialog: MatDialog,
    private supabase: SupabaseService
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

  genupload() {
    console.log('Opening file picker...');
    this.fileInput.nativeElement.click();
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
//     async sendImageToBackend() {
//   try {
//     if (!this.selectedFile) {
//       console.error('No file selected.');
//       return;
//     }

//     const file = this.selectedFile;

//     // OPTIONAL: give it a unique filename
//     const filePath = `gallery/${Date.now()}_${file.name}`;

//     // Upload to Supabase
//     const { data, error } = await supabase
//       .storage
//       .from('images')
//       .upload(filePath, file, {
//         upsert: true
//       });

//     if (error) {
//       console.error('Upload failed:', error);
//       return;
//     }

//     console.log('Upload success:', data);

//     // Get public URL
//     const { data: urlData } = supabase
//       .storage
//       .from('images')
//       .getPublicUrl(filePath);

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
