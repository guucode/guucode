import { Component, OnInit } from '@angular/core';
import {AngularFireModule, } from "angularfire2";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})

export class FirebaseLoginComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  loginFB() {
    console.log('clicked');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    console.log(this.user);
  }

}
