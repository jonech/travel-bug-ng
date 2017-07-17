import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireAuth } from 'angularfire2';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite-members-component',
  templateUrl: './invite-members-component.component.html',
  styleUrls: ['./invite-members-component.component.css']
})
export class InviteMembersComponentComponent implements OnInit {
  @Input() tripId:string;
  @Output() closeSplash = new EventEmitter<any>();
  constructor(
    private router: Router,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.router.navigate(['invite_by_email'], {relativeTo: this.route});
  }

  closeInvitation() {
    this.closeSplash.emit();
  }

}
