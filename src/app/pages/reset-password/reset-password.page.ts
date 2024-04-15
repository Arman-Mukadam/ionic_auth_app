import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonFab, IonToolbar, IonItem, IonInput, IonIcon, IonFabButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonIcon, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class ResetPasswordPage implements OnInit {
  email!: string;
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {
    addIcons({
      mailOutline
    });
  }

  ngOnInit() {
  }
  async resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => {
        console.log("reset link set");
        this.router.navigate(['/login'])
      })
      .catch((err) => {
        console.log(err);
      })

  }

}
