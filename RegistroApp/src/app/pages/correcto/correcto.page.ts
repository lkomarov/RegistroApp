import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../../model/user';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonContent,IonButton, IonHeader,IonLabel, IonTitle, IonToolbar,
     CommonModule, FormsModule, TranslateModule]
})
export class CorrectoPage {

  imagen: string = 'ruta/de/tu/imagen.png'; // Modifica esta ruta cuando agregues la imagen

  password: string = "";
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(() => {
      const nav = this.router.getCurrentNavigation();
      
      if (nav && nav.extras.state) {
        // Acceso desde 'state' en 'extras'
        this.password = nav.extras.state['clave'];
        console.log('Password de state:', this.password);
      } else {
        // Acceso desde 'queryParams' si viene en la URL
        this.password = this.activatedRoute.snapshot.queryParams['clave'];
        console.log('Password de queryParams:', this.password);
      }
    });
  }
  


  iniciarSesion() {
    this.router.navigate(['/ingreso']);
  }
}

