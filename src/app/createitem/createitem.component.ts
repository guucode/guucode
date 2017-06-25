import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {forEach} from "@angular/router/src/utils/collection";


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

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
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
    let data = {};
    let uid;
    this.user.subscribe(queriedItems => {
      //if query success
      uid = queriedItems.uid; // get user id
      data[uid] = {};
      data[uid]['data'] = {};
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      let timestamp = today.getTime();
      // items.push(data);
      data[uid]['data'][yyyy] = {};
      data[uid]['data'][yyyy][mm] = {};
      data[uid]['data'][yyyy][mm][dd] = {};


      // if (item.$key == this.select_save) {
      //   payname = item.$value;
      //   break;
      // }
      let items = firebase.database().ref('/accounts/' + uid + '/data/' + yyyy + '/' + mm + '/' + dd + '/incomeList/');
      // items.set({});

      if (typeof  this.money == 'undefined') {
        this.money = '0';
      }
      if (typeof  this.text_detail == 'undefined') {
        this.text_detail = '';
      }
      let payname = '';
      let vthis = this;
      if (this.typeItem == '0') {
        payname = this.select_type_save[this.select_save].$value;

        let items = firebase.database().ref('/accounts/' + uid + '/data/' + yyyy + '/' + mm + '/' + dd + '/incomeList/');
        let checkmax = this.db.list('/accounts/' + uid + '/data/' + yyyy + '/' + mm + '/' + dd + '/incomeList/', {query: {}});
        let maxlength;
        items.on("value", function (snapshot) {
          maxlength = snapshot.numChildren();
        });
        let items_insert = firebase.database().ref('/accounts/' + uid + '/data/' + yyyy + '/' + mm + '/' + dd + '/incomeList/' + maxlength + '/');
        data = {
          'amount': vthis.money,
          'timestamp': timestamp,
          'typeId': vthis.select_save,
          'typeName': payname,
          'detail': vthis.text_detail
        };
        items_insert.set(data);
        console.log(data);
      } else {
        payname = this.select_type_pay[this.select_pay].$value;

        let items = firebase.database().ref('/accounts/' + uid + '/data/' + yyyy + '/' + mm + '/' + dd + '/paymentList/');
        let checkmax = this.db.list('/accounts/' + uid + '/data/' + yyyy + '/' + mm + '/' + dd + '/paymentList/', {query: {}});
        let maxlength;
        items.on("value", function (snapshot) {
          maxlength = snapshot.numChildren();
        });
        let items_insert = firebase.database().ref('/accounts/' + uid + '/data/' + yyyy + '/' + mm + '/' + dd + '/paymentList/' + maxlength + '/');
        data = {
          'amount': vthis.money,
          'timestamp': timestamp,
          'typeId': vthis.select_pay,
          'typeName': payname,
          'detail': vthis.text_detail
        };
        items_insert.set(data);
        console.log(data);
      }
      this.router.navigate(['/home']);
      return;
    });
  }
}
