import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireAuth } from 'angularfire2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invite-members-component',
  templateUrl: './invite-members-component.component.html',
  styleUrls: ['./invite-members-component.component.css']
})
export class InviteMembersComponentComponent implements OnInit {
  @ViewChild('invitForm') invitationForm: ElementRef;

  @Output() closeSplash = new EventEmitter<any>();
  @Output() newMember = new EventEmitter<string>();

  myUid: string;
  //TO DO: arrayList uids
  uid: string;
  invitedUser: FirebaseListObservable<any[]>;
  _error: string = "";

  constructor(
    private firebase: AngularFire,
    private auth: AngularFireAuth,
    ) {}

  ngOnInit() {
    this.auth.subscribe(
      auth => {
        if(auth)
          this.myUid = auth.uid;
      }
    )
  }

  //TODO: validate email
  inviteMembers(emailAdd: any) {
    //console.log(emailAdd.value);
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
            this.newMember.emit(this.uid);
            //console.log(this.uid);
            this.invitationForm.nativeElement.reset();
            this.closeInvitation();
          })
        }else{
          this._error = 'User email does not exist!';
        }
      });

    
  }

  closeInvitation() {
    this.closeSplash.emit();
  }

}
