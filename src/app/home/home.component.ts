import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import _ from 'lodash';

import {MdDialog, MdDialogRef} from '@angular/material';

import config from '../Configs';
import {ResetPasswordDialogComponent} from '../reset-password-dialog/reset-password-dialog.component';
import {SignoutDialogComponent} from '../signout-dialog/signout-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public uid = '';
  public email = '';
  public displayName = '';
  public photoURL = '';

  public day: string = '';
  public date: number = 0;
  public month: string = '';
  public year: number = 0;
  // public user: Observable<firebase.User>;
  // public userInfo: Observable<firebase.UserInfo>;
  // data: FirebaseListObservable<any[]>;
  public data = [];
  public income = [];
  public sumIncome = 0;
  public payment = [];
  public sumPayment = 0;
  public providerId: string;

  selectedOption: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase, public dialog: MdDialog) {
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
        this.day = 'จันทร์';
        break;
      }
      case 1: {
        this.day = 'อังคาร';
        break;
      }
      case 2: {
        this.day = 'พุธ';
        break;
      }
      case 3: {
        this.day = 'พฤหัส';
        break;
      }
      case 4: {
        this.day = 'ศุกร์';
        break;
      }
      case 5: {
        this.day = 'เสาร์';
        break;
      }
      case 6: {
        this.day = 'อาทิตย์';
        break;
      }
    }
    /*end switch*/


    /*check auth*/
    if (!('uid' in localStorage)) {
      this.router.navigate(['/login']);
      return;
    }
    this.uid = localStorage.getItem('uid');
    this.email = localStorage.getItem('email');
    this.displayName = localStorage.getItem('displayName');
    this.photoURL = localStorage.getItem('photoURL');
    this.providerId = localStorage.getItem('providerId');   // password, google.com, facebook.com

    const messaging = firebase.messaging();
    this.requestPermission(messaging);
    this.onTokenRefresh(messaging);

    /*get data*/
    if (!('data' in localStorage)) {
      const data = db.object('/accounts/' + this.uid + '/data/' + year + '/' + month + '/' + date, {preserveSnapshot: true});
      data.subscribe(queriedItems => {
        const result = queriedItems.val();
        if (result) {
          if (result.incomeList.length > 0 || result.paymentList.length > 0) {
            this.income = result.incomeList;
            this.payment = result.paymentList;

            this.income = this.income.map((item) => {
              item['type'] = 0;
              this.sumIncome = this.sumIncome + item['amount'];
              return item;
            });

            this.payment = this.payment.map((item) => {
              item['type'] = 1;
              this.sumPayment = this.sumPayment + item['amount'];
              return item;
            });

            const resulttt = this.income.concat(this.payment);

            this.data = resulttt.sort((a, b) => {
              if (a.timestamp < b.timestamp) {
                return -1;
              }
              if (a.timestamp > b.timestamp) {
                return 1;
              }
              // a must be equal to b
              return 0;
            });

            /*set localStorage*/
            localStorage.setItem('data', JSON.stringify(this.data));
            localStorage.setItem('sumIncome', JSON.stringify(this.sumIncome));
            localStorage.setItem('sumPayment', JSON.stringify(this.sumPayment));
          }
        }
      });
    } else {
      this.data = JSON.parse(localStorage.getItem('data'));
      this.sumIncome = parseInt(localStorage.getItem('sumIncome'));
      this.sumPayment = parseInt(localStorage.getItem('sumPayment'));
    }
  }

  /*end cons*/

  openResetPasswordDialog() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      height: '175px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      console.log(result);
      this.router.navigate(['/reset-password']);
    });
  }

  openSignOutDialog() {
    const dialogRef = this.dialog.open(SignoutDialogComponent, {
      height: '175px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      console.log(result);
      if (result) {
        this.logout();
      }
    });
  }

  onTokenRefresh(messaging) {
    messaging.onTokenRefresh(function () {
      messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
          // Send Instance ID token to app server.
          this.sendTokenToServer(refreshedToken);
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });
  }

  sendTokenToServer(currentToken) {
    const acountItem = this.db.object('/accounts/' + this.uid, {preserveSnapshot: true});
    acountItem.update({
      fcm_token: currentToken
    });
  }

  requestPermission(messaging) {
    const HomeComponentThis = this;
    console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        messaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {
              HomeComponentThis.sendTokenToServer(currentToken);
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
          });
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
    // [END request_permission]
  }

  /*end cons*/

  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  /*end func*/

  ngOnInit() {
  }

  /*end func*/

  /* link to create */
  go2create() {
    this.router.navigate(['/createitem']);
  }

  /*end func*/
}
/*end class*/
