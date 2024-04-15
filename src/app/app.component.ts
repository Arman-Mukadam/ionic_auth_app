import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, AngularFireModule, AngularFireAuthModule,
  ],
})
export class AppComponent {
  constructor() { }
}
