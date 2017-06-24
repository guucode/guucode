import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public rePassword: string = '';

  constructor(public af: AngularFireAuth, private router: Router) {
  }

  /*end func*/

  onSubmit() {
    if (this.email && this.password && this.rePassword) {
      if (this.password == this.rePassword) {
        this.af.auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(
            (success) => {
              console.log(success);
              this.router.navigate(['/home'])
            }).catch(
          (err) => {
            console.log(err);
            alert('ลงทะเบียนแล้ว');
          });
      } else {
        alert('password ไม่ตรงกัน');
      }
    }
  }

  /*end func*/

  ngOnInit() {
  }

  /*end func*/

}
/*end class*/
