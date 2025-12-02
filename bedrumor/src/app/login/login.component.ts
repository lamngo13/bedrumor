import { Component, ViewEncapsulation, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { supabase } from '../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  isLoggedIn = false;
  password = "fp";
  temppassword = "fp";

  // NOW stores both filename + URL
  images: { name: string; url: string }[] = [
    { name: 'logo1.jpg', url: 'assets/img/logo1.jpg' },
    { name: 'unnamed (14).jpg', url: 'assets/img/unnamed (14).jpg' }
    //THIS IS A PLACEHOLDER IN CASE NOTHING LOADS
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

  ngOnInit() {
    this.loadAllImages();
    this.loadPassword();
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '';
  }

  goHome() { this.router.navigate(['/home']); }
  goLogin() { this.router.navigate(['/login']); }

  // ------------------------------
  // LOAD ALL IMAGES FROM SUPABASE
  // ------------------------------
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

            console.log('Public URL data:', data.publicUrl);


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

    async loadPassword() {
  try {
    const { data: files, error } = await supabase
      .storage
      .from('fp')
      .list('', {
        limit: 1000,
        offset: 0
      });

    if (error) {
      console.error('Failed to list password:', error);
      return null; // ensure function returns something
    }

    if (!files) {
      console.error('No files returned for password.');
      return null; // ensure function returns something
    }

    // Convert to objects containing name + public URL (now SIGNED URLs)
    var tpass = files
      .filter(f => !f.name.endsWith('/'))
      .map(async f => {

        // Instead of public URL → create a signed URL (private bucket fix)
        const { data: signed, error: signedErr } = await supabase
          .storage
          .from('fp')
          .createSignedUrl(f.name, 60); // URL valid for 60 seconds

        if (signedErr) {
          console.error('Failed to create signed URL:', signedErr);
          return null;
        }

        const signedUrl = signed.signedUrl;

        // 4. Fetch its contents (same as before)
        const resp = await fetch(signedUrl);
        const text = await resp.text(); // plaintext OR json-as-text

        // 5. Store the password locally
        const password = text.trim(); // "pretendpassword"

        //https://wlzjjwoawqfixjqwdrfc.supabase.co/storage/v1/object/public/fp/fpp.json 400 (Bad Request)
        
        //https://wlzjjwoawqfixjqwdrfc.supabase.co/storage/v1/object/public/images/unnamed%20(17).jpg
        //https://wlzjjwoawqfixjqwdrfc.supabase.co/storage/v1/object/public/images/logo1.jpg
        //this is reference from images and it works
        
        console.log('PASSWORD LOADED:', password);

        return password;
      });

    return tpass; // ensure function returns something

  } catch (e) {
    console.error('Error loading password:', e);
    return null; // ensure all paths return something
  }
}

  // ------------------------------
  // FILE UPLOAD
  // ------------------------------
  genupload() {
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

    this.generalUpload();
  }

  async generalUpload() {
    try {
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }

      const file = this.selectedFile;
      const fileName = file.name;

      const { data, error } = await supabase
        .storage
        .from('images')
        .upload(fileName, file, { upsert: true });

      if (error) {
        console.error('Upload failed:', error);
        return;
      }

      console.log('Upload success:', data);

      await this.loadAllImages();

    } catch (e) {
      console.error('Error uploading:', e);
    }
  }

  // ------------------------------
  // DELETE IMAGE
  // ------------------------------
  async deleteImage(imageName: string) {
    try {
      const { error } = await supabase
        .storage
        .from('images')
        .remove([imageName]);

      if (error) {
        console.error('Delete failed:', error);
        return;
      }

      console.log('Deleted:', imageName);

      await this.loadAllImages();
      this.closeLightbox();

    } catch (e) {
      console.error('Error deleting image:', e);
    }
  }

  // ------------------------------
  // LIGHTBOX + NAVIGATION
  // ------------------------------
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

  // ------------------------------
  // LOGIN DIALOG
  // ------------------------------
  openPasswordDialog() {
    const ref = this.dialog.open(PasswordDialogComponent, { width: '300px' });

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
   INLINE PASSWORD DIALOG
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
