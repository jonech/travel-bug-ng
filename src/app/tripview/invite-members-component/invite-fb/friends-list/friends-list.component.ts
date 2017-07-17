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
  _hasInvitedUserId: string;
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

          this.firebase.database.object(`/Trip/${this.tripId}/User/Regular/${this.userId}`)
          .subscribe(user => this._hasInvitedUserId = user.$key);
          
          this._Inviteduser = this.firebase.database.object(`/User/${this.userId}/UserDetails`);
        })
      });
      

  }

  	sanitize(url: string)
	{
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

}
