import { CommonModule , isPlatformBrowser} from '@angular/common';
import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.css'
})
export class ShareModalComponent {


  
  readonly url: string = 'http://doreacateringservices.com/';
  readonly text: string = 'Check out our awesome catering platform!';
  isMobile: boolean;

  @Output() close = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isMobile = isPlatformBrowser(this.platformId) && /Mobi|Android/i.test(navigator.userAgent);
  }

  copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${this.text} ${this.url}`).then(() => {
        alert('Link copied to clipboard!');
      });
    } else {
      alert('Clipboard API not supported');
    }
  }

  sendSMS() {
    window.location.href = `sms:?&body=${encodeURIComponent(this.text + ' ' + this.url)}`;
  }

  shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(this.text + ' ' + this.url)}`, '_blank');
  }

  closeModal() {
    this.close.emit();
  }
}
