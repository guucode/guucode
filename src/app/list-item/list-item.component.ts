import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  type = '';
  type_text = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.params['type']

    if (this.type === 'income') {
      this.type_text = 'รายรับ';
    } else if (this.type === 'expense') {
      this.type_text = 'รายจ่าย';
    } else if (this.type === 'all') {
      this.type_text = 'รายการ';
    }
  }

}
