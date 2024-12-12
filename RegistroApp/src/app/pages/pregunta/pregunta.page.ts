import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { IonButton, IonTitle, IonToolbar, IonHeader, IonContent } from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, FormsModule, TranslateModule]
})
export class PreguntaPage implements OnInit {
  email = '';
  userSecretQuestion = '';
  secretAnswer = '';
  isLoading = true;
  userName="";
  userLastName="";

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    const user = await this.dbService.findUserByEmail(this.email);
    if (user) {
      console.log(user)
      this.userName = user.firstName
      this.userLastName = user.lastName
      this.userSecretQuestion = user.secretQuestion;
      this.isLoading = false
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  async validateSecretAnswer() {
    const user = await this.dbService.findUserByEmail(this.email);
    if (user && user.secretAnswer === this.secretAnswer.trim().toLowerCase()) {
      this.router.navigate(['/correcto'], { state: { clave: user.password } });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }



  async goToLogin() {
    this.router.navigate(['/ingreso']); // Ajusta la ruta según tu configuración de rutas
  }

}
