import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public inputEmail: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onSubmitEmail() {
    console.log(this.inputEmail);
    this.router.navigate(['/reset-password-complete']);
  }
}
