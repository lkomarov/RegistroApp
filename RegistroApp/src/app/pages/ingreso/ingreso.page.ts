import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonLabel, IonItem,IonButton, IonInput,IonButtons,IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationController } from '@ionic/angular';
import { showToast } from 'src/app/tools/message-functions';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonInput, IonContent, IonHeader, IonTitle, IonLabel, IonItem,IonButton,FormsModule, CommonModule,LanguageComponent,IonButtons,IonToolbar, TranslateModule]
})
export class IngresoPage implements AfterViewInit{

cuenta: string = '';
password: string = '';
@ViewChild('animatedTitle', { read: ElementRef }) animatedTitle!: ElementRef;

  constructor(private authService: AuthService, private router: Router,   private animationController: AnimationController

  ) {
    this.cuenta = 'atorres';
    this.password = '1234';
  }
  ngAfterViewInit(): void {
    this.animateTitle();
  }
  private animateTitle() {
    const animation = this.animationController
      .create()
      .addElement(this.animatedTitle.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translateX(0%)', 'translateX(80%)')
      .fromTo('opacity', 0.2, 1);

    animation.play();
  }
  async login() {
    showToast('Clic en botón ingresar');
    this.authService.login(this.cuenta, this.password);
  }

  public ingresarPaginaValidarCorreo(): void{
    this.router.navigate(['/correo']);
  }
  async gotheme(){
    this.router.navigate(['/theme'])
  }
  async recuperarContrasena() {
    this.router.navigate(['/correo']);

  }async rutaduoc(){
    this.router.navigate(['/map']);
  }
}
