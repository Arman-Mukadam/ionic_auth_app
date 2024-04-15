import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  user: any;

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.user = authService.getProfile();
  }

  async logOut() {
    this.authService.signOut()
      .then(() => {
        this.router.navigate(['/landing'])
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
