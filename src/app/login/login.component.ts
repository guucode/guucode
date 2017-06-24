import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

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
  private userData;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    if ('uid' in localStorage) {
      this.router.navigate(['/home']);
      return;
    }
  }

  emailLogin() {
    const loginC = this;
    if (this.email && this.password) {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
        .then(
          (success) => {
            // The firebase.User instance:
            // var user = success.user;
            // The Facebook firebase.auth.AuthCredential containing the Facebook
            // access token:
            // var credential = success.credential;
            setTimeout(() => {
              loginC.setUserDateToLocalStorage(loginC.userData);
              loginC.router.navigate(['/home']);
            }, 100);
          }).catch(
        (err) => {
          console.log(err);
          alert('Username or Password is invaild');
        })
    }
  }

  facebookLogin() {
    const loginC = this;
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
        (success) => {
          setTimeout(() => {
            loginC.setUserDateToLocalStorage(loginC.userData);
            loginC.router.navigate(['/home']);
          }, 100);
        })
      .catch(
        (err) => {
          console.log(err);
        });
  }

  googleLogin() {
    const loginC = this;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (success) => {
          setTimeout(() => {
            loginC.setUserDateToLocalStorage(loginC.userData);
            loginC.router.navigate(['/home']);
          }, 100);
        })
      .catch(
        (err) => {
          console.log(err);
        });
  }

  setUserDateToLocalStorage(userData) {
    if (userData) {
      localStorage.setItem('displayName', userData.displayName);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('uid', userData.uid);
      localStorage.setItem('photoURL', userData.photoURL);
      localStorage.setItem('providerId', userData.providerData[0].providerId);
      this.createAccount(userData.uid, userData.email, userData.photoURL, userData.displayName);
      return;
    }
  }

  createAccount(uid, email, photoURL, displayName) {
    const itemToPut = {
      email: email,
      photoURL: photoURL,
      displayName: displayName
    };
    const acountItem = this.db.object('/accounts/' + uid, {preserveSnapshot: true});
    // Check account is exist or not?
    acountItem.subscribe(snapshot => {
      console.log(snapshot.key);
      console.log(snapshot.val());
      if (snapshot.val()) {
        // Already account
        acountItem.update(itemToPut);
      } else {
        // Create new account
        const acounts = this.db.object('/accounts', {preserveSnapshot: true});
        const acountToPut = {};
        acountToPut[uid] = itemToPut;
        acounts.update(acountToPut);
      }
    });
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.userData = user;
    });
  }
}
