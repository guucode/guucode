import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';


@Component({
  selector: 'app-createitem',
  templateUrl: './createitem.component.html',
  styleUrls: ['./createitem.component.css']
})
export class CreateitemComponent implements OnInit {
  user: Observable<firebase.User>;
  select_type_pay: {};
  select_type_save: {};
  public typeItem: string;
  public money: string;
  public select_save: string;
  public select_pay: string;
  public text_detail: string;

  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    const fire_select_type_pay = db.list('/configs/paymentType', {
      query: {}
    });

    const fire_select_type_save = db.list('/configs/incomeType', {query: {}});

    if (this.user) this.router.navigate(['/createitem']);

    fire_select_type_pay.subscribe(queriedItems => {
      this.select_type_pay = queriedItems;
    });
    fire_select_type_save.subscribe(queriedItems => {
      this.select_type_save = queriedItems;
    });
    this.typeItem = '0';
    this.select_save = '0';
    this.select_pay = '0';
  }

  ngOnInit() {
  }

  back2home() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    console.log(this.typeItem);
    console.log(this.money);
    console.log(this.select_save);
    console.log(this.select_pay);
    console.log(this.text_detail);
  }
}
