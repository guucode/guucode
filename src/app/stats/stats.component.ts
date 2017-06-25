import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public month_th: Array<any> = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ];

  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();

  stat = '';
  stat_arr: Array<any>;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[];

  constructor() {
  }

  ngOnInit() {
    this.stat = localStorage.getItem('stat');
    this.stat_arr = JSON.parse(this.stat);

    this.barChartData = [
      {
        data: [
          this.stat_arr['income'][this.year][+this.month - 1],
          this.stat_arr['income'][this.year][+this.month],
          this.stat_arr['income'][this.year][+this.month + 1]], label: 'รายรับ'
      },
      {
        data: [
          this.stat_arr['payment'][this.year][+this.month - 1],
          this.stat_arr['payment'][this.year][+this.month],
          this.stat_arr['payment'][this.year][+this.month + 1]], label: 'รายจ่าย'
      }
    ];

    this.barChartLabels = [this.month_th[+this.month - 2], this.month_th[+this.month - 1], this.month_th[+this.month]];
  }

}
