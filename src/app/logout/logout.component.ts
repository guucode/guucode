import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.logout();
  }

  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
