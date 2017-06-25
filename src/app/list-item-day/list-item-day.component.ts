import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-item-day',
  templateUrl: './list-item-day.component.html',
  styleUrls: ['./list-item-day.component.css']
})
export class ListItemDayComponent implements OnInit {

  @Input() data: any;

  constructor() {
    console.log('in cons');
    console.log(this.data);
  }

  getMyDay(day) {
    switch (day) {
      case 0: {
        return 'อาทิตย์';
      }
      case 1: {
        return 'จันทร์';
      }
      case 2: {
        return 'อังคาร';
      }
      case 3: {
        return 'พุธ';
      }
      case 4: {
        return 'พฤหัส';
      }
      case 5: {
        return 'ศุกร์';
      }
      case 6: {
        return 'เสาร์';
      }
    }
  }

  getMyMonth(month) {
    switch (month) {
      case 1: {
        return 'มกราคม';
      }
      case 2: {
        return 'กุมภาพันธ์';
      }
      case 3: {
        return 'มีนาคม';
      }
      case 4: {
        return 'เมษายน';
      }
      case 5: {
        return 'พฤษภาคม';
      }
      case 6: {
        return 'มิถุนายน';
      }
      case 7: {
        return 'กรกฎาคม';
      }
      case 8: {
        return 'สิงหาคม';
      }
      case 9: {
        return 'กันยายน';
      }
      case 10: {
        return 'ตุลาคม';
      }
      case 11: {
        return 'พฤศจิกายน';
      }
      case 12: {
        return 'ธันวาคม';
      }
    }
  }

  ngOnInit() {
    console.log('in init');
    console.log(this.data);
  }

}
