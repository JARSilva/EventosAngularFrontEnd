import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders : Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.listOrders();
  }

  listOrders() {
    this.orderService.getOrderList().subscribe((orders : Order[]) => {
      this.orders = orders;
    });
  }

}
