import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/common/client/client';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-save',
  templateUrl: './client-save.component.html',
  styleUrls: ['./client-save.component.css']
})
export class ClientSaveComponent implements OnInit {

  client = new Client();

  constructor(private clientService: ClientService, private router: Router) { }

  saveClient() {
      this.clientService.saveClient(this.client).subscribe(() => {
       data => this.cleanForm;
      });
      this.router.navigate(['/event/']);
  }

  cleanForm() {
    window.location.reload();
  }

  ngOnInit(): void {
    
  }

}
