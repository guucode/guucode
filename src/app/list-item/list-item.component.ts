import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  public uid = '';
  public email = '';
  public displayName = '';
  public photoURL = '';
  // public user: Observable<firebase.User>;
  // public userInfo: Observable<firebase.UserInfo>;
  public day: string = '';
  public date: number = 0;
  public month: string = '';
  public year: number = 0;

  public list = [];

  constructor(private router: Router, public db: AngularFireDatabase) {
    if (!('uid' in localStorage)) {
      this.router.navigate(['/login']);
      return;
    }
    this.uid = localStorage.getItem('uid');
    this.email = localStorage.getItem('email');
    this.displayName = localStorage.getItem('displayName');
    this.photoURL = localStorage.getItem('photoURL');

    /*get data*/
    const myDate = new Date();
    const day = myDate.getDay();
    const date = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();

    this.date = date;
    this.year = year;
    switch (month) {
      case 1: {
        this.month = 'มกราคม';
        break;
      }
      case 2: {
        this.month = 'กุมภาพันธ์';
        break;
      }
      case 3: {
        this.month = 'มีนาคม';
        break;
      }
      case 4: {
        this.month = 'เมษายน';
        break;
      }
      case 5: {
        this.month = 'พฤษภาคม';
        break;
      }
      case 6: {
        this.month = 'มิถุนายน';
        break;
      }
      case 7: {
        this.month = 'กรกฎาคม';
        break;
      }
      case 8: {
        this.month = 'สิงหาคม';
        break;
      }
      case 9: {
        this.month = 'กันยายน';
        break;
      }
      case 10: {
        this.month = 'ตุลาคม';
        break;
      }
      case 11: {
        this.month = 'พฤศจิกายน';
        break;
      }
      case 12: {
        this.month = 'ธันวาคม';
        break;
      }
    }
    /*end switch*/

    switch (day) {
      case 0: {
        this.day = 'อาทิตย์';
        break;
      }
      case 1: {
        this.day = 'จันทร์';
        break;
      }
      case 2: {
        this.day = 'อังคาร';
        break;
      }
      case 3: {
        this.day = 'พุธ';
        break;
      }
      case 4: {
        this.day = 'พฤหัส';
        break;
      }
      case 5: {
        this.day = 'ศุกร์';
        break;
      }
      case 6: {
        this.day = 'เสาร์';
        break;
      }
    }
    /*end switch*/
    const data = db.object('/accounts/' + this.uid + "/data/" + year + "/" + month, {preserveSnapshot: true});
    data.subscribe(queriedItems => {
      let result = queriedItems.val();
      if (result) {

        Object.keys(result).forEach(key => {
          if (result[key].incomeList.length > 0 || result[key].paymentList.length > 0) {
            let income = result[key].incomeList;
            let payment = result[key].paymentList;

            income = income.map((item) => {
              item['type'] = 0;
              return item;
            });

            payment = payment.map((item) => {
              item['type'] = 1;
              return item;
            });

            let resultMerge = income.concat(payment);

            let dataPerDay = resultMerge.sort((a, b) => {
              if (a.timestamp < b.timestamp) {
                return -1;
              }
              if (a.timestamp > b.timestamp) {
                return 1;
              }
              // a must be equal to b
              return 0;
            });

            dataPerDay['date'] = key;
            let myDate = new Date(year+'-'+month+'-'+key);
            dataPerDay['day'] = myDate.getDay();
            dataPerDay['month'] = month;
            dataPerDay['year'] = this.year;

            this.list[key] = dataPerDay;
          }
        });
      }
    });
  }

  ngOnInit() {
  }

}
