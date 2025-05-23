import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  constructor(private router: Router) {}

  goHome() {
    console.log('home');
    this.router.navigate(['/home']);
  }

}
