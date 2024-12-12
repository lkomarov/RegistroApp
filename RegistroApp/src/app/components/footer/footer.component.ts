import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { briefcaseOutline, homeOutline, pencilOutline, qrCodeOutline, idCardOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
//id-card-outline
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent {

  selectedButton = 'welcome';
  @Output() footerClick = new EventEmitter<string>();

  constructor(private router: Router) {
    addIcons({ homeOutline, qrCodeOutline, briefcaseOutline, pencilOutline,idCardOutline });
  }

  sendClickEvent($event: any) {
    this.footerClick.emit($event.detail.value);
  }

  gotomisdatos(){
    this.router.navigate(['/mis-datos']);
  }


}
