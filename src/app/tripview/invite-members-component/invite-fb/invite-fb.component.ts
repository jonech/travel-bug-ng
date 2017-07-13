import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Friend } from '../../../_model/friend';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-invite-fb',
  templateUrl: './invite-fb.component.html',
  styleUrls: ['./invite-fb.component.css']
})
export class InviteFbComponent implements OnInit {

  friends: Friend[];
  accessToken:string;
  fbUserId: string;

  constructor(
    private fb: FacebookService,
    private af: AngularFire) {

    const params: InitParams = {
      appId            : '306096826434287',
      xfbml            : true,
      version          : 'v2.7'
    };

    fb.init(params)
    .then(()=>console.log("initialized successfully"))
    .catch(()=>console.log("initialized unsuccessfully")
    );

    af.auth.subscribe(auth => {
      af.database.object(`/User/${auth.uid}/UserDetails/facebookUserId`)
        .subscribe(fbUserId=> {
          this.fbUserId = fbUserId.$value;      
        });
		})

    console.log("currentFbUserId: "+this.fbUserId);
    

  }

  ngOnInit() {
    this.fb.getLoginStatus()
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
  }

  private findAllFriends() {
     this.fb.api('/me/friends','get',{access_token: this.accessToken})
      .then((friendsList)=>{
        this.friends = friendsList.data;  
        console.log("access friends: "+this.friends);
      })
      .catch((error)=>{
        console.log(error);
      });
  }
}
