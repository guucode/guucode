import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import config from '../Configs';
firebase.initializeApp(config.firebase);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email = '';
  public password = '';

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    if ('uid' in localStorage) {
      this.router.navigate(['/home']);
      return;
    }
  }

  /*end cons*/

  emailLogin() {
    if (this.email && this.password) {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
        .then(
          (success) => {
            // The firebase.User instance:
            // var user = success.user;
            // The Facebook firebase.auth.AuthCredential containing the Facebook
            // access token:
            // var credential = success.credential;
            this.router.navigate(['/home']);
          }).catch(
        (err) => {
          console.log(err);
          alert('Username or Password is invaild');
        })
    }
  }

  /*end func*/

  facebookLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
        (success) => {
          this.router.navigate(['/home']);
        })
      .catch(
        (err) => {
          console.log(err);
        });
  }

  /*end func*/

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (success) => {
          this.router.navigate(['/home']);
        })
      .catch(
        (err) => {
          console.log(err);
        });
  }

  /*end func*/

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('displayName', user.displayName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('photoURL', user.photoURL);
        this.router.navigate(['/home']);
        return;
      }
    });
  }

}
