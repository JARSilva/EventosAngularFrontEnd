import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/common/client/client';
import { ClientForm } from 'src/app/common/clientForm/client-form';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private clientService: ClientService, private router: Router, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  console.log(this.clientService.getClientLogado());
  }

  get f() { return this.loginForm.controls; }
  client = new ClientForm();

  login() {
      this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.client.username = this.f.username.value;
        this.client.password = this.f.password.value;
        this.clientService.loginClient(this.client)
            .pipe()
            .subscribe(
              client => {
                if(client != null){
                  this.clientService.setClientLogado(client);
                  this.router.navigateByUrl('/event').then(success => {
                    if (success) {
                      location.reload();
                    } else {
                      // a navegação falhou
                    }});
                }else{
                  location.reload();
                }
                
              },
                error => {
                  console.error(error);
                });
  }

}
