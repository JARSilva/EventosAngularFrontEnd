import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { HttpClientModule } from "@angular/common/http";
import { ClientService } from './services/client/client.service';
import { EventService } from './services/event/event.service';
import { ShowHouseService } from './services/showhouse/show-house.service';
import { OrderService } from './services/order/order.service';
import { RoleService } from './services/Role/role.service';
import { ContactService } from './services/contact/contact.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Routes, RouterModule} from '@angular/router';
import { EventDetalheComponent } from './components/event-detalhe/event-detalhe.component';
import { EventSaveComponent } from './components/event-save/event-save.component';
import { FormsModule }   from '@angular/forms';
import { ShowHouseSaveComponent } from './components/show-house-save/show-house-save.component';
import { OrderSaveComponent } from './components/order-save/order-save.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ClientSaveComponent } from './components/client-save/client-save.component';
import { EventChangeComponent } from './components/event-change/event-change.component';
import { LoginClientComponent } from './components/login-client/login-client.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'event', component: EventListComponent},
  {path: 'orderList', component: OrderListComponent},
  {path: 'login', component: LoginClientComponent},
  {path: 'eventSave', component: EventSaveComponent},
  {path: 'eventChange', component: EventChangeComponent},
  {path: 'showHouse', component: ShowHouseSaveComponent},
  {path: 'clientSave', component: ClientSaveComponent},
  {path: 'eventSave/:id', component: EventSaveComponent},
  {path: 'event/:id', component: EventDetalheComponent},
  {path: 'order/:id', component: OrderSaveComponent},
  {path: '',   redirectTo: 'event', pathMatch: 'full'},
  { path: '**',   redirectTo: 'event', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    NavbarComponent,
    EventSaveComponent,
    ShowHouseSaveComponent,
    OrderSaveComponent,
    OrderListComponent,
    ClientSaveComponent,
    EventChangeComponent,
    LoginClientComponent
  ],  
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ClientService, EventService, ShowHouseService, OrderService, RoleService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
