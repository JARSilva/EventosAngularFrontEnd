import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/common/event/event'
import { Client } from 'src/app/common/client/client';


@Component({
  selector: 'app-event-detalhe',
  templateUrl: './event-detalhe.component.html',
  styleUrls: ['./event-detalhe.component.css']
})
export class EventDetalheComponent implements OnInit {

  event : Event;
  client: Client;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleEventDetails();
    })
  }

  handleEventDetails() {

    // get the "id" param string convert string to a number using the "+" symbol
    const theEventId: number = +this.route.snapshot.paramMap.get('id');

    this.eventService.getEvent(theEventId).subscribe(
      data => {
        this.event = data;
        this.client = data.client;
      }
    )
  }
  comprar(){
    this.router.navigate(['/order/'+this.event.id]);
  }
}
