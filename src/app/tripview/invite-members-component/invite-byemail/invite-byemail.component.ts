import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireAuth } from 'angularfire2';
import { NgForm } from '@angular/forms';
import { InviteService } from '../invite.service';

@Component({
  selector: 'app-invite-byemail',
  templateUrl: './invite-byemail.component.html',
  styleUrls: ['./invite-byemail.component.css']
})
export class InviteByemailComponent implements OnInit {

@ViewChild('invitForm') invitationForm: ElementRef;

  myUid: string;
  //TO DO: arrayList uids
  uid: string;
  email: string;
  invitedUser: FirebaseListObservable<any[]>;
  _error: string = "";
  _error_flag: boolean = false;

  constructor(
    private firebase: AngularFire,
    private auth: AngularFireAuth,
    private inviteService: InviteService
    ) {}

  ngOnInit() {
    this.auth.subscribe(
      auth => {
        if(auth)
          this.myUid = auth.uid;
      }
    )
  }

  inviteMembers(emailAdd: any) {
    //console.log(emailAdd.value);
    this.email = emailAdd.value;
    this.invitedUser = this.firebase.database.list('/User', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'UserDetails/email',
        equalTo: emailAdd.value
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
            alert("Invite "+ this.email+" successfully.")
            
          })
        }else{
          this._error_flag = true;
          this._error = 'User email does not exist!';
        }
      });

    
  }
}
