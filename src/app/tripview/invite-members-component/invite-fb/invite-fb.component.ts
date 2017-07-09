import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
@Component({
  selector: 'app-invite-fb',
  templateUrl: './invite-fb.component.html',
  styleUrls: ['./invite-fb.component.css']
})
export class InviteFbComponent implements OnInit {

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
    .then((succ)=>{
      console.log();
      
      console.log(this.fb.api(
        "/me/friends",
        'get',
        null
        ));
      
    })
    .catch((error)=>{
      console.log(error);
    })

  }

}
