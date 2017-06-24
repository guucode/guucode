import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string = "";

  constructor(public afAuth: AngularFireAuth,private router: Router) {
  }
  /*end cons*/

  emailLogin() {
    if(this.email && this.password) {
      this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password)
        .then(
          (success) => {
            this.router.navigate(['/home']);
          }).catch(
        (err) => {
          console.log(err);
        })
    }
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
      if (user) this.router.navigate(['/home']);
    });
  }

}
/*end class*/
