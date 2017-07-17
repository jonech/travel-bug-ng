import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Friend } from '../../_model/friend';
import { AngularFire } from 'angularfire2'
import { FacebookService } from 'ngx-facebook';

@Injectable()
export class InviteService {

  constructor(private af: AngularFire,
              private fb: FacebookService) { }

  newMember = new Subject();

  tripId = new EventEmitter<string>();

}
