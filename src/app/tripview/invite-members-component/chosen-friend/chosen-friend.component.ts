import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InviteService } from '../invite.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable} from 'angularfire2/database';

@Component({
  selector: 'chosen-friend',
  templateUrl: './chosen-friend.component.html',
  styleUrls: ['./chosen-friend.component.css']
})
export class ChosenFriendComponent implements OnInit {
  @Input() chosenFriend: FirebaseObjectObservable<any>;

  constructor(
    private sanitizer: DomSanitizer,
    private inviteService: InviteService
  ) { }

  ngOnInit() {
  }

  	sanitize(url: string)
	{
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  remove(chosenFriend:FirebaseObjectObservable<any>) {
    let isChecked = false;
    this.inviteService.isChecked.next(isChecked);
    this.inviteService.deleteChosenFriend(chosenFriend);
  }

}
