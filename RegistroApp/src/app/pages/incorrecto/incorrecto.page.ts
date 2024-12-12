import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonButton, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonLabel, IonButton, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule]
})
export class IncorrectoPage {

  imagen: string = '../../../assets/images/incorrecto.jpg';

  constructor(private router: Router) {}


  iniciarSesion() {
    this.router.navigate(['/ingreso']);
  }
}
