import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/common/event/event';
import { NavigationEnd, Router } from '@angular/router';
import { ClientService } from '../../services/client/client.service';
import { ShowHouseService } from '../../services/showhouse/show-house.service';
import { ShowHouse } from '../../common/showhouse/show-house';
import { Client } from '../../common/client/client';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-event-change',
  templateUrl: './event-change.component.html',
  styleUrls: ['./event-change.component.css']
})
export class EventChangeComponent implements OnInit {

  client: Client;
  showHouses: ShowHouse[];
  events : Event[];

  constructor(private eventService: EventService, private clientService: ClientService, private showHouseService: ShowHouseService, private router: Router) { }

  selectedEvent: Event | null = null;
  selectedShowHouse: ShowHouse | null = null;
  
  ngOnInit(): void {
    this.getClient();
    this.listShowHouses();
    this.listEvents();
  }
  
  getClient(){
    this.clientService.getPerfil().pipe(
      tap(client => {
        if (!client) {
          console.log('Cliente nulo ou indefinido.');
          this.router.navigate(['/events']);
           } else {
          this.client = client;
        }
      })
    )
    .subscribe();
    
  }

  deleteClient() {
    this.clientService.deleteClientAndLogout().subscribe(() => {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          location.reload();
        });
  
      this.router.navigate(['/events']);
    });
  }

  listEvents() {
    this.eventService.getEventListPorId(this.clientService.getClientLogado()).subscribe((events : Event[]) => {
      this.events = events;
    });
  }

  listShowHouses() {
    this.showHouseService.getShowHouseList().subscribe((showHouses : ShowHouse[]) => {
      this.showHouses = showHouses;
    });
  }

  selectEvent(event: Event) {
    this.selectedEvent = event;
    this.router.navigate(['/event', this.selectedEvent.id]);
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

  selectShowHouse(house: ShowHouse) {
    this.selectedShowHouse = house;
    this.router.navigate(['/event', this.selectedShowHouse.id]);
  }

  deleteShowHouse(house: ShowHouse) {
    this.selectedShowHouse = house;
    this.showHouseService.deleteShowHouse(this.selectedShowHouse.id).subscribe(
      () => {
        location.reload();
      },
      error => {
        console.error(error);
        
      });
  }

}