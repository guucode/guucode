import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,private router: Router) {
    this.user = afAuth.authState;
    if (this.user) this.router.navigate(['/home']);
  }
  /*end cons*/

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);

  }
  /*end func*/

  ngOnInit() {
  }

}
/*end class*/
