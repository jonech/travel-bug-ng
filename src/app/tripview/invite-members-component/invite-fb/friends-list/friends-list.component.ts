import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Friend } from '../../../../_model/friend';
import { InviteService } from '../../../invite-members-component/invite.service';
@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  @Input() friend: Friend;
  @Input() tripId: string;
  userId: string;
  _Inviteduser: FirebaseObjectObservable<any>;
  _hasInvitedUser1: boolean;
  _hasInvitedUser2: boolean;
  _hasInvited: boolean = true;
  constructor(
    private firebase: AngularFire,
    private sanitizer: DomSanitizer,
    private inviteService: InviteService
  ) {}

  ngOnInit() {
    //console.log(this.friend.id);
    console.log("trip id: "+this.tripId);
    
    this.findAllFbFriends();
  }

  findAllFbFriends() {
      this.firebase.database.list('/User', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'UserDetails/facebookUserId',
        equalTo: this.friend.id
      }
    })
      .subscribe(snapshots =>{
        snapshots.forEach(snapshot=>{
          console.log(snapshot.key);
          this.userId = snapshot.key;
          console.log("all facebook friends id: "+this.userId);
          console.log("tripid: "+this.tripId);
          
          this.firebase.database.object(`/Trip/${this.tripId}/User/Regular/${this.userId}`)
          .subscribe((user1) => {
            if(user1.$value===null){
              this._hasInvitedUser1 = false;             
            }else{
              this._hasInvitedUser1 = true;
            }
            console.log(this._hasInvitedUser1);
          });

          this.firebase.database.object(`/Trip/${this.tripId}/User/Admin/${this.userId}`)
          .subscribe((user2) => {
            if(user2.$value===null){
              this._hasInvitedUser2 = false;                          
            }else{
              this._hasInvitedUser2 = true;
            }
            console.log(this._hasInvitedUser2);
          });

          // if((!this._hasInvitedUser1) && (!this._hasInvitedUser2)) {
          //   this._hasInvited = false;
          // }else{
          //   this._hasInvited = true;
          // }
          // console.log(this._hasInvited);
          
          
          this._Inviteduser = this.firebase.database.object(`/User/${this.userId}/UserDetails`);
        })
      });
      

  }

  	sanitize(url: string)
	{
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

}
