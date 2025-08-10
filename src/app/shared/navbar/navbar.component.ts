import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter ,Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() context: 'event' | 'home' = 'home';
  @Output() onSearch = new EventEmitter<string>();

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onSearch.emit(input.value);
  }
}
