import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { Asistencia } from 'src/app/model/asistencia';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { showAlertError } from 'src/app/tools/message-functions';
import { Router } from '@angular/router';
import { MiclaseComponent } from "../../components/miclase/miclase.component";
import { AsistenciaComponent } from 'src/app/components/asistencia/asistencia.component';
import { MisDatosComponent } from 'src/app/components/misdatos/misdatos.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, TranslateModule, IonicModule,
    HeaderComponent, FooterComponent,
    WelcomeComponent, QrWebScannerComponent,
    ForumComponent,
    MiclaseComponent,AsistenciaComponent,MisDatosComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';
  asistencia: Asistencia | null = null;

  constructor(private auth: AuthService, private scanner: ScannerService, private router: Router) { }

  ionViewWillEnter() {
    this.changeComponent('welcome');
  }

  async headerClick(button: string) {

    if (button === 'testqr')
      this.showAsistenciaComponent(Asistencia.jsonAsistenciaExample);

    if (button === 'scan' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'qrwebscanner';

    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
        this.showAsistenciaComponent(await this.scanner.scan());
  }

  webQrScanned(qr: string) {
    this.showAsistenciaComponent(qr);

  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  showAsistenciaComponent(qr: string) {
    console.log("Código QR recibido:", qr);
    if (Asistencia.isvalidasistenciaQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      console.log("Cambiando a componente de asistencia.");
      this.changeComponent('miclase');
      console.log("Selected component now is:", this.selectedComponent);
      return;
    }

    this.changeComponent('welcome');
  }

  footerClick(button: string) {
    this.selectedComponent = (button === 'my_data') ? 'misdatos' : button;
    console.log("Botón del footer seleccionado:", button); // Para depuración
  }

  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name;
    console.log("Cambiando componente a:", name); // Para depuración

  }
}

