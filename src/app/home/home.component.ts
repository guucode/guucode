import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import config from '../Configs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public email = '';
  public displayName = '';
  public photoURL = '';
  // public user: Observable<firebase.User>;
  // public userInfo: Observable<firebase.UserInfo>;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    if (!('uid' in localStorage)) {
      this.router.navigate(['/login']);
      return;
    }
    this.email = localStorage.getItem('email');
    this.displayName = localStorage.getItem('displayName');
    this.photoURL = localStorage.getItem('photoURL');

    const messaging = firebase.messaging();
    this.requestPermission(messaging);
    this.onTokenRefresh(messaging);

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
    console.log(currentToken);
  }

  requestPermission(messaging) {
    let HomeComponentThis = this;
    console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        messaging.getToken()
          .then(function (currentToken) {
            console.log(currentToken);
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
  /* link to create */
  go2create()  {
    this.router.navigate(['/createitem']);
  }
}
/*end class*/
