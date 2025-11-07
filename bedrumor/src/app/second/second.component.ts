import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrl: './second.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SecondComponent implements OnInit {

  images: { id: string, url: string, path: string }[] = [];
  currentImage = 0;
  lightboxOpen = false;
  currentLightboxImage = 0;
  uploading = false;
  storage: any;
  db: any;
  
    constructor(private router: Router,
      private elementRef: ElementRef,
      public firebaseConfig = {
      apiKey: "AIzaSyAbvX4RbHPol_YbxhlT9OcwR4Uam5WbbYw",
      authDomain: "backendbedrumor.firebaseapp.com",
      projectId: "backendbedrumor",
      storageBucket: "backendbedrumor.firebasestorage.app",
      messagingSenderId: "84162335637",
      appId: "1:84162335637:web:0ea9e3fde79d8bc44b5c9c",
      measurementId: "G-FS3XQHTMYQ"},
      public app = initializeApp(firebaseConfig),
      public analytics = getAnalytics(app)
      
    ) {
      this.storage = getStorage(this.app);
      this.db = getFirestore(this.app);
    }

  ngOnInit() {
    this.loadImages();
  }

  async loadImages() {
    try {
      const imagesCollection = collection(this.db, 'gallery-images');
      const q = query(imagesCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      this.images = [];
      querySnapshot.forEach((doc) => {
        this.images.push({
          id: doc.id,
          url: doc.data()['url'],
          path: doc.data()['path']
        });
      });
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    this.uploading = true;
    try {
      // Create a unique filename with timestamp
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name}`;
      const storageRef = ref(this.storage, `gallery/${filename}`);
      
      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save metadata to Firestore
      const imagesCollection = collection(this.db, 'gallery-images');
      await addDoc(imagesCollection, {
        url: downloadURL,
        path: `gallery/${filename}`,
        timestamp: timestamp,
        filename: file.name
      });
      
      // Reload images
      await this.loadImages();
      
      // Reset file input
      event.target.value = '';
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      this.uploading = false;
    }
  }

  async deleteImage(imageId: string, imagePath: string) {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Delete from Storage
      const storageRef = ref(this.storage, imagePath);
      await deleteObject(storageRef);
      
      // Delete from Firestore
      await deleteDoc(doc(this.db, 'gallery-images', imageId));
      
      // Reload images
      await this.loadImages();
      
      // Close lightbox if it was open
      if (this.lightboxOpen) {
        this.closeLightbox();
      }
      
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
    }
  }

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

    getImageUrl(index: number): string {
      return this.images[index]?.url || '';
    }

}
