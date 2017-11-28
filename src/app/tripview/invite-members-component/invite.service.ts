import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Friend } from '../../models/friend';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FacebookService } from 'ngx-facebook';

@Injectable()
export class InviteService {

  constructor(private fb: FacebookService) { }

  newMember = new Subject();
  isChecked = new Subject();
  numberOfInvi = new Subject();
  private chosenFriends: any; //FirebaseObjectObservable<any>[] = [];

  getChosenFriends(){
    this.checkLength();
    return this.chosenFriends;
  }

  deleteChosenFriend(chosenFriend: any /*FirebaseObjectObservable<any>*/) {
    this.chosenFriends.splice(this.chosenFriends.indexOf(chosenFriend), 1);
    this.checkLength();
  }

  addChosenFriends(chosenFriends: any /*FirebaseObjectObservable<any>[]*/) {
    Array.prototype.push.apply(this.chosenFriends, chosenFriends);
    this.checkLength();
  }

  addChosenFriend(chosenFriend: any /*FirebaseObjectObservable<any>*/) {
    this.chosenFriends.push(chosenFriend);
    this.checkLength();
  }
  clearChosenFriend() {
    this.chosenFriends = [];
    this.checkLength();
  }

  checkLength() {
    let isChecked = false;
    if(this.chosenFriends.length>0) {
      isChecked = true;
      this.isChecked.next(isChecked);
    }else{
      this.isChecked.next(isChecked);
    }
    this.numberOfInvi.next(this.chosenFriends.length);
  }
}
