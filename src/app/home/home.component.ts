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
  // public user: Observable<firebase.User>;
  // public userInfo: Observable<firebase.UserInfo>;
  // data: FirebaseListObservable<any[]>;
  // data: Array<any[]>;
  // income: Array<any[]>;
  // payment: Array<any[]>;
  public data = [];
  public income = [];
  public sumIncome: number = 0;
  public payment = [];
  public sumPayment: number = 0;

  selectedOption: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase, public dialog: MdDialog) {
    const myDate = new Date();
    const date = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();

    /*check auth*/
    if (!('uid' in localStorage)) {
      this.router.navigate(['/login']);
      return;
    }
    this.uid = localStorage.getItem('uid');
    this.email = localStorage.getItem('email');
    this.displayName = localStorage.getItem('displayName');
    this.photoURL = localStorage.getItem('photoURL');

    const messaging = firebase.messaging();
    this.requestPermission(messaging);
    this.onTokenRefresh(messaging);

    /*get data*/
    if (!('data' in localStorage)) {
      const data = db.object('/accounts/' + this.uid + "/data/" + year + "/" + month + "/" + date, {preserveSnapshot: true});
      data.subscribe(queriedItems => {
        let result = queriedItems.val();
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

            let resulttt = this.income.concat(this.payment);

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
          }
        }
      });
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
