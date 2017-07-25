import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireAuth } from 'angularfire2';
import { NgForm } from '@angular/forms';
import { InviteService } from '../invite.service';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Friend } from '../../../_model/friend';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {


  @Input () tripId:string;
  @Input() friends: Friend[];



 
  constructor(
    private firebase: AngularFire,
    private auth: AngularFireAuth,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private facebook: FacebookService ) {
  }

  ngOnInit() {
  }


}
