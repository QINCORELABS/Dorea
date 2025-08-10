import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EVENTS, EventItem } from '../data/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventNameSubject = new BehaviorSubject<string | null>(null);
  private eventIdSubject = new BehaviorSubject<string | null>(null);

  private searchResultsSubject = new BehaviorSubject<EventItem[]>(EVENTS);
  searchResults$ = this.searchResultsSubject.asObservable();

  private noResultsSubject = new BehaviorSubject<boolean>(false);
  noResults$ = this.noResultsSubject.asObservable();

  eventName$ = this.eventNameSubject.asObservable();
  eventId$ = this.eventIdSubject.asObservable();

  searchEvents(query: string) {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      this.searchResultsSubject.next(EVENTS);
      this.noResultsSubject.next(false); 
      return;
    }

    const filtered = EVENTS.filter(event =>
      event.name.toLowerCase().includes(trimmed) ||
      event.description.toLowerCase().includes(trimmed)
    );

    this.searchResultsSubject.next(filtered);
    this.noResultsSubject.next(filtered.length === 0); 
  }

  resetSearch(): void {
    this.eventNameSubject.next(null);
    this.searchResultsSubject.next(EVENTS);
    this.noResultsSubject.next(false);
  }
  

  setEventName(name: string) {
    this.eventNameSubject.next(name);
    this.searchEvents(name);
  }

  getEventName(): string | null {
    return this.eventNameSubject.value;
  }

  setEventId(id: string) {
    this.eventIdSubject.next(id);
  }

 
  getEventId(): string | null {
    return this.eventIdSubject.value;
  }
}
