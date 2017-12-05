import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html',
})

export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  private goToExternalURL(url){
    window.location.href=url;
  }
}


