import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-signout-dialog',
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.css']
})
export class SignoutDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<SignoutDialogComponent>) {
  }

  ngOnInit() {
  }

}
