import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Asistencia } from 'src/app/model/asistencia';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MiclaseComponent  implements OnInit {
  @Output() exit = new EventEmitter<void>();


  asistencia= new Asistencia();

  constructor(private authService: AuthService, private bd: DatabaseService) { }

  ngOnInit() {
    this.bd.asistenciaDatosQR.subscribe((datosQR) => {
      if (datosQR) {
        this.asistencia = datosQR;
      }
    });
  }
  logout() {
    this.authService.logout();
  }
}
