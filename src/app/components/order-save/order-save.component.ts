import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/common/event/event'
import { Order } from 'src/app/common/order/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-save',
  templateUrl: './order-save.component.html',
  styleUrls: ['./order-save.component.css']
})
export class OrderSaveComponent implements OnInit {

  event : Event;
  order = new Order();

  constructor(private eventService: EventService, private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

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
      }
    )
  }

  saveOrder() {
    this.order.event = this.event;
    this.order.orderDate = this.event.date;
    this.order.total = this.event.price * this.order.qtd;
    this.orderService.saveOrder(this.order).subscribe(() => {
     data => this.cleanForm;
    });
    this.router.navigate(['/event/']);
}

cleanForm() {
  window.location.reload();
}

}
