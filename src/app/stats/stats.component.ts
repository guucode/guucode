import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['เมษายน', 'พฤษภาคม', 'มิถุนายน'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80], label: 'รายรับ'},
    {data: [28, 48, 40], label: 'รายจ่าย'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
