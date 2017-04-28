import { Component, OnInit, Input } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'transport-form',
	templateUrl: 'transport_form.component.html'
})

export class TransportFormComponent implements OnInit
{
	@Input() dayTripId: string;
	dayTripRef: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire
	){}

	ngOnInit()
	{

	}
}
