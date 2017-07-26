import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Friend } from '../../_model/friend';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2'
import { FacebookService } from 'ngx-facebook';

@Injectable()
export class InviteService {

  constructor(private af: AngularFire,
              private fb: FacebookService) { }

  newMember = new Subject();
  isChecked = new Subject();
  private chosenFriends: FirebaseObjectObservable<any>[] = [];

  getChosenFriends(){   
    this.checkLength();
    return this.chosenFriends;
  }

  deleteChosenFriend(chosenFriend: FirebaseObjectObservable<any>) {
    this.chosenFriends.splice(this.chosenFriends.indexOf(chosenFriend), 1);
    this.checkLength();
  }

  addChosenFriends(chosenFriends: FirebaseObjectObservable<any>[]) {
    Array.prototype.push.apply(this.chosenFriends, chosenFriends);
    this.checkLength();
  }

  addChosenFriend(chosenFriend: FirebaseObjectObservable<any>) {
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
  }
}
