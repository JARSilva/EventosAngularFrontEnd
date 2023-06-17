import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/common/event/event';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowHouseService } from 'src/app/services/showhouse/show-house.service';
import { ShowHouse } from 'src/app/common/showhouse/show-house';
import { ClientService } from '../../services/client/client.service';
import { Client } from '../../common/client/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-event-save',
  templateUrl: './event-save.component.html',
  styleUrls: ['./event-save.component.css']
})
export class EventSaveComponent implements OnInit {

  client = new Client();
  event = new Event();
  showHouses: ShowHouse[];
  image: File;
  selectedFile = null;
  selectedImageBase64: string;
  

  constructor(private clientService: ClientService, private eventService: EventService, private showHouseService: ShowHouseService, private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.listShowHouses();
    this.route.paramMap.subscribe(() => {
      this.handleEventDetails();
    })
    this.clientService.getClient(this.clientService.getClientLogado()).subscribe(client => {
      this.client = client;
    });
  }

  handleEventDetails() {

    // get the "id" param string convert string to a number using the "+" symbol
    const theEventId: number = +this.route.snapshot.paramMap.get('id');
    if(theEventId != 0){
      this.eventService.getEvent(theEventId).subscribe(
        data => {
          this.event = data;
          const showHouseSelect = document.getElementById('showHouse') as HTMLSelectElement;
          for (let i = 1; i < showHouseSelect.options.length; i++) {
            const option = showHouseSelect.options[i] as HTMLOptionElement;
            const id = Number(option.index);
            if (id === this.event.showHouse.id) {
              showHouseSelect.selectedIndex = i;
              break;
            }
          }
        }
      )
    }
  }

 onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.convertToBase64(this.selectedFile); // Convert the selected image to base64
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveEvent() {

    // Salvar o nome da imagem no objeto de evento
    this.event.imageUrl = this.selectedImageBase64;
    this.event.client = this.client;
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

}
