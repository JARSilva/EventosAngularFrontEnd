import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/common/event/event'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events : Event[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.listEvents();
  }

  listEvents() {
    this.eventService.getEventList().subscribe((events : Event[]) => {
      this.events = events;
    });
  }

}
