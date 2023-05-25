import { Component, OnInit } from '@angular/core';
import { ShowHouse } from 'src/app/common/showhouse/show-house';
import { NgForm } from '@angular/forms';
import { ShowHouseService } from 'src/app/services/showhouse/show-house.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../common/client/client';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-show-house-save',
  templateUrl: './show-house-save.component.html',
  styleUrls: ['./show-house-save.component.css']
})
export class ShowHouseSaveComponent implements OnInit {

  client = new Client();
  showHouse = new ShowHouse();

  constructor(private clientService: ClientService, private showHouseService: ShowHouseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleEventDetails();
    })

    this.clientService.getClient(this.clientService.getClientLogado()).subscribe(client => {
      this.client = client;
    });
  }

  handleEventDetails() {

    // get the "id" param string convert string to a number using the "+" symbol
    const theHouseId: number = +this.route.snapshot.paramMap.get('id');
    if(theHouseId != 0){
      this.showHouseService.getShowHouse(theHouseId).subscribe(
        data => {
          this.showHouse = data;
        }
      )
    }
  }

  saveShowHouse() {
      this.showHouse.client = this.client;
      this.showHouseService.saveShowHouse(this.showHouse).subscribe(() => {
        data => this.cleanForm();
      });
      this.router.navigate(['/event/']);
  }

  cleanForm() {
    window.location.reload();
  }

}