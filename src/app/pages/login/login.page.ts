import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonIcon, IonFab, IonText, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonText, IonFab, IonIcon, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    public form: FormBuilder,
    public loadingCntrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router) {
    addIcons({
      mailOutline,
      lockClosedOutline,
      chevronForward
    });
  }

  ngOnInit() {
    this.loginForm = this.form.group({
      // fullName: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        // Validators.email,
        // Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password: ['', [
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
      ]
      ]
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  async login() {
    const loading = await this.loadingCntrl.create();
    await loading.present();
    try {
      if (this.loginForm.valid) {
        const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
          console.log(err);
          loading.dismiss();
        });

        if (user) {
          loading.dismiss();
          console.log('Navigation will be attempted now');
          await this.router.navigate(['/home']);
        } else {
          loading.dismiss();
          console.log('Please provide all the required values!');
        }
      } else {
        loading.dismiss();
        console.log('Form is invalid');
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  }
}