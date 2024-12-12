import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonContent, IonTitle, IonHeader, IonToolbar, IonButton } from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonButton, IonToolbar, IonHeader, IonTitle, IonContent, FormsModule, TranslateModule]
})
export class CorreoPage {
  email = '';

  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async validateEmail() {
    const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      await this.showToast('Correo inválido');
      return;
    }

    const user = await this.dbService.findUserByEmail(this.email);
    if (user) {
      this.router.navigate(['/pregunta'], { queryParams: { email: this.email } });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }


 async goToLogin() {
  this.router.navigate(['/ingreso']); // Ajusta la ruta según tu configuración de rutas
}
}