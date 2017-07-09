import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Friend } from '../../../_model/friend';

@Component({
  selector: 'app-invite-fb',
  templateUrl: './invite-fb.component.html',
  styleUrls: ['./invite-fb.component.css']
})
export class InviteFbComponent implements OnInit {

  friends: Friend[];

  constructor(private fb: FacebookService) {

    const params: InitParams = {
      appId            : '306096826434287',
      xfbml            : true,
      version          : 'v2.7'
    };

    fb.init(params)
    .then(()=>console.log("initialized successfully"))
    .catch(()=>console.log("initialized unsuccessfully")
    );

  }

  ngOnInit() {
    this.fb.getLoginStatus()
    .then(()=>{
      this.findAllFriends();
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  private findAllFriends() {
     this.fb.api("/me/friends",'get',null)
      .then((friendsList)=>{
        this.friends = friendsList.data;  
        console.log(this.friends);
      })
      .catch((error)=>{
        console.log(error);
      });
  }

}
