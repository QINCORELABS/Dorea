import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../core/event.service';
import { EventItem } from '../../data/events';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentYear = new Date().getFullYear();


  noResults = false;

  ngOnInit(): void {
    this.eventService.searchResults$.subscribe(results => {
      this.events = results.map(event => ({
        ...event,
        loaded: false
      }));
    });
  
    this.eventService.noResults$.subscribe(flag => {
      this.noResults = flag;
    });
  
    this.eventService.resetSearch();
  }
  
  
 
  constructor(private router: Router,
     private eventService: EventService) {}
  
  events: EventItem[] = [];
  
  goToEvent(id: number) {
    const selectedEvent = this.events.find(e => e.id === id);
    if (selectedEvent) {
      this.eventService.setEventId(selectedEvent.id.toString()); 
      this.eventService.setEventName(selectedEvent.name);        
      this.router.navigate(['/event', id]);
    }
  }
}
