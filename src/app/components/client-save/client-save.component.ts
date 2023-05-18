import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/common/client/client';
import { ClientService } from 'src/app/services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-save',
  templateUrl: './client-save.component.html',
  styleUrls: ['./client-save.component.css']
})
export class ClientSaveComponent implements OnInit {

  client = new Client();

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleEventDetails();
    })
  }

  handleEventDetails() {

    // get the "id" param string convert string to a number using the "+" symbol
    const theClientId: number = +this.route.snapshot.paramMap.get('id');
    if(theClientId != 0){
      this.clientService.getClient(theClientId).subscribe(
        data => {
          this.client = data;
        }
      )
    }
  }

  saveClient() {
      this.clientService.saveClient(this.client).subscribe(() => {
       data => this.cleanForm;
      });
      this.router.navigate(['/event/']);
  }

  cleanForm() {
    window.location.reload();
  }

}
