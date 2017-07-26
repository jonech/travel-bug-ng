import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef} from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireAuth, FirebaseObjectObservable } from 'angularfire2';
import { NgForm } from '@angular/forms';
import { InviteService } from './invite.service';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Friend } from '../../_model/friend';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-invite-members-component',
  templateUrl: './invite-members-component.component.html',
  styleUrls: ['./invite-members-component.component.css']
})
export class InviteMembersComponentComponent implements OnInit {
  @ViewChild('invitForm') invitationForm: ElementRef;
  @Output() closeSplash = new EventEmitter<any>();
  tripId:string;
  allFriends: Friend[];
  filtered: Friend[];
  chosenFriends: FirebaseObjectObservable<any>[] = [];
  myUid: string;
  accessToken:string;
  fbUserId: string;
  hasChosenFriend:boolean;

  private paramSub: any;
  uid: string;
  email: string;
  invitedUser: FirebaseListObservable<any[]>;
  _error: string = "";
  _error_flag: boolean = false;
  matchname:boolean;

    constructor(
    private firebase: AngularFire,
    private auth: AngularFireAuth,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private router: Router,
    private facebook: FacebookService,
    private location: Location ) {

    const params: InitParams = {
      appId            : '527503254109672',
      xfbml            : true,
      version          : 'v2.7'
    };

    facebook.init(params)
    .then(()=>console.log("initialized successfully"))
    .catch(()=>console.log("initialized unsuccessfully")
    );
  }

  ngOnInit() {
    this.paramSub = this.route.parent.params.subscribe(params => {
      this.tripId = params['id'];
    })
    this.auth.subscribe(
      auth => {
        if(auth)
          this.myUid = auth.uid;
      }
    );

    this.facebook.getLoginStatus()
    .then((suc)=>{
      if(suc.status==='connected') {
        console.log("facebookUserId: "+suc.authResponse.userID);
        console.log("accessToken: "+suc.authResponse.accessToken);
        
        this.accessToken = suc.authResponse.accessToken;
        this.findAllFriends();
      }
      console.log(suc.status);
    })
    .catch((error)=>{
      console.log(error);
    })    

    this.chosenFriends = this.inviteService.getChosenFriends();

    this.inviteService.isChecked.subscribe((checked:boolean)=>{
      this.hasChosenFriend = checked;
    });    
  }

  private findAllFriends() {
     this.facebook.api('/me/friends','get',{access_token: this.accessToken})
      .then((friendsList)=>{
        this.allFriends = this.filtered = friendsList.data;  
        console.log(this.allFriends);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  search(name:string) {
    this.filtered = this.allFriends.filter(friend=>friend.name.toLowerCase().includes(name.toLowerCase()));
    if(this.filtered.length==0) {
      this.matchname = false;
    }else{
      this.matchname = true;
    }
  }

  inviteMembers(emailAdd: any) {
    if(emailAdd.valid) {
      this.inviteByEmail(emailAdd.value);
    }
    //console.log(emailAdd.value);
    if(this.chosenFriends.length>0) {
      this.inviteFbFriends();
    }
    this.closeInvitation();
  }

  inviteFbFriends() {
    for(let fbFriend of this.chosenFriends) {
      fbFriend.subscribe( facebookFriend =>{
        this.inviteByEmail(facebookFriend.email);       
      });
    }
    
  }

  inviteByEmail(emailAdd:string) {
    this.email = emailAdd;
    this.invitedUser = this.firebase.database.list('/User', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'UserDetails/email',
        equalTo: emailAdd
      }
    });
 
    this.invitedUser
      .subscribe(snapshots =>{
        if(snapshots.length!=0){
          snapshots.forEach(snapshot => {
            this.uid = snapshot.key;
            this.inviteService.newMember.next(this.uid);
            //console.log(this.uid);
            this.invitationForm.nativeElement.reset();
            //alert("Invite "+ this.email+" successfully.")
          })
        }else{
          this._error_flag = true;
          this._error = 'User email does not exist!';
        }
      }); 

  }

  closeInvitation() {
    this.inviteService.clearChosenFriend();
    this.location.back();
  }

}
