import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireAuth } from 'angularfire2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invite-members-component',
  templateUrl: './invite-members-component.component.html',
  styleUrls: ['./invite-members-component.component.css']
})
export class InviteMembersComponentComponent implements OnInit {
  @ViewChild('f') invitationForm: ElementRef

  @Output() closeSplash = new EventEmitter<any>();
  @Output() newMember = new EventEmitter<string>();

  myUid: string;
  //TO DO: arrayList uids
  uid: string;

  //For Test
  uemail: string;

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

  inviteMembers(emailAdd: any) {
  
    console.log(emailAdd.value);
    this.uemail = emailAdd.value;
    this.newMember.emit(this.uemail);
    this.invitationForm.nativeElement.reset();
  }
  closeInvitation() {
    this.closeSplash.emit();
  }

}
