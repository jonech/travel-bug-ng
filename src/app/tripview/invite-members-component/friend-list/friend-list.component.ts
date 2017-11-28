import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Friend } from '../../../models/friend';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {


  @Input () tripId:string;
  @Input() friends: Friend[];




  constructor() {
  }

  ngOnInit() {
  }


}
