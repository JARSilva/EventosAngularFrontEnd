import { Component, OnInit } from '@angular/core';
import { ShowHouse } from 'src/app/common/showhouse/show-house';
import { NgForm } from '@angular/forms';
import { ShowHouseService } from 'src/app/services/showhouse/show-house.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-house-save',
  templateUrl: './show-house-save.component.html',
  styleUrls: ['./show-house-save.component.css']
})
export class ShowHouseSaveComponent implements OnInit {

  showHouse = new ShowHouse();

  constructor(private showHouseService: ShowHouseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleEventDetails();
    })
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
      this.showHouseService.saveShowHouse(this.showHouse).subscribe(() => {
        data => this.cleanForm();
      });
      this.router.navigate(['/event/']);
  }

  cleanForm() {
    window.location.reload();
  }

}