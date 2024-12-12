import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule, TranslateModule]})
export class AsistenciaComponent implements OnDestroy {
  asi: any;
  private subscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Suscríbete a los datos del QR que provienen de AuthService
    this.subscription = this.authService.qrCodeData.subscribe((qr: string| null) => {
      if (qr) {
        console.log("Datos del QR en Asistencia:", qr);
        this.asi = JSON.parse(qr); // Almacena los datos del QR en asi
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Limpia la suscripción
    }
  }
}
