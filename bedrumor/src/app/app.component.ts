import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bedrumor';

  constructor(private router: Router) {}

  ayyo() {
    console.log('ayyo');
    this.router.navigate(['/second']);
  }
}
