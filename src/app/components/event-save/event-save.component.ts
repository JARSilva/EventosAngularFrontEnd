import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/common/event/event';
import { Router } from '@angular/router';
import { ShowHouseService } from 'src/app/services/showhouse/show-house.service';
import { ShowHouse } from 'src/app/common/showhouse/show-house';


@Component({
  selector: 'app-event-save',
  templateUrl: './event-save.component.html',
  styleUrls: ['./event-save.component.css']
})
export class EventSaveComponent implements OnInit {

  event = new Event();
  showHouses: ShowHouse[];

  constructor(private eventService: EventService, private showHouseService: ShowHouseService, private router: Router) { }

  saveEvent() {
      this.eventService.saveEvent(this.event).subscribe(() => {
       this.cleanForm();
      });
  }

  cleanForm() {
    window.location.reload();
  }

  listShowHouses() {
    this.showHouseService.getShowHouseList().subscribe((showHouses : ShowHouse[]) => {
      this.showHouses = showHouses;
    });
  }

  ngOnInit(): void {
    this.listShowHouses();
  }

}
