import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  usuarioLogado: Boolean;

  ngOnInit(): void {
    const client = this.clientService.getClientLogado();
    this.usuarioLogado = (client != 0);
  }

  logout(): void {
    this.clientService.logout();
    location.reload();
  }

}
