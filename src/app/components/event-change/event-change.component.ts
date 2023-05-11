import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/common/event/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-change',
  templateUrl: './event-change.component.html',
  styleUrls: ['./event-change.component.css']
})
export class EventChangeComponent implements OnInit {
  events : Event[];

  constructor(private eventService: EventService, private router: Router) { }

  selectedEvent: Event | null = null;
  
  ngOnInit(): void {
    this.listEvents();
  }

  listEvents() {
    this.eventService.getEventList().subscribe((events : Event[]) => {
      this.events = events;
    });
  }

  selectEvent(event: Event) {
    this.selectedEvent = event;
    this.router.navigate(['/event', this.selectedEvent.id]);
  }

  updateEvent(event: Event) {
    this.selectedEvent = event;
    this.eventService.deleteEvent(this.selectedEvent.id).subscribe(
      () => {
        location.reload();
      },
      error => {
        console.error(error);
        
      });
  }

  deleteEvent(event: Event) {
    this.selectedEvent = event;
    this.eventService.deleteEvent(this.selectedEvent.id).subscribe(
      () => {
        location.reload();
      },
      error => {
        console.error(error);
        
      });
  }

}