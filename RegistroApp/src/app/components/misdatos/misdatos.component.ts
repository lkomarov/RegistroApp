import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { Router } from '@angular/router';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,IonicModule, DatePickerComponent, TranslateModule]
})
export class MisDatosComponent {
  usuario: User = new User();
  usuarios: User[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();

  constructor(
    private bd: DatabaseService,
    private auth: AuthService,
    private api: APIClientService,
    private router: Router
  ) {
    this.bd.userList.subscribe((usuarios) => {
      if (usuarios) {
        this.usuarios = usuarios;
      }
    });
    this.auth.readAuthUser().then((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        console.log(this.usuario);
      }
    });
  }

  guardarUsuario() {
    if (this.usuario.firstName.trim() === '') {
      showToast('El usuario debe tener un nombre');
    } else {
      console.log(this.usuario);
      this.bd.saveUser(this.usuario);
      this.auth.saveAuthUser(this.usuario);
      showToast('El usuario fue guardado correctamente');
    }
  }

  public actualizarNivelEducacional(event: any) {
    this.usuario.educationalLevel = EducationalLevel.findLevel(event.detail.value)!;
  }

  onFechaNacimientoChange(event: any) {
    const fecha = new Date(event.detail.value);
    this.usuario.dateOfBirth = fecha;
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
